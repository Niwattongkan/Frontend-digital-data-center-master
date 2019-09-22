import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BoardService } from '../../../shared/services/board.service';
import { PersonsService } from '../../../shared/services/persons.service';
import { PermissionsService } from '../../../shared/services/permission.service';

import { mapPersons, createdNamePersons } from '../../../shared/library/mapList';

import { validForm } from '../../../shared/library/form';

@Component({
  selector: 'setting-license-modal',
  templateUrl: './license-modal.component.html',
  styleUrls: ['./license-modal.component.css']
})
export class LicenseModalComponent implements OnInit {

  public title = ""

  public rolelist: any = [];
  public personList: any = [];
  public roleSublist: any = [];

  public licenseForm: FormGroup;
  public permissionForm: FormGroup;

  public alertValid = false

  public dropdownSettings = {
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
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    private personsService: PersonsService,
    private permissionService: PermissionsService
  ) {
    this.licenseForm = this.setlicense(null)
    this.permissionForm = this.setPermission(null)
  }

  async ngOnInit() {
    this.title = this.data ? "แก้ไขสิทธิ์การใช้งาน" : "สร้างสิทธิ์การใช้งาน"
    this.rolelist = this.setRole((await this.boardService.getmenu().toPromise()).data)
    this.personList = (await this.personsService.getallperson().toPromise()).data

    this.licenseForm = this.data ? this.setlicense(this.data) : this.setlicense(null)

    this.permissionForm = this.setPermission(this.data)
    this.selectSubMenu(this.licenseForm.controls['MenuId'].value)

    this.licenseForm.get('MenuId').valueChanges.subscribe(value => this.selectSubMenu(value));
  }

  async mapRole(id) {
    let person = mapPersons((await this.permissionService.getgrouppermissionperson(id).toPromise()).data)
    return person.length > 0 ? person : []
  }

  submit() {
    // if (validForm(this.licenseForm).length > 0) {
    //   this.alertValid = true;
    //   return;
    // }
    this.onSubmit.emit({
      license: this.licenseForm.value,
      permission: this.permissionForm.value,
      role: this.rolelist
    })
    return this.modalService.dismissAll()
  }

  closeModal() {
    this.modalService.dismissAll()
  }

  selectAll(index, value) {
    console.log(index + ' ' + value)
    value = value ? true : false
    // if (value) {
    //   this.rolelist[index] = {
    //     MenuId: this.rolelist[index].MenuId,
    //     MenuName: this.rolelist[index].MenuName,
    //     All: true,
    //     View: true,
    //     Add: true,
    //     Edit: true,
    //     Delete: true,
    //     Import: true,
    //     Export: true,
    //   }
    // } else {
    //   this.rolelist[index] = {
    //     MenuId: this.rolelist[index].MenuId,
    //     MenuName: this.rolelist[index].MenuName,
    //     All: false,
    //     View: false,
    //     Add: false,
    //     Edit: false,
    //     Delete: false,
    //     Import: false,
    //     Export: false,
    //   }
    // }
  }

  async selectSubMenu(id) {
    this.roleSublist = (await this.boardService.getmenudetail(id).toPromise()).data || []
  }

  public setRole(list) {
    let temp = []
    list.forEach(data => {
      temp.push({
        MenuId: data.MenuId,
        MenuName: data.MenuName,
        All: false,
        View: false,
        Add: false,
        Edit: false,
        Delete: false,
        Import: false,
        Export: false,
      })
    })
    return temp;
  }

  public setPermission(data) {
    return data ? this.formBuilder.group({
      GroupPermissionId: [data.GroupPermissionId],
      PermissionId: [data.PermissionId],
      PermissionName: [data.PermissionName, [Validators.required]],
      Persons: [data.Persons, [Validators.required]],
    }) : this.formBuilder.group({
      PermissionName: ["", [Validators.required]],
      Persons: [[], [Validators.required]],
    })
  }

  public setlicense(data) {
    return data ? this.formBuilder.group({
      MenuId: [data.MenuId, [Validators.required]],
      MenuDetailId: [data.MenuDetailId, [Validators.required]],
      All: [false],
      View: [data.View == 1 ? true : false],
      Add: [data.Add == 1 ? true : false],
      Edit: [data.Edit == 1 ? true : false],
      Delete: [data.Delete == 1 ? true : false],
      Import: [data.Import == 1 ? true : false],
      Export: [data.Export == 1 ? true : false],
    }) : this.formBuilder.group({
      MenuId: [1, [Validators.required]],
      MenuDetailId: [1, [Validators.required]],
      All: [false],
      View: [false],
      Add: [false],
      Edit: [false],
      Delete: [false],
      Import: [false],
      Export: [false],
    })
  }
}

