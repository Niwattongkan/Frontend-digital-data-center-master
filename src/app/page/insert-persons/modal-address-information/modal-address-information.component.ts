import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DropdownService } from '../../../shared/services/dropdown.service';

import { validForm } from '../../../shared/library/form';

@Component({
  selector: 'modal-address-information',
  templateUrl: './modal-address-information.component.html',
  styleUrls: ['./modal-address-information.component.css']
})
export class ModalAddressInformationComponent implements OnInit {

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public alertValid = false
  public addressForm: FormGroup

  public province: any = [];
  public subdistrict: any = [];
  public district: any = [];
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService
  ) {
    this.addressForm = this.setAddress(null)
  }

  async ngOnInit() {
    this.province = (await this.dropdownService.getProvinceAll().toPromise()).data
    this.addressForm = this.data ? this.setAddress(this.data) : this.setAddress(null)

    this.data ? await this.setLocation(this.data) : null

    this.addressForm.get('Province').valueChanges.subscribe(value => this.showDistrict(value));
    this.addressForm.get('District').valueChanges.subscribe(value => this.showSubdistrict(value));
    this.data ? this.addressForm.get('Zipcode').setValue(this.data.Zipcode) : null
  }

  public async showDistrict(data) {
    this.district = (await this.dropdownService.getDistrictByProvince(data).toPromise()).data
  }

  public async showSubdistrict(data) {
    this.subdistrict = (await this.dropdownService.getSubdistrictByDistrict(data).toPromise()).data
    let zipcode = this.district.find(sub => {
      return sub.Name == data
    })
    zipcode ? this.addressForm.controls['Zipcode'].setValue(zipcode.ZipCode) : null
  }

  public setLocation(data) {
    data.Province ? this.showDistrict(data.Province) : null
    data.District ? this.showSubdistrict(data.District) : null
  }

  private setAddress(data) {
    return data ? this.formBuilder.group({
      PersonAddressId: [data.PersonAddressId],
      TypeAddress: [Number(data.TypeAddress), [Validators.required]],
      Subdistrict: [data.Subdistrict],
      District: [data.District, [Validators.required]],
      Province: [data.Province, [Validators.required]],
      Zipcode: [data.Zipcode, [Validators.required]],
      HouseNumber: [data.HouseNumber, [Validators.required]],
      Building: [data.Building],
      Floor: [data.Floor],
      Room: [data.Room],
      Road: [data.Road, [Validators.required]],
      Soi: [data.Soi, [Validators.required]],
    }) : this.formBuilder.group({
      TypeAddress: [1, [Validators.required]],
      Subdistrict: [""],
      District: ["", [Validators.required]],
      Province: ["", [Validators.required]],
      Zipcode: ["", [Validators.required]],
      HouseNumber: ["", [Validators.required]],
      Building: [""],
      Floor: [""],
      Room: [""],
      Road: ["", [Validators.required]],
      Soi: ["", [Validators.required]],
    })
  }

  submit() {
    if (validForm(this.addressForm).length > 0) {
      this.alertValid = true;
      return;
    }
    console.log(this.addressForm.value)

    this.onSubmit.emit(this.addressForm.value)
    return this.modalService.dismissAll()
  }

  closeModal() {
    return this.modalService.dismissAll()
  }
}
