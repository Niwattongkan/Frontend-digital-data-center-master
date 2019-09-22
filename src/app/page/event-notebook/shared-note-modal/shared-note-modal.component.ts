import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyOptions } from 'mydatepicker-th';

import { SharedService } from '../../../shared/services/shared.service'
import { PersonsService } from '../../../shared/services/persons.service'
import { validForm } from '../../../shared/library/form';

@Component({
  selector: 'shared-note-modal',
  templateUrl: './shared-note-modal.component.html',
  styleUrls: ['./shared-note-modal.component.css'],
})
export class SharedNoteModalComponent implements OnInit {

  public personList: any = []
  public groupList: any = []

  public noteForm: FormGroup
  public alertValid = false

  public typePerson = '1'

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  public dropdownSettingsPerson = {
    singleSelection: false,
    idField: 'PersonId',
    textField: 'FullnameTh',
    selectAllText: 'เลือกทั้งหมด',
    unSelectAllText: 'ลบทั้งหมด',
    itemsShowLimit: 40,
    allowSearchFilter: true
  };

  public dropdownSettingsGroup = {
    singleSelection: false,
    idField: 'GroupUserId',
    textField: 'FullnameTh',
    selectAllText: 'เลือกทั้งหมด',
    unSelectAllText: 'ลบทั้งหมด',
    itemsShowLimit: 40,
    allowSearchFilter: true
  };

  constructor(
    private modalService: NgbModal,
    private sharedService: SharedService,
    private personsService: PersonsService,
    private formBuilder: FormBuilder,
  ) {
    this.noteForm = this.setNote(null)
  }

  async ngOnInit() {
    this.noteForm = this.data ? this.setNote(this.data) : this.setNote(null)
    this.personList = this.setPerson((await this.personsService.getallperson().toPromise()).data)
    this.groupList = this.setGroup((await this.sharedService.getallgroupuser().toPromise()).data)
  }

  changeMode(value) {
    this.typePerson = value
  }

  submit() {
    if (validForm(this.noteForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.noteForm.value)
    return this.modalService.dismissAll()
  }

  closeModal() {
    this.modalService.dismissAll()
  }

  public setPerson(list) {
    for (let index = 0; index < list.length; index++) {
      let title = list[index].GroupUserName == 1 ? 'นาย' : list[index].GroupUserName == 2 ? 'นางสาว' : 'นาง'
      list[index].FullnameTh = title + list[index].FristNameTh + ' ' + list[index].LastNameTh
    }
    return list
  }

  public setGroup(list) {
    for (let index = 0; index < list.length; index++) {
      let title = list[index].GroupUserName == 1 ? 'นาย' : list[index].GroupUserName == 2 ? 'นางสาว' : 'นาง'
      list[index].FullnameTh = 'กลุ่ม' + list[index].GroupUserName + ' (' + title + list[index].FristNameTh + ' ' + list[index].LastNameTh + ")"
    }
    return list
  }

  public setNote(data) {
    return data ? this.formBuilder.group({
      ShareNoteId: [data.ShareNoteId],
      Person: [data.Person ? data.Person : []],
      Group: [data.Group],
      StartDate: [data.StartDate, [Validators.required]],
      EndDate: [data.EndDate, [Validators.required]],
      NoteId: [data.NoteId],
    }) : this.formBuilder.group({
      Person: [[]],
      Group: [[]],
      StartDate: ["", [Validators.required]],
      EndDate: ["", [Validators.required]],
    })
  }
}
