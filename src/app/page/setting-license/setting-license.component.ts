import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionsService } from '../../shared/services/permission.service';

import { mapPersons, createdNamePersons } from '../../shared/library/mapList';

import { alertEvent, alertDeleteEvent } from '../../shared/library/alert';
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-setting-license',
  templateUrl: './setting-license.component.html',
  styleUrls: ['./setting-license.component.css']
})
export class SettingLicenseComponent implements OnInit {

  public roleList: any = [];
  public headers: any = ['ชื่อสิทธิ์การใช้งาน', 'เครื่องมือ'];
  public getperman: any = [];
  public inputSearch = '';
  public page: number;
  public canAddLicense = false;
  public canEditLicense = false;
  public canDeleteLicense = false;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private permissionService: PermissionsService,
    private usersService: UsersService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });

    this.canAddLicense = this.usersService.canAddLicense();
    this.canEditLicense = this.usersService.canEditLicense();
    this.canDeleteLicense = this.usersService.canDeleteLicense();
    this.spinner.hide()
  }

  public openModal(content, size) {
    this.modalService.open(content, { size: 'lg', windowClass: "myCustomModalClass" });
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

    let perid;
    var CreateBy = 1;
    const resultPermission = (await this.permissionService.insertpermission({
      PermissionName: permission.PermissionName,
      IsActive: 1,
      CreateBy: CreateBy
    }).toPromise()).data[0];

    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });
    this.roleList.find(function (item) {
      if (item.PermissionName == permission.PermissionName) {
        perid = item.PermissionId
      }
    })

    role.forEach(async element => {
      await this.permissionService.insertpermissionmanage({
        PView: element.View ? 1 : 0,
        PAdd: element.Add ? 1 : 0,
        PEdit: element.Edit ? 1 : 0,
        PDelete: element.Delete ? 1 : 0,
        Import: element.Import ? 1 : 0,
        Export: element.Export ? 1 : 0,
        CreateBy: CreateBy,
        isActive: 1,
        PermissionId: perid,
        MenuId: element.MenuId,

      }).toPromise()
    });

    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });
    alertEvent('บันทึกข้อมูลสำเร็จ', 'success');


  }


  public async updateLicense(value) {
    const role = value.role;
    const data = value.license;
    const permission = value.permission;
    var CreateBy = 1;
    const resultPermission = (await this.permissionService.updatepermission({
      PermissionName: permission.PermissionName,
      PermissionId: permission.PermissionId,
      IsActive: 1,
      CreateBy: CreateBy
    }).toPromise()).data[0];

    var CreateBy = 1;
    this.getperman = (await this.permissionService.getpermissionmanage(permission.PermissionId).toPromise()).data
    console.log('getpermanxx', this.getperman);
    let i = 0;
    this.getperman.forEach(item => {
      if (item.PermissionId == permission.PermissionId) {
        let element = role[i];
        i++;
        this.permissionService.updatepermissionmanage({
          PView: element.View ? 1 : 0,
          PAdd: element.Add ? 1 : 0,
          PEdit: element.Edit ? 1 : 0,
          PDelete: element.Delete ? 1 : 0,
          Import: element.Import ? 1 : 0,
          Export: element.Export ? 1 : 0,
          CreateBy: CreateBy,
          isActive: 1,
          PermissionId: permission.PermissionId,
          MenuId: element.MenuId,
          PermissionManageId: item.PermissionManageId
        }).toPromise().then(
          res => {
            
           }
          , err => { }
        );
      }
    });
    this.roleList = (await this.permissionService.getallpermission().toPromise()).data || [];
    this.roleList.map(async element => {
      element.Persons = await this.mapRole(element.PermissionId);
    });
  }

}

