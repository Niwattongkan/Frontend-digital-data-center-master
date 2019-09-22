import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NoteService } from '../../shared/services/note.service';
import { PersonsService } from '../../shared/services/persons.service';
import { AuthlogService } from '../../shared/services/authlog.service';

import { alertEvent, alertDeleteEvent } from '../../shared/library/alert';
import { mapPersons, createdNamePersons } from '../../shared/library/mapList';
@Component({
  selector: 'app-event-notebook',
  templateUrl: './event-notebook.component.html',
  styleUrls: ['./event-notebook.component.css']
})
export class EventNotebookComponent implements OnInit {

  public noteList: any = [];
  public noteOrigin: any;

  public personList: any = [];
  public inputSearch = ""
  public page: number;
  public headers: any = ['บุคคล', 'ชื่อบันทึก', 'รายละเอียด', 'ผู้สร้าง', 'วันที่สร้าง', 'เรียกดู', 'เครื่องมือ'];

  constructor(
    private modalService: NgbModal,
    private noteService: NoteService,
    private personsService: PersonsService,
    private authlogService: AuthlogService
  ) { }

  async ngOnInit() {
    this.personList = await mapPersons((await this.personsService.getallperson().toPromise()).data)
    this.noteList = await mapPersons((await this.noteService.getNoteAll().toPromise()).data)
  }

  public findPersonDetail(id) {

    let result = this.personList.find(person => {
      return person.PersonId == id;
    })

    return result ? result.FullnameTh : '-'
  }

  public async insertNote(value) {
    await this.noteService.insertNote(value).toPromise()
    this.noteList = await mapPersons((await this.noteService.getNoteAll().toPromise()).data)
  }

  public async updateNote(value) {
    await this.noteService.updateNote(value).toPromise()
    await this.updateLog(value)
    this.noteList = await mapPersons((await this.noteService.getNoteAll().toPromise()).data)
  }

  public async updateShareNote(value) {
    console.log(value)
    let model = {
      StartDate: this.setDate(value.StartDate.date),
      EndDate: this.setDate(value.EndDate.date),
      NoteId: value.NoteId
    }
    let result = (await this.noteService.insertShareNote(model).toPromise()).data[0]
    for (let index = 0; index < value.Person.length; index++) {
      let person = value.Person[index]
      let share = {
        ShareNoteId: result.ShareNoteId,
        PersonId: Number(person),
        StartDate: result.StartDate,
        EndDate: result.EndDate,

      }
      await this.noteService.insertdetailShareNote(share).toPromise()
    }
  }

  async updateLog(note) {
    this.noteOrigin.NoteName != note.NoteName ? await this.auditLogService("ชื่อบันทึก", this.noteOrigin.NoteName, note.NoteName) : null
    this.noteOrigin.Description != note.Description ? await this.auditLogService("รายละเอียด", this.noteOrigin.Description, note.Description) : null
  }

  async auditLogService(field, origin, update) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: "สมุดบันทึก",
      UpdateField: field,
      DataOriginal: origin,
      UpdateData: update,
    }).toPromise()
  }

  public openModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  public async onSearchData() {
    this.noteList = await mapPersons((await this.noteService.getNoteAll().toPromise()).data)
    if (this.inputSearch != '') {
      this.noteList = this.noteList.filter(data => {
        return data.NoteName.includes(this.inputSearch) ||
          data.FristNameTh.includes(this.inputSearch) ||
          data.LastNameTh.includes(this.inputSearch)
      });
    }
  }

  public delete(id) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        await this.noteService.deleteNote(id).toPromise()
        this.noteList = await mapPersons((await this.noteService.getNoteAll().toPromise()).data)
        return alertEvent("ลบข้อมูลสำเร็จ", "success")
      }
    })
  }

  public createdUser(cretedBy) {
    return createdNamePersons(this.personList, cretedBy)
  }

  private setDate(date) {
    let year = date.year
    let month = ("000" + date.month)
    let day = ("000" + date.day)
    return year + "-" + month.substr(month.length - 2, month.length) + "-" + day.substr(day.length - 2, day.length)
  }

}
