import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonsService } from '../../../../shared/services/persons.service';

import { mapPersons } from '../../../../shared/library/mapList';
import { validForm } from '../../../../shared/library/form';

@Component({
  selector: 'persons-detail-address',
  templateUrl: './persons-detail-address.component.html',
  styleUrls: ['./persons-detail-address.component.css']
})
export class PersonsDetailAddressComponent {

  public addressList: any = {};
  public checkaddressList: any = [];

  public alertValid = false
  public shareAddressForm: FormGroup;

  @Input() inputForm: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
  ) {
    this.shareAddressForm = this.setShareAddress(null)
  }

  ngOnChanges() {
    this.addressList = this.inputForm ? this.inputForm : {}

  }

  submit() {
    if (validForm(this.shareAddressForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.personsService.insertcheckpersonaddress(this.shareAddressForm.value).toPromise()
    return this.modalService.dismissAll()
  }

  public async openModal(content, data) {
    this.checkaddressList = await mapPersons((await this.personsService.getcheckaddressperson(data.PersonAddressId).toPromise()).data)
    console.log(this.checkaddressList)
    return this.modalService.open(content, { size: 'lg' })
  }

  public async insertModalShare(content, data) {
    this.shareAddressForm = this.setShareAddress(data)
    return this.modalService.open(content)
  }

  public closeModal() {
    return this.modalService.dismissAll()
  }

  public setShareAddress(data) {
    return data ? this.formBuilder.group({
      PersonAddressId: [data.PersonAddressId],
      Detail: ['', [Validators.required]],
    }) : this.formBuilder.group({
      PersonAddressId: [''],
      Detail: ['', [Validators.required]],
    })
  }

}
