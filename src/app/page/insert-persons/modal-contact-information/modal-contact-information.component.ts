import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { validForm } from '../../../shared/library/form';

@Component({
  selector: 'modal-contact-information',
  templateUrl: './modal-contact-information.component.html',
  styleUrls: ['./modal-contact-information.component.css']
})
export class ModalContactInformationComponent implements OnInit {

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  public alertValid = false
  public contactForm: FormGroup

  public contactList = []

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.contactForm = this.setContact()
  }

  ngOnInit() {
    this.contactForm = this.setContact()
    this.data ? this.data.forEach(element => {
      this.contactList.push({
        TypeContactId: element.TypeContactId,
        Contact: element.Contact,
        Importance: element.Importance,
      })
    }) : null
  }

  private setContact() {
    return this.formBuilder.group({
      TypeContactId: [1, [Validators.required]],
      Contact: ["", [Validators.required]],
      Importance: [1, [Validators.required]],
    })
  }

  insertColumn() {
    if (validForm(this.contactForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.contactList.push(this.contactForm.value)
    this.contactForm = this.setContact()
  }

  deletetColumn(index) {
    this.onDelete.emit(index)
    this.contactList.splice(index, 1);
  }

  submit() {
    if (this.contactList.length == 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.contactList)
    this.modalService.dismissAll()
  }

  closeModal() {
    return this.modalService.dismissAll()
  }

}
