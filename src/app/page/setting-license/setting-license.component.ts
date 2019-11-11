import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionsService } from '../../shared/services/permission.service';

import { mapPersons, createdNamePersons } from '../../shared/library/mapList';

import { alertEvent, alertDeleteEvent } from '../../shared/library/alert';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-setting-license',
  templateUrl: './setting-license.component.html',
  styleUrls: ['./setting-license.component.css']
})
export class SettingLicenseComponent implements OnInit {

  public roleList: any = [];
  public headers: any = ['ชื่อสิทธิ์การใช้งาน', 'ชื่อกลุ่มผู้ใช้งาน ', 'เครื่องมือ'];

  public inputSearch = '';
  public page: number;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private permissionService: PermissionsService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });
    this.spinner.hide()
  }

  public openModal(content, size) {
    this.modalService.open(content, { size: size });
  }

  async mapRole(id) {
    const person = mapPersons((await this.permissionService.getgrouppermissionperson(id).toPromise()).data);
    return person.length > 0 ? person : [];
  }

  async onSearchData() {
    this.spinner.show();
    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });
    if (this.inputSearch != '') {
      const searchData = this.roleList.filter(data => {
        return (String(data.PermissionName).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(data.FristNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(data.LastNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(data.FullnameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase());
      });
      this.roleList = searchData;
      this.spinner.hide()
    }
    this.spinner.hide()
  }
  public delete(id) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        await this.permissionService.deletepermission(id).toPromise();
        this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
        this.roleList.map(async element => {
          element.Persons = await this.mapRole(element.PermissionId);
        });
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  public async insertLicense(value) {
    const role = value.role;
    const data = value.license;
    const permission = value.permission;

    const resultPermission = (await this.permissionService.insertpermission({
      PermissionName: permission.PermissionName
    }).toPromise()).data[0];

    permission.Person.forEach(async data => {
      const groupPermission = (await this.permissionService.insertgrouppermission({
        PermissionId: resultPermission.PermissionId,
        PersonId: data.PersonId
      }).toPromise()).data[0];
      role.forEach(async element => {
        const resultLicense = (await this.permissionService.insertpermissionmanage({
          GroupPermissionId: groupPermission.GroupPermissionId,
          MenuId: element.MenuId,
          MenuName: element.MenuName,
          InsertData: element.InsertData ? 1 : 0,
          EditData: element.EditData ? 1 : 0,
          DeleteData: element.DeleteData ? 1 : 0,
          ExportData: element.ExportData ? 1 : 0,
          ShareData: element.ShareData ? 1 : 0,
          CopyData: element.CopyData ? 1 : 0,
        }).toPromise()).data[0];
      });
    });

    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });
  }


  public async updateLicense(value) {
    const role = value.role;
    const permission = value.permission;

    const resultPermission = (await this.permissionService.updatepermission({
      PermissionId: permission.PermissionId,
      PermissionName: permission.PermissionName
    }).toPromise()).data[0];

    await this.permissionService.deletegrouppermissionperson(permission.GroupPermissionId).toPromise();

    permission.Person.forEach(async data => {
      const groupPermission = (await this.permissionService.insertgrouppermission({
        PermissionId: resultPermission.PermissionId,
        PersonId: data.PersonId
      }).toPromise()).data[0];
      role.forEach(async element => {
        const resultLicense = (await this.permissionService.insertpermissionmanage({
          GroupPermissionId: groupPermission.GroupPermissionId,
          MenuId: element.MenuId,
          MenuName: element.MenuName,
          InsertData: element.InsertData ? 1 : 0,
          EditData: element.EditData ? 1 : 0,
          DeleteData: element.DeleteData ? 1 : 0,
          ExportData: element.ExportData ? 1 : 0,
          ShareData: element.ShareData ? 1 : 0,
          CopyData: element.CopyData ? 1 : 0,
        }).toPromise()).data[0];
      });
    });

    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });
  }
}
