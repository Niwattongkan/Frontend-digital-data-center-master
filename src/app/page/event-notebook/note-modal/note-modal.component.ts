import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonsService } from '../../../shared/services/persons.service';

import { validForm } from '../../../shared/library/form';

@Component({
  selector: 'event-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})

export class NoteModalComponent implements OnInit {

  public title = "";

  public personList: any = [];

  public alertValid = false
  public noteForm: FormGroup;

  public dropdownSettings = {
    singleSelection: true,
    idField: 'PersonId',
    textField: 'FullnameTh',
    allowSearchFilter: true
  };

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
    private personsService: PersonsService,
    private formBuilder: FormBuilder,
  ) {
    this.noteForm = this.setNote(null)
  }

  async ngOnInit() {
    this.title = this.data ? "แก้ไขบันทึก" : "เพิ่มบันทึกใหม่"
    this.personList = this.mapPersons((await this.personsService.getallperson().toPromise()).data)
    this.noteForm = this.data ? this.setNote(this.data) : this.setNote(null)
  }

  public mapPersons(personList) {
    personList.map(data => {
      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นาง' : 'นางสาว'
      let first = data.FristNameTh
      let last = data.LastNameTh

      data.FullnameTh = first && last ? title + first + ' ' + last : ''

    });
    return personList
  }

  // public mapPersonAddress(persons) {
  //   persons.map(async person => {
  //     person.PersonAddress = []
  //     let address = (await this.personsService.getAddressById(person.PersonId).toPromise()).data
  //     person.PersonAddress = address.length > 0 ? address : []
  //   });
  //   return persons
  // }

  public showAddress(value) {
    let Building = value.Building ? "อาคาร " + value.Building + " " : ""
    let Floor = value.Floor ? "ชั้น " + value.Floor + " " : ""
    let HouseNo = value.HouseNo ? "เลขที่ " + value.HouseNo + " " : ""
    let Road = value.Road ? "ถนน " + value.Road + " " : ""
    let Soi = value.Soi ? "ซอย " + value.Soi + " " : ""
    let Subdistrict = value.Subdistrict ? "ตำบล/แขวง " + value.Subdistrict + " " : ""
    let District = value.District ? "อำเภอ/เขต " + value.District + " " : ""
    return Building + Floor + HouseNo + Road + Soi + Subdistrict + District
  }

  submit() {
    if (validForm(this.noteForm).length > 0) {
      this.alertValid = true;
      return;
    }
    let model: any = {
      PersonId: this.noteForm.value.Person[0].PersonId,
      Person: this.noteForm.value.Person[0].PersonId,
      NoteName: this.noteForm.value.NoteName,
      Description: this.noteForm.value.Description,
    }
    this.data ? model.NoteId = this.data.NoteId : null
    this.onSubmit.emit(model)
    return this.modalService.dismissAll()
  }

  public closeModal() {
    this.modalService.dismissAll()
  }

  public setNote(data) {
    return data ? this.formBuilder.group({
      CreateDate: [data.CreateDate],
      NoteId: [data.NoteId],
      Person: [[{ PersonId: data.PersonId, FullnameTh: data.FullnameTh, AddressPerson: data }]],
      NoteName: [data.NoteName, [Validators.required]],
      Description: [data.Description, [Validators.required]],
    }) : this.formBuilder.group({
      Person: [[]],
      NoteName: ["", [Validators.required]],
      Description: ["", [Validators.required]],
    })
  }
}
