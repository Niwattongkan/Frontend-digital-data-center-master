import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {validForm} from '../../../shared/library/form';

@Component({
  selector: 'modal-contact-information',
  templateUrl: './modal-contact-information.component.html',
  styleUrls: ['./modal-contact-information.component.css']
})
export class ModalContactInformationComponent implements OnInit {


  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  public alertValid = false;
  public alertValidNumber = false;
  public contactForm: FormGroup;
  public update = false;
  public contactList = [];
  public Contact: any;
  public alertValidEmail: boolean;
  public alertValidPhone: boolean;
  public title: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.contactForm = this.setContact();
  }

  ngOnInit() {
    this.contactForm = this.setContact();
    this.title = 'เพิ่มข้อมูลการติดต่อ';
    if (this.data != null) {
      this.update = true;
      this.Contact = this.data.TypeContact;
      this.title = 'แก้ไขข้อมูลการติดต่อ';
    }
  }

  private setContact() {
    return this.formBuilder.group({
      TypeContactId: [1, [Validators.required]],
      Contact: ['', [Validators.required]],
      Importance: [1, [Validators.required]],
    });
  }

  insertColumn() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if ((validForm(this.contactForm).length > 0 && this.update == false) || this.contactForm.controls.Contact.value == '') {
      this.alertValid = true;
      return;
    }
    if (this.contactForm.controls.TypeContactId.value == '1') {
      if (!re.test(this.contactForm.controls.Contact.value)) {
        this.alertValidEmail = true;
        return;
      }
    }
    if (this.contactForm.controls.TypeContactId.value == '2') {
      if (!phoneno.test(this.contactForm.controls.Contact.value)) {
        this.alertValidPhone = true;
        return;
      }
    }
    if (!isNaN(this.contactForm.controls.Contact.value) && this.contactForm.controls.TypeContactId.value == 2 &&  ! /^\d{10}$/.test(this.contactForm.controls.Contact.value)) {
      if (this.data !== undefined) {
        if ((this.data.TypeContactId == 2 && this.contactForm.controls.TypeContactId.value == 1)) {
          this.alertValidNumber = true;
          return false;
        }
      }
      this.alertValidNumber = true;
      return false;
    }
    this.contactList.push(this.contactForm.value);
    this.contactList.push(this.data.PersonContactId ? this.data.PersonContactId : null);
    this.contactForm = this.setContact();
    if (this.update) {
      this.submit();
    }
  }

  deletetColumn(index) {
    this.onDelete.emit(index);
    this.contactList.splice(index, 1);
  }

  submit() {
    if (this.contactList.length == 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.contactList);
    this.modalService.dismissAll();
  }

  closeModal() {
    return this.modalService.dismissAll();
  }
}
