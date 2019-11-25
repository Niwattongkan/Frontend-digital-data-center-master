import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonsService } from '../../../shared/services/persons.service';
import { GroupUserService } from '../../../shared/services/group-user.service';
import { BoardService } from '../../../shared/services/board.service';

import { validForm } from '../../../shared/library/form';
import { mapPersons } from '../../../shared/library/mapList';
import Swal from "sweetalert2";

@Component({
  selector: 'setting-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  title = ""
  public searchPerson = ""
  public personList: any = [];
  public groupUsersList: any = [];
  public boardList: any = [];
  public permissionList: any = []

  public alertValid = false
  public groupUserForm: FormGroup;

  public personGroupList: any = [];

  public dropdownSettings = {
    singleSelection: false,
    idField: 'PersonId',
    textField: 'FullnameTh',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();


  get Person() {
    return this.groupUserForm.get('Person').value
  }

  constructor(
    private modalService: NgbModal,
    private personsService: PersonsService,
    private groupUserService: GroupUserService,
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) {
    this.groupUserForm = this.setGroupUser(null)
  }

  async ngOnInit() {
    this.title = this.data ? "แก้ไขกลุ่มผู้ใช้งาน" : "สร้างกลุ่มผู้ใช้งาน"

    this.groupUsersList = (await this.groupUserService.getallgroupuser().toPromise()).data
    this.boardList = (await this.boardService.getallboard().toPromise()).data
    this.personList = mapPersons((await this.personsService.getallperson().toPromise()).data)

    this.groupUserForm = this.data ? await this.setGroupUser(this.data) : await this.setGroupUser(null)
    console.log(this.groupUserForm.value)

  }
  public selectedBoard(board) {
    let temp = this.groupUserForm.get('Person').value
    temp.BoardId = board
    this.groupUserForm.get('Person').setValue(temp)
  }

  public submit() {
    if (validForm(this.groupUserForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.groupUserForm.value)
    return this.modalService.dismissAll()
  }

  public closeModal() {
    Swal.fire({
      title: '',
      text: 'ต้องการบันทึกข้อมูลหรือไม่',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then(async result => {
      if (result.value) {
        this.submit();
      }
      else {
        this.modalService.dismissAll()
      }
    });
  }

  public setGroupUser(data) {
    data ? console.log(data) : null
    return data ? this.formBuilder.group({
      Person: [data.Person],
      GroupUserName: [data.Person[0].GroupUserName, [Validators.required]],
      GroupUserId: [data.GroupUserId, [Validators.required]],
    }) : this.formBuilder.group({
      Person: [[]],
      GroupUserName: ['', [Validators.required]],
    })
  }
}
