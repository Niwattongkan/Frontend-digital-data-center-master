import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { validForm } from '../../../shared/library/form';
import { PersonsService } from 'src/app/shared/services/persons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-contact-information',
  templateUrl: './modal-contact-information.component.html',
  styleUrls: ['./modal-contact-information.component.css']
})
export class ModalContactInformationComponent implements OnInit {

  @Input() PersonId: number;
  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  public alertValid = false;
  public alertValidNumber = false;
  public contactForm: FormGroup;
  public update = false;
  public contactListModal = [];
  public contactList = [];
  public Contact: any;
  public alertValidEmail: boolean;
  public alertValidPhone: boolean;
  public title: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
  ) {
    this.contactForm = this.setContact();
  }

  ngOnInit() {
    this.contactForm = this.setContact();
    this.title = 'เพิ่มข้อมูลการติดต่อ';
    if (this.data != null) {
      console.log(this.data);
      this.update = true;
      this.Contact = this.data.TypeContact;
      this.title = 'แก้ไขข้อมูลการติดต่อ';
      // this.contactListModal = this.data;
      this.contactForm = this.formBuilder.group({
        PersonId: [this.PersonId, [Validators.required]],
        TypeContactId: [this.data.TypeContactId, [Validators.required]],
        Contact: [this.data.Contact, [Validators.required]],
        Importance: [this.data.Importance, [Validators.required]],
        PersonContactId: [this.data.PersonContactId, [Validators.required]],
      });
    }
  }



  private setContact() {
    return this.formBuilder.group({
      PersonId: [this.PersonId, [Validators.required]],
      TypeContactId: [1, [Validators.required]],
      Contact: ['', [Validators.required]],
      Importance: [1, [Validators.required]],
      PersonContactId: ['', [Validators.required]],
    });
  }

  insertColumn() {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (this.contactForm.controls.Contact.value == '') {
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
    if (!isNaN(this.contactForm.controls.Contact.value) && this.contactForm.controls.TypeContactId.value == 2 && ! /^\d{10}$/.test(this.contactForm.controls.Contact.value)) {
      if (this.data !== undefined) {
        if ((this.data.TypeContactId == 2 && this.contactForm.controls.TypeContactId.value == 1)) {
          this.alertValidNumber = true;
          return false;
        }
      }
      this.alertValidNumber = true;
      return false;
    }


    if (this.update) {
      this.personsService.updatePersonContact(this.contactForm.value).toPromise().then(res => {
        if (!res.successful) return alert(res.message);
        this.submit();
      });

    } else {
      this.personsService.insertPersonContact(this.contactForm.value).toPromise().then(res => {
        if (!res.successful) return alert(res.message);
        this.contactListModal.push(this.contactForm.value);
        this.contactForm = this.setContact();
      });
    }
  }

  deletetColumn(index) {
    let model = this.contactListModal[index];
    this.personsService.deletepersoncontact(model.PersonContactId).toPromise().then(res => {
      if (!res.successful) return alert(res.message);
      this.onDelete.emit(index);
      this.contactListModal.splice(index, 1);
    })
  }

  submit() {
    if (this.update) {
      this.onSubmit.emit(true);
      this.modalService.dismissAll();
    }
    else {
      if (this.contactListModal.length == 0) {
        this.alertValid = true;
        return;
      }
      this.onSubmit.emit(true);
      this.modalService.dismissAll();
    }

  }

  closeModal() {
    if (this.contactForm.dirty)
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
        if (!result.value) {
          return this.modalService.dismissAll();
        }
      });
    else {
      return this.modalService.dismissAll();
    }
  }
  
}
