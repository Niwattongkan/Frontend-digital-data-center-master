import { Component, Input } from '@angular/core';

@Component({
  selector: 'organizations-detail-address',
  templateUrl: './organizations-detail-address.component.html',
  styleUrls: ['./organizations-detail-address.component.css']
})
export class OrganizationsDetailAddressComponent {

  public addressForm: any = {};
  public addressType: any;

  @Input() inputForm: any = []

  constructor() { }

  async ngOnChanges() {
    this.addressForm = this.inputForm ? this.inputForm : {}
    this.addressType = this.addressForm.AddressType
  }

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
}
