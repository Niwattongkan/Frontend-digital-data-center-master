import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { validForm } from '../../../shared/library/form';

@Component({
  selector: 'modal-contact-organization',
  templateUrl: './modal-contact-organization.component.html',
  styleUrls: ['./modal-contact-organization.component.css']
})
export class ModalContactOrganizationComponent implements OnInit {

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public alertValid = false;
  alertMsg: string;
  public contactForm: FormGroup;

  public contactList = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.contactForm = this.setContact(null)
  }

  ngOnInit() {
    this.contactForm = this.data ? this.setContact(this.data) : this.setContact(null);
  }

  private setContact(data) {
    return data ? this.formBuilder.group({
      CorporationContactId: [data.CorporationContactId],
      TypeContactId: [data.TypeContactId, [Validators.required]],
      Contact: [data.Contact, [Validators.required]],
      Importance: [data.Importance, [Validators.required]],
    })
      : this.formBuilder.group({
        TypeContactId: [1, [Validators.required]],
        Contact: ["", [Validators.required]],
        Importance: [1, [Validators.required]],
      })
  }

  insertColumn() {
    this.alertValid = false;
    if (validForm(this.contactForm).length > 0) {
      this.alertValid = true;
      this.alertMsg = "กรุณากรอกข้อมูลให้ครบถ้วน";
      return;
    }

    let v = this.contactForm.get('Contact').value;
    let type: string = this.contactForm.get('TypeContactId').value.toString();
    switch (type) {
      case '1':
        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(v)) {
          this.alertValid = true;
          this.alertMsg = "อีเมลล์ไม่ถูกต้อง";
          return;
        }
        break;
      case '2':
        if (!/^[0-9]*$/.test(v) || v.length < 9) {
          this.alertValid = true;
          this.alertMsg = "เบอร์โทรไม่ถูกต้อง";
          return;
        }
        break;
      case '7':
        if (!/^[0-9]*$/.test(v)) {
          this.alertValid = true;
          this.alertMsg = "โทรสารไม่ถูกต้อง";
          return;
        }
        break;
      default: break;
    }

    this.contactList.push(this.contactForm.value)
    this.contactForm = this.setContact(null)
  }

  deletetColumn(index) {
    this.contactList.splice(index, 1);
  }

  submit() {
    if (this.contactList.length == 0 && this.data == null) {
      this.alertValid = true;
      this.alertMsg = "กรุณากรอกข้อมูลให้ครบถ้วน";
      return;
    }
    if (this.data) this.contactList.push(this.contactForm.value);
    this.onSubmit.emit(this.contactList);
    return this.modalService.dismissAll()
  }

  closeModal() {
    return this.modalService.dismissAll()
  }
}
