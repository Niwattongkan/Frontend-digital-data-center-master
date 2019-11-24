import { Component, EventEmitter, OnInit, Input, Output } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { PersonsService } from "../../../shared/services/persons.service";
import { GroupUserService } from "../../../shared/services/group-user.service";
import { BoardService } from "../../../shared/services/board.service";

import { validForm } from "../../../shared/library/form";
import { mapPersons } from "../../../shared/library/mapList";

@Component({
  selector: "edit-setting-user-modal",
  templateUrl: "./edit-user-modal.component.html",
  styleUrls: ["./edit-user-modal.component.css"]
})
export class EditUserModalComponent implements OnInit {
  title = "";
  public searchPerson = "";
  public personList: any = [];
  public groupUsersList: any = [];
  public boardList: any = [];
  public permissionList: any = [];

  public alertValid = false;
  public groupUserForm: FormGroup;

  public personGroupList: any = [];
  Personselected: any;
  public dropdownSettings = {
    singleSelection: true,
    idField: "PersonId",
    textField: "FullnameTh",
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    allowSearchFilter: true
  };

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  get Person() {
    return this.groupUserForm.get("Person").value;
  }

  constructor(
    private modalService: NgbModal,
    private personsService: PersonsService,
    private groupUserService: GroupUserService,
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) {
    this.groupUserForm = this.setGroupUser(null);
  }

  async ngOnInit() {
    this.boardList = (await this.boardService.getallboard().toPromise()).data;
    this.personList = mapPersons(
      (await this.personsService.getallperson().toPromise()).data
    );
    this.groupUsersList = (
      await this.groupUserService.getallgroupuser().toPromise()
    ).data;

    this.groupUserForm = this.data
      ? await this.setGroupUser(this.data)
      : await this.setGroupUser(null);

    var PersonL = this.groupUserForm.value;
    this.Personselected = PersonL.Person;
  }

  public submit() {
    if (validForm(this.groupUserForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.groupUserForm.value);
    return this.modalService.dismissAll();
  }

  public closeModal() {
    this.modalService.dismissAll();
  }
  public setGroupUser(data) {
    data ? console.log(data) : null;
    return data
      ? this.formBuilder.group({
          Person: [
            [
              {
                PersonId: data.PersonId,
                FullnameTh: data.FullnameTh
              }
            ]
          ],
          GroupUserName: [data.GroupUserName, [Validators.required]],
          GroupUserId: [data.GroupUserId, [Validators.required]],
          BoardId: [String(data.BoardId), [Validators.required]]
        })
      : this.formBuilder.group({
          GroupUserName: ["", [Validators.required]],
          Person: [[]],
          BoardId: [""]
        });
  }
}
