import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {validForm} from '../../../shared/library/form';
import {ActivatedRoute} from '@angular/router';
import SimpleCrypto from 'simple-crypto-js/build/SimpleCrypto';

@Component({
  selector: 'modal-coordinator-information',
  templateUrl: './modal-coordinator-information.component.html',
  styleUrls: ['./modal-coordinator-information.component.css']
})
export class ModalCoordinatorInformationComponent implements OnInit {

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  public alertValid = false;
  public coordinatorForm: FormGroup;
  public contactCoordinator: FormGroup;
  public update = false;
  public coordinateList = [];
  public titleCheck = false;
  public coordinate: any;
  public coordinateID: any;
  private alertValidPhone: boolean;
  private alertValidEmail: boolean;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    const Crypto = new SimpleCrypto('some-unique-key');
    this.coordinatorForm = this.setCoordinator();
    this.contactCoordinator = this.setPersonCoordinator();
    if (this.data) {
      this.update = true;
      this.coordinate = this.data;

    }
    this.coordinateID = Crypto.decrypt(decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id')));
  }

  private setCoordinator() {
    return this.formBuilder.group({
      CoordinatorTitle: ['', [Validators.required]],
      CoordinatorFirstName: ['', [Validators.required]],
      CoordinatorLastName: ['', [Validators.required]],
    });
  }

  private setPersonCoordinator() {
    return this.formBuilder.group({
      TypeContactId: ['1', [Validators.required]],
      Contact: ['', [Validators.required]],
      Importance: ['1', [Validators.required]],
    });
  }

  insertColumn() {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const emailon = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.contactCoordinator.controls.TypeContactId.value == '2') {
      if (!phoneno.test(this.contactCoordinator.controls.Contact.value)) {
        this.alertValidPhone = true;
        return;
      }
    }
    if (this.contactCoordinator.controls.TypeContactId.value == '1') {
      if (!emailon.test(this.contactCoordinator.controls.Contact.value)) {
        this.alertValidEmail = true;
        return;
      }
    }
    if (validForm(this.contactCoordinator).length > 0) {
      this.alertValid = true;
      return;
    }
    this.coordinateList.push(this.contactCoordinator.value);
    this.contactCoordinator = this.setPersonCoordinator();
    if (this.update) {
      this.submit();
    }
  }

  deletetColumn(index) {
    this.coordinateList.splice(index, 1);
  }

  submit() {

    if (this.coordinateList.length == 0) {
      this.alertValid = true;
      return;
    }

    const coordinator = this.coordinatorForm.value;
    const response = [];

    for (let index = 0; index < this.coordinateList.length; index++) {
      let temp;
      if (this.update) {
         temp = {
          TitleNameTh: coordinator.CoordinatorTitle,
          FristNameTh: coordinator.CoordinatorFirstName,
          LastNameTh: coordinator.CoordinatorLastName,
          TypeContactId: this.coordinateList[index].TypeContactId,
          Importance: this.coordinateList[index].Importance,
          Contact: this.coordinateList[index].Contact,
          CoordinatorId : this.data.CoordinatorId
        };
      } else {
        temp = {
          TitleNameTh: coordinator.CoordinatorTitle,
          FristNameTh: coordinator.CoordinatorFirstName,
          LastNameTh: coordinator.CoordinatorLastName,
          TypeContactId: this.coordinateList[index].TypeContactId,
          Importance: this.coordinateList[index].Importance,
          Contact: this.coordinateList[index].Contact,
        };
      }


      response.push(temp);
    }

    this.onSubmit.emit(response);
    return this.modalService.dismissAll();
  }

  closeModal() {
    return this.modalService.dismissAll();
  }
}
