import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { PersonsService } from '../../../shared/services/persons.service';
import { ContactGroupService } from '../../../shared/services/contact-group.service';

import { validForm } from '../../../shared/library/form';
import { mapPersons } from '../../../shared/library/mapList';
import { HttpClient } from '@angular/common/http';
import { AuthlogService } from "../../../shared/services/authlog.service";


@Component({
  selector: 'event-group-modal',
  templateUrl: './event-group-modal.component.html',
  styleUrls: ['./event-group-modal.component.css']
})
export class EventGroupModalComponent implements OnInit {

  public title = ""
  public personList: any = [];
  ipAddress: any;
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
    private contactGroupService: ContactGroupService,
    private personsService: PersonsService,
    private formBuilder: FormBuilder,
    private authlogService: AuthlogService,
    private http: HttpClient
  ) {
    this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => { this.ipAddress = data })
    this.groupForm = this.setGroup(null)
  }

  async ngOnInit() {
    this.title = this.data ? "แก้ไขกลุ่ม" : "สร้างกลุ่ม"
    this.groupForm = this.data ? this.setGroup(this.data) : this.setGroup(null)
    this.groupForm.controls['Person'].setValue(this.mapGroupPerson(mapPersons(this.groupForm.controls['Person'].value)))
    this.personList = this.mapPersons((await this.personsService.getperson().toPromise()).data)
  }

  mapPersons(personList) {
    personList.map(data => {
      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
      let first = data.FristNameTh
      let last = data.LastNameTh
      data.FullnameTh = (first && last ? title + first + ' ' + last : '') + "\n" + this.showAddress(data)
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
    let Zipcode = value.Zipcode ? "ไปรษณีย์ " + value.Zipcode + " " : ""
    return Building + Floor + HouseNo + Road + Soi + Subdistrict + District + Zipcode
  }

  public mapPerson(personList) {
    personList.map(async data => {
      data.PersonAddress = []
      let address = (await this.personsService.getAddressById(data.PersonId).toPromise()).data
      data.PersonAddress = address.length > 0 ? address : []
    })
    return personList
  }

  public submit() {
    if (validForm(this.groupForm).length > 0) {
      this.alertValid = true;
      return;
    }
    console.log(this.groupForm.value)
    this.onSubmit.emit(this.groupForm.value)
     this.updateLog(this.groupForm.value)
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


  public mapGroupPerson(persons) {
    let list = []
    persons.forEach(async element => {
      list.push({
        PersonId: element.PersonId,
        FullnameTh: element.FullnameTh,
      })
    });
    return list
  }

  public setGroup(data) {
    return data ? this.formBuilder.group({
      ContactGroupId: [data.ContactGroupId],
      GroupName: [data.Person[0].GroupName, [Validators.required]],
      Person: [data.Person, [Validators.required]],
      CreateDate: [data.Person[0].CreateDate]
    }) : this.formBuilder.group({
      GroupName: ["", [Validators.required]],
      Person: [[], [Validators.required]],
    })
  }
  async updateLog(group) {
    await this.auditLogService("ชื่อกลุ่ม", "",  group.GroupName, this.ipAddress)
  }

  async auditLogService(field, origin, update, ipAddress) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: "เพิ่ม/แก้ไข กลุ่มการจัดส่งเอกสาร",
      UpdateField: field,
      DataOriginal: origin,
      UpdateData: update,
      IpAddress: ipAddress.ip
    }).toPromise()
  }
}
