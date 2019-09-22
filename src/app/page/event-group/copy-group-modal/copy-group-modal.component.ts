import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonsService } from '../../../shared/services/persons.service';

import { validForm } from '../../../shared/library/form';
import { mapPersons } from '../../../shared/library/mapList';

@Component({
  selector: 'copy-group-modal',
  templateUrl: './copy-group-modal.component.html',
  styleUrls: ['./copy-group-modal.component.css']
})
export class CopyGroupModalComponent implements OnInit {

  public personList: any = [];

  public alertValid = false
  public groupForm: FormGroup;

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

  constructor(
    private modalService: NgbModal,
    private personsService: PersonsService,
    private formBuilder: FormBuilder,
  ) {
    this.groupForm = this.setGroup(null)
  }

  async ngOnInit() {
    this.groupForm = this.data ? this.setGroup(this.data) : this.setGroup(null)
    this.groupForm.controls['Person'].setValue(this.mapGroupPerson(mapPersons(this.groupForm.value.Person)))
    this.personList = this.mapPersons((await this.personsService.getallperson().toPromise()).data)
  }

  mapPersons(personList) {
    personList.map(data => {
      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
      let first = data.FristNameTh
      let last = data.LastNameTh
      data.FullnameTh = (first && last ? title + first + ' ' + last : '') + this.showAddress(data)
      let titleEn = data.TitleNameEn == 1 ? 'Mr.' : data.TitleNameEn == 2 ? 'Mrs.' : 'Miss.'
      let firstEn = data.FristNameEn
      let lastEn = data.LastNameEn
      data.FullnameEn = firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : ''
    });
    return personList
  }

  showAddress(value) {
    let Building = value.Building ? "อาคาร " + value.Building + " " : ""
    let Floor = value.Floor ? "ชั้น " + value.Floor + " " : ""
    let HouseNo = value.HouseNo ? "เลขที่ " + value.HouseNo + " " : ""
    let Road = value.Road ? "ถนน " + value.Road + " " : ""
    let Soi = value.Soi ? "ซอย " + value.Soi + " " : ""
    let Subdistrict = value.Subdistrict ? "ตำบล/แขวง " + value.Subdistrict + " " : ""
    let District = value.District ? "อำเภอ/เขต " + value.District + " " : ""
    return Building + Floor + HouseNo + Road + Soi + Subdistrict + District
  }

  public submit() {
    if (validForm(this.groupForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.groupForm.value)
    return this.modalService.dismissAll()
  }

  public closeModal() {
    this.modalService.dismissAll()
  }


  public mapGroupPerson(persons) {
    let list = []
    persons.forEach(element => {
      list.push({
        PersonId: element.PersonId,
        FullnameTh: element.FullnameTh,
      })
    });
    return list
  }

  public setGroup(data) {
    return data ? this.formBuilder.group({
      GroupName: ["", [Validators.required]],
      Person: [data.Person, [Validators.required]],
      CreateDate: [data.Person[0].CreateDate]
    }) :
      this.formBuilder.group({
        GroupName: ['', [Validators.required]],
        Person: [[], [Validators.required]],
      })
  }
}