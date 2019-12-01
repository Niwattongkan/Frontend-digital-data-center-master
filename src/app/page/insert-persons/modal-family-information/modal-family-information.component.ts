import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { validForm } from '../../../shared/library/form';
import {PersonsService} from '../../../shared/services/persons.service';

@Component({
  selector: 'modal-family-information',
  templateUrl: './modal-family-information.component.html',
  styleUrls: ['./modal-family-information.component.css']
})
export class ModalFamilyInformationComponent implements OnInit {

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public titleThCheck = false;
  public alertValid = false;
  public familyForm: FormGroup
  public tiltelFamily;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private personsService: PersonsService

  ) {
    this.familyForm = this.setFamily(null)

  }

  ngOnInit() {
    this.familyForm = this.data ? this.setFamily(this.data) : this.setFamily(null)
    this.isUpdate(this.data)
  }

  submit() {
    if (!this.familyForm.controls.FristNameTh.value) {
      this.alertValid = true;
      return;
    }
    if (!this.familyForm.controls.LastNameTh.value) {
      this.alertValid = true;
      return;
    }
    if (!this.familyForm.controls.Relation.value) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.familyForm.value)
    return this.modalService.dismissAll()
  }

  closeModal() {
    return this.modalService.dismissAll()
  }

  private setFamily(data) {
    return data ? this.formBuilder.group({
      FamilyId: [data.FamilyId],
      Relation: [data.Relation, [Validators.required]],
      TitleNameTh: [data.TitleNameTh1, [Validators.required]],
      TitleNameOtherTh: [data.TitleNameOtherTh],
      FristNameTh: [data.FristNameTh1, [Validators.required]],
      LastNameTh: [data.LastNameTh1, [Validators.required]],
      Contact: [data.Contact],
    }) :
      this.formBuilder.group({
        Relation: ["", [Validators.required]],
        TitleNameTh: [1, [Validators.required]],
        TitleNameOtherTh: [""],
        FristNameTh: ["", [Validators.required]],
        LastNameTh: ["", [Validators.required]],
        Contact: [""],
      })
  }
  private async isUpdate(data) {
    const isUpdateFamily  = (await this.personsService.getFamilyById(data.FamilyId).toPromise()).data
    this.tiltelFamily = (isUpdateFamily) ? 'แก้ไขข้อมูลสมาชิกในครอบครัว' : 'เพิ่มข้อมูลสมาชิกในครอบครัว';
  }


}
