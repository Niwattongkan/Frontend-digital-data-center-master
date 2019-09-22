import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { validForm } from '../../../shared/library/form';

@Component({
  selector: 'modal-coordinator-information',
  templateUrl: './modal-coordinator-information.component.html',
  styleUrls: ['./modal-coordinator-information.component.css']
})
export class ModalCoordinatorInformationComponent implements OnInit {

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public alertValid = false
  public coordinatorForm: FormGroup
  public contactCoordinator: FormGroup

  public coordinateList = []
  public titleCheck = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.coordinatorForm = this.setCoordinator()
    this.contactCoordinator = this.setPersonCoordinator()
  }

  private setCoordinator() {
    return this.formBuilder.group({
      CoordinatorTitle: ["", [Validators.required]],
      CoordinatorFirstName: ["", [Validators.required]],
      CoordinatorLastName: ["", [Validators.required]],
    })
  }

  private setPersonCoordinator() {
    return this.formBuilder.group({
      TypeContactId: ["1", [Validators.required]],
      Contact: ["", [Validators.required]],
      Importance: ["1", [Validators.required]],
    })
  }

  insertColumn() {
    if (validForm(this.contactCoordinator).length > 0) {
      this.alertValid = true;
      return;
    }
    this.coordinateList.push(this.contactCoordinator.value)
    this.contactCoordinator = this.setPersonCoordinator()
  }

  deletetColumn(index) {
    this.coordinateList.splice(index, 1);
  }

  submit() {

    if (this.coordinateList.length == 0) {
      this.alertValid = true;
      return;
    }

    let coordinator = this.coordinatorForm.value;
    let response = []

    for (let index = 0; index < this.coordinateList.length; index++) {
      let temp = {
        TitleNameTh: coordinator.CoordinatorTitle,
        FristNameTh: coordinator.CoordinatorFirstName,
        LastNameTh: coordinator.CoordinatorLastName,
        TypeContactId: this.coordinateList[index].TypeContactId,
        Importance: this.coordinateList[index].Importance,
        Contact: this.coordinateList[index].Contact,
      }

      response.push(temp)
    }

    this.onSubmit.emit(response)
    return this.modalService.dismissAll()
  }

  closeModal() {
    return this.modalService.dismissAll()
  }
}
