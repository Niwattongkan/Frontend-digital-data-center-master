import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { NoteService } from "../../shared/services/note.service";
import { PersonsService } from "../../shared/services/persons.service";
import { AuthlogService } from "../../shared/services/authlog.service";
import { NgxSpinnerService } from "ngx-spinner";
import { alertEvent, alertDeleteEvent } from "../../shared/library/alert";
import { mapPersons, createdNamePersons } from "../../shared/library/mapList";
import { UsersService } from "../../shared/services/users.service";
import * as moment from 'moment';
@Component({
  selector: "app-event-notebook",
  templateUrl: "./event-notebook.component.html",
  styleUrls: ["./event-notebook.component.css"]
})
export class EventNotebookComponent implements OnInit {
  public noteList: any = [];
  public noteOrigin: any;

  public personList: any = [];
  public inputSearch = "";
  public page: number;
  public headers: any = [
    "บุคคล",
    "ชื่อบันทึก",
    "รายละเอียด",
    "ผู้สร้าง",
    "วันที่สร้าง",
    "เรียกดู",
    "เครื่องมือ"
  ];
  public canAddNoteBook = false;
  public canEditNoteBook = false;
  public canDeleteNoteBook = false;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private noteService: NoteService,
    private personsService: PersonsService,
    private authlogService: AuthlogService,
    private usersService: UsersService
  ) {}

  async ngOnInit() {
    this.spinner.show();
    this.personList = await mapPersons(
      (await this.personsService.getallperson().toPromise()).data
    );
    this.noteList = await mapPersons(
      (await this.noteService.getNoteAll().toPromise()).data
    );
    this.canAddNoteBook = this.usersService.canAddNoteBook();
    this.canEditNoteBook = this.usersService.canEditNoteBook();
    this.canDeleteNoteBook = this.usersService.canDeleteNoteBook();
    this.spinner.hide();
  }

  public findPersonDetail(id) {
    this.spinner.show();
    let result = this.personList.find(person => {
      return person.PersonId == id;
    });
    this.spinner.hide();
    return result ? result.FullnameTh : "-";
  }

  public async insertNote(value) {
    this.spinner.show();
    await this.noteService
      .insertNote(value)
      .toPromise()
      .then(
        res => {
          alertEvent("บันทึกข้อมูลสำเร็จ", "success");
        },
        err => {
          alertEvent("บันทึกข้อมูลสำเร็จ", "waraning");
        }
      );
    this.noteList = await mapPersons(
      (await this.noteService.getNoteAll().toPromise()).data
    );

    this.spinner.hide();
  }

  public async updateNote(value) {
    this.spinner.show();
    await this.noteService.updateNote(value).toPromise();
    await this.updateLog(value);
    this.noteList = await mapPersons(
      (await this.noteService.getNoteAll().toPromise()).data
    );
    this.spinner.hide();
  }

  public async updateShareNote(value) {
    this.spinner.show();
    let model = {
   //   ShareNoteId: value.PersonId,
      StartDate: this.setDate(value.StartDate.date),
      EndDate: this.setDate(value.EndDate.date),
      NoteId: value.NoteId
    };
    let result = (await this.noteService.insertShareNote(model).toPromise())
      .data[0];
    
    for (let index = 0; index < value.Person.length; index++) {
    
      let person = value.Person[index];
      let share = {
        ShareNoteId: result.ShareNoteId,
        PersonId: person.PersonId,
        StartDate: moment(result.StartDate).format('YYYY-MM-DD'),
        EndDate:  moment(result.EndDate).format('YYYY-MM-DD')
      }; 
      await this.noteService.insertdetailShareNote(share).toPromise();
    }
    this.spinner.hide();
  }

  async updateLog(note) {
    this.noteOrigin.NoteName != note.NoteName
      ? await this.auditLogService(
          "ชื่อบันทึก",
          this.noteOrigin.NoteName,
          note.NoteName
        )
      : null;
    this.noteOrigin.Description != note.Description
      ? await this.auditLogService(
          "รายละเอียด",
          this.noteOrigin.Description,
          note.Description
        )
      : null;
  }

  async auditLogService(field, origin, update) {
    await this.authlogService
      .insertAuditlog({
        UpdateDate: new Date(),
        UpdateMenu: "สมุดบันทึก",
        UpdateField: field,
        DataOriginal: origin,
        UpdateData: update
      })
      .toPromise();
  }

  public openModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  public async onSearchData() {
    this.spinner.show();
    this.noteList = await mapPersons(
      (await this.noteService.getNoteAll().toPromise()).data
    );
    if (this.inputSearch != "") {
      this.noteList = this.noteList.filter(data => {
        return (
          data.NoteName.includes(this.inputSearch) ||
          data.FristNameTh.includes(this.inputSearch) ||
          data.LastNameTh.includes(this.inputSearch)
        );
      });
      this.spinner.hide();
    }
    this.spinner.hide();
  }

  public delete(id) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        await this.noteService.deleteNote(id).toPromise();
        this.noteList = await mapPersons(
          (await this.noteService.getNoteAll().toPromise()).data
        );
        return alertEvent("ลบข้อมูลสำเร็จ", "success");
      }
    });
  }

  public createdUser(cretedBy) {
    return createdNamePersons(this.personList, cretedBy);
  }

  private setDate(date) {
    let year = date.year;
    let month = "000" + date.month;
    let day = "000" + date.day;
    return (
      year +
      "-" +
      month.substr(month.length - 2, month.length) +
      "-" +
      day.substr(day.length - 2, day.length)
    );
  }
}
