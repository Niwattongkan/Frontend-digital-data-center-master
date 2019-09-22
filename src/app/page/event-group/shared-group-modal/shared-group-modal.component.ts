import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyOptions } from 'mydatepicker-th';

import { PersonsService } from '../../../shared/services/persons.service';
import { ContactGroupService } from '../../../shared/services/contact-group.service';

import { validForm } from '../../../shared/library/form';


@Component({
  selector: 'shared-group-modal',
  templateUrl: './shared-group-modal.component.html',
  styleUrls: ['./shared-group-modal.component.css'],
  // providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class SharedGroupModalComponent implements OnInit {

  public personList: any = [];
  public contactGroupList: any = [];
  public personGroupList: any = [];

  public alertValid = false
  public typePerson = '1'
  public shareForm: FormGroup;

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  public dropdownSettings = {
    singleSelection: false,
    idField: 'PersonId',
    textField: 'FristNameTh',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };

  public dropdownSettings2 = {
    singleSelection: false,
    idField: 'PersonId',
    textField: 'FristNameTh',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true
  };

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
    private personsService: PersonsService,
    private contactGroupService: ContactGroupService,
    private formBuilder: FormBuilder,
  ) { 
    this.shareForm = this.setGroup(null)
  }

  async ngOnInit() {
    this.shareForm = this.data ? this.setGroup(this.data) : this.setGroup(null)
    this.personList = (await this.personsService.getPersonSearch('').toPromise()).data
    this.contactGroupList = this.groupData((await this.contactGroupService.getallgroupuser().toPromise()).data)
    this.contactGroupList.length > 0 ? this.selectGroup(this.contactGroupList[0].GroupUserId) : null
  }

  changeMode(value) {
    this.typePerson = value
    // value == "1" ? this.shareForm.controls['Group'].setValue([]) : this.shareForm.controls['Person'].setValue([])
  }

  selectGroup(group) {
    let person = this.contactGroupList.find(data => {
      return data.GroupUserId == group
    })
    this.personGroupList = person.Person
  }

  public groupData(data) {
    let groups = data.reduce(function (obj, item) {
      obj[item.GroupUserId] = obj[item.GroupUserId] || [];
      obj[item.GroupUserId].push(item);
      return obj;
    }, {});
    return Object.keys(groups).map(function (key) {
      return { GroupUserId: key, Person: groups[key] };
    });
  }

  public submit() {
    if (validForm(this.shareForm).length > 0) {
      this.alertValid = true;
      return;
    }
    this.onSubmit.emit(this.shareForm.value)
    return this.modalService.dismissAll()
  }

  public closeModal() {
    this.modalService.dismissAll()
  }

  public setGroup(data) {
    return data ? this.formBuilder.group({
      ContactGroupId: [data.ContactGroupId],
      Person: [data.Person],
      Group: [data.Group],
      StartDate: [data.StartDate, [Validators.required]],
      EndDate: [data.EndDate, [Validators.required]],
    }) : this.formBuilder.group({
      Person: [[]],
      Group: [[]],
      StartDate: [null, [Validators.required]],
      EndDate: [null, [Validators.required]],
    })
  }
}
