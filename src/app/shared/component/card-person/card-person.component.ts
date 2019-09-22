import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.css'],
})
export class CardPersonComponent implements OnInit {

  public isCollapsed = true;

  public currentPath = "";
  public imagePerson = "";

  @Input() data: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
  ) { }

  async ngOnInit() {

  }

  async ngOnChanges() {
    this.currentPath = this.router.url
    this.data = await this.setProfile(this.data)
    this.imagePerson = "http://qdoc.ecmxpert.com:8008/api/uapi/q/ddc/getphotoperson?PersonId=" + this.data.PersonId
  }

  public deletePerson(id) {
    this.onDelete.emit(id);
  }

  public getYear(year) {
    let date = new Date(year)
    return 'ปี ' + (date.getFullYear() +543)
  }

  private setProfile(data) {
    let result = data
    result.TitleNameTh = result.TitleNameTh == 1 ? "นาย" : result.TitleNameTh == 2 ? "นางสาว" : "นาง"
    result.TitleNameEn = result.TitleNameEn == 1 ? "Mr." : result.TitleNameEn == 2 ? "Mrs." : "Miss"
    result.Sex = result.Sex == 1 ? "ชาย" : "หญิง"
    result.Religion = result.Religion == 1 ? "พุทธ" : result.Religion == 2 ? "คริส" : "อิสลาม"
    result.EthnicityId = result.EthnicityId == 1 ? "ไทย" : "ต่างชาติ"
    result.Marital = result.Marital == 1 ? "โสด" : result.Marital == 2 ? "แต่งงาน" : result.Marital == 3 ? "หย่า" : "เป็นหม้าย"
    return result
  }

  public showAddress(value) {

    let Building = value.Building ? "อาคาร " + value.Building + " " : ""
    let Floor = value.Floor ? "ชั้น " + value.Floor + " " : ""
    let Room = value.Room ? "ห้อง " + value.Room + " " : ""
    let HouseNumber = value.HouseNumber ? "เลขที่ " + value.HouseNumber + " " : ""
    let Road = value.Road ? "ถนน " + value.Road + " " : ""
    let Soi = value.Soi ? "ซอย " + value.Soi + " " : ""
    let Province = value.Province != '' ? "จังหวัด " + value.Province + " " : ""
    let Subdistrict = value.Subdistrict != '' ? "ตำบล/แขวง " + value.Subdistrict + " " : ""
    let District = value.District != '' ? "อำเภอ/เขต " + value.District + " " : ""
    let Zipcode = value.Zipcode != '' ? "รหัสไปรษณีย์ " + value.Zipcode + " " : ""
    return Building + Floor + Room + HouseNumber + Road + Soi + Province + District + Subdistrict + Zipcode
  }

}
