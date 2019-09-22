import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { calulateAge } from '../../../../shared/library/date';

@Component({
  selector: 'persons-detail-profile',
  templateUrl: './persons-detail-profile.component.html',
  styleUrls: ['./persons-detail-profile.component.css']
})
export class PersonsDetailProfileComponent implements OnInit {

  public profileForm: any = {};
  public personId = ""
  public imageProfile = ""

  @Input() inputForm: any;
  
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  async ngOnChanges() {
    this.profileForm = this.inputForm ? this.setProfile(this.inputForm) : {}
    this.personId = this.inputForm ? this.inputForm.PersonId : ""
    this.imageProfile = this.inputForm ? "http://qdoc.ecmxpert.com:8008/api/uapi/q/ddc/getphotoperson?PersonId="+ this.inputForm.PersonId : null
  }

  private setProfile(data) {
    let result = data
    result.TitleNameTh = result.TitleNameTh == 1 ? "นาย" : result.TitleNameTh == 2 ? "นางสาว" : "นาง"
    result.TitleNameEn = result.TitleNameEn == 1 ? "Mr." : result.TitleNameEn == 2 ? "Mrs." : "Miss"
    result.Sex = result.Sex == 1 ? "ชาย" : "หญิง"
    result.Religion = result.Religion == 1 ? "พุทธ" : result.Religion == 2 ? "คริส" : "อิสลาม"
    result.EthnicityId = result.EthnicityId == 1 ? "ไทย" : "ต่างชาติ"
    result.Marital = result.Marital == 1 ? "โสด" : result.Marital == 2 ? "แต่งงาน" : result.Marital == 3 ? "หย่า" : "เป็นหม้าย"
    result.Soldierly = result.Soldierly == 1 ? "อยู่ในระหว่างรับราชการทหาร" : result.Soldierly == 2 ? "ผ่านการเกณฑ์ทหารมาแล้วโดยการเป็นทหารเกณฑ์" : "ได้รับการยกเว้น"
    return result
  }

  public showAge(date) {
    return calulateAge(date)
  }

  setYear(date) {
    if(date) {
      let temp = new Date(date)
      temp.setFullYear(temp.getFullYear() + 543)
      return temp
    }

  }


}
