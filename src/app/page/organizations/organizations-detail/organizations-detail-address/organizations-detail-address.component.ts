import { Component, Input } from '@angular/core';

@Component({
  selector: 'organizations-detail-address',
  templateUrl: './organizations-detail-address.component.html',
  styleUrls: ['./organizations-detail-address.component.css']
})
export class OrganizationsDetailAddressComponent {

  public addressForm: any = {};
  public addressType: any;

  @Input() inputForm: any;

  constructor() { }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnChanges() {
    this.addressForm = this.inputForm ? this.inputForm : {};
    this.addressType = this.addressForm.AddressType;
    console.log(this.addressForm)
  }

  public showAddress(value) {
    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const HouseNo = value.HouseNo ? 'เลขที่ ' + value.HouseNo + ' ' : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Subdistrict = value.Subdistrict ? 'ตำบล/แขวง ' + value.Subdistrict + ' ' : '';
    const District = value.District ? 'อำเภอ/เขต ' + value.District + ' ' : '';
    const zipcode = value.Zipcode ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';

    return Building + Floor + HouseNo + Road + Soi + Subdistrict + District + zipcode;
  }
}
