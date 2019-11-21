import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonsService } from '../../../shared/services/persons.service';
import Swal from "sweetalert2";
import { validForm } from '../../../shared/library/form';
import { mapPersons } from '../../../shared/library/mapList';

@Component({
  selector: 'setting-permission-modal',
  templateUrl: './permission-modal.component.html',
  styleUrls: ['./permission-modal.component.css']
})
export class PermissionModalComponent implements OnInit {

  public title = ""

  public personList: any = [];

  public alertValid = false
  public boardForm: FormGroup;

  public dropdownSettings = {
    singleSelection: false,
    idField: 'PersonId',
    textField: 'FullnameTh',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
  ) { }

  async ngOnInit() {
    this.title = this.data ? "แก้ไขกลุ่มสิทธิ์" : "สร้างกลุ่มสิทธิ์"
    this.boardForm = this.data ? this.setGroup(this.data) : this.setGroup(null)
    this.boardForm.controls['Person'].setValue(this.mapGroupPerson(mapPersons(this.boardForm.value.Person)))
    this.personList = mapPersons((await this.personsService.getallperson().toPromise()).data)
  }

  public mapGroupPerson(persons) {
    let list = []
    persons.forEach(element => {
      list.push({
        PersonId: element.PersonId,
        FullnameTh: element.FullnameTh,
      })
    });
    return list
  }

  public submit() {
    if (validForm(this.boardForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.boardForm.value)
    return this.modalService.dismissAll()
  }

  closeModal() {
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
      if (result.value) {
        this.submit();
      }
      else {
        this.modalService.dismissAll()
      }
    });
  }

  public setGroup(data) {
    return data ? this.formBuilder.group({
      BoardId: [data.BoardId],
      BoardName: [data.Person[0].BoardName, [Validators.required]],
      TypeRole: [1],
      Person: [data.Person, [Validators.required]],
      CreateDate: [data.Person[0].CreateDate]
    }) : this.formBuilder.group({
      BoardName: ["", [Validators.required]],
      Person: [[], [Validators.required]],
      TypeRole: [1],
    })
  }
}
