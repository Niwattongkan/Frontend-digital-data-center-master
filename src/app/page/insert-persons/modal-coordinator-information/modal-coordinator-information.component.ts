import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { validForm } from '../../../shared/library/form';
import { ActivatedRoute } from '@angular/router';
import SimpleCrypto from 'simple-crypto-js/build/SimpleCrypto';
import { PersonsService } from 'src/app/shared/services/persons.service';
import { alertEvent } from 'src/app/shared/library/alert';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-coordinator-information',
  templateUrl: './modal-coordinator-information.component.html',
  styleUrls: ['./modal-coordinator-information.component.css']
})
export class ModalCoordinatorInformationComponent implements OnInit {

  @Input() data: any;
  @Input() PersonId: number;

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
    private personsService: PersonsService,
  ) {

  }

  ngOnInit() {
    const Crypto = new SimpleCrypto('some-unique-key');
    this.coordinatorForm = this.setCoordinator();
    this.contactCoordinator = this.setPersonCoordinator();
    if (this.data) this.update = true;
    this.coordinateID = Crypto.decrypt(decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id')));
  }

  setCoordinator() {
    return this.data ? this.formBuilder.group({
      CoordinatorTitle: [this.data.TitleNameTh, [Validators.required]],
      CoordinatorFirstName: [this.data.FristNameTh, [Validators.required]],
      CoordinatorLastName: [this.data.LastNameTh, [Validators.required]],
    }) : this.formBuilder.group({
      CoordinatorTitle: ['', [Validators.required]],
      CoordinatorFirstName: ['', [Validators.required]],
      CoordinatorLastName: ['', [Validators.required]],
    });
  }

  setPersonCoordinator() {
    return this.data ? this.formBuilder.group({
      CoordinatorContactId: [this.data.CoordinatorContactId, [Validators.required]],
      TypeContactId: [this.data.TypeContactId, [Validators.required]],
      Contact: [this.data.Contact, [Validators.required]],
      Importance: ['1', [Validators.required]],
    }) :
      this.formBuilder.group({
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
    let coordinator = this.coordinatorForm.value;
    let e = this.contactCoordinator.value;
    if (this.update) {
      let temp: any = {
        PersonId: this.PersonId,
        TitleNameTh: coordinator.CoordinatorTitle,
        FristNameTh: coordinator.CoordinatorFirstName,
        LastNameTh: coordinator.CoordinatorLastName,
        TypeContactId: e.TypeContactId,
        Importance: e.Importance,
        Contact: e.Contact,
        CoordinatorId: this.data.CoordinatorId,
        CoordinatorContactId: e.CoordinatorContactId
      };
      this.personsService.updateCoordinator(temp).toPromise().then(res => {
        if (!res.successful) return alert(res.message);
        this.personsService.updateCoordinatorcontact(temp).toPromise().then(res2 => {
          if (!res2.successful) return alert(res2.message);
          this.submit();
        });
      });
    } else {
      let temp: any = {
        PersonId: this.PersonId,
        TitleNameTh: coordinator.CoordinatorTitle,
        FristNameTh: coordinator.CoordinatorFirstName,
        LastNameTh: coordinator.CoordinatorLastName,
        TypeContactId: e.TypeContactId,
        Importance: e.Importance,
        Contact: e.Contact,
      };
      this.personsService.insertCoordinator(temp).toPromise().then(res => {
        if (!res.successful) return alert(res.message);
        temp.CoordinatorId = res.data[0].CoordinatorId;
        this.personsService.insertcoordinatorcantact(temp).toPromise().then(res2 => {
          if (!res2.successful) return alert(res2.message);
          this.coordinateList.push(this.contactCoordinator.value);
          this.contactCoordinator = this.setPersonCoordinator();
        });
      });
    }
  }

  deletetColumn(index) {
    this.coordinateList.splice(index, 1);
  }

  submit() {
    if (!this.update && this.coordinateList.length == 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(true);
    return this.modalService.dismissAll();
  }

  closeModal() {
    if (this.coordinatorForm.dirty || this.contactCoordinator.dirty)
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
