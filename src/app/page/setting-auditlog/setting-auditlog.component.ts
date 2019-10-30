import { Component, OnInit } from '@angular/core';

import { AuthlogService } from '../../shared/services/authlog.service';
import { PersonsService } from '../../shared/services/persons.service';
import { NgxSpinnerService } from "ngx-spinner";
import { mapPersons, createdNamePersons } from '../../shared/library/mapList';
@Component({
  selector: 'app-setting-auditlog',
  templateUrl: './setting-auditlog.component.html',
  styleUrls: ['./setting-auditlog.component.css']
})
export class SettingAuditlogComponent implements OnInit {

  public personName = ""
  public searchData = ""
  public page: Number;
  public startDate = null
  public endDate = null

  public authloglist: any = [];
  public personList: any = [];

  public editlogBoardlist: any = [];
  public editlogBoardPersonallist: any = [];
  public editlogContactGrouplist: any = [];
  public editlogCoordinatorlist: any = [];
  public editlogCoordinatorContactlist: any = [];
  public editlogCorporationAddresslist: any = [];
  public editlogFamilylist: any = [];
  public editlogGroupUserlist: any = [];
  public editlogManageGrouplist: any = [];
  public editlogMemberContactGrouplist: any = [];
  public editlogPersonlist: any = [];
  public editlogPersonAddresslist: any = [];
  public editlogProjectlist: any = [];
  public editlogPurchaselist: any = [];
  public editlogWorklist: any = [];

  public headers: any = ['วันเวลาที่แก้ไข', 'เมนู', 'ส่วนที่แก้ไข', 'ข้อมูลเดิม', 'แก้ไขเป็น', 'ผู้แก้ไข'];

  constructor(
    private spinner: NgxSpinnerService,
    private authlogService: AuthlogService,
    private personsService: PersonsService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    this.personList = (await this.personsService.getperson().toPromise()).data
    this.authloglist = (await this.authlogService.getauditlog().toPromise()).data
    this.spinner.hide()
  }

  public createdUser(cretedBy) {
    return createdNamePersons(this.personList, cretedBy)
  }

  public async onSearchData() {
    this.spinner.show();
    this.authloglist = (await this.authlogService.getauditlog().toPromise()).data
    if (this.searchData != '') {
      let result = this.authloglist.filter(loging => {
        return (String(loging.UpdateDate).toLocaleLowerCase()).includes(this.searchData.toLocaleLowerCase()) ||
          (String(loging.UpdateMenu).toLocaleLowerCase()).includes(this.searchData.toLocaleLowerCase()) ||
          (String(loging.DataOriginal).toLocaleLowerCase()).includes(this.searchData.toLocaleLowerCase()) ||
          (String(loging.UpdateData).toLocaleLowerCase()).includes(this.searchData.toLocaleLowerCase()) ||
          (String(loging.UpdateField).toLocaleLowerCase()).includes(this.searchData.toLocaleLowerCase())
      })
      this.authloglist = result
      this.spinner.hide()
    }
    this.spinner.hide()
  }

  // private async getAllEditlog() {
  //   this.editlogBoardlist = (await this.authlogService.getEditlogBoardAll().toPromise()).data
  //   this.editlogBoardPersonallist = (await this.authlogService.getEditlogBoardPersonalAll().toPromise()).data
  //   this.editlogContactGrouplist = (await this.authlogService.getEditlogContactGroupAll().toPromise()).data
  //   this.editlogCoordinatorlist = (await this.authlogService.getEditlogCoordinatorAll().toPromise()).data
  //   this.editlogCoordinatorContactlist = (await this.authlogService.getEditlogCoordinatorContactlogAll().toPromise()).data
  //   this.editlogCorporationAddresslist = (await this.authlogService.getEditlogCorporationAddressAll().toPromise()).data
  //   this.editlogFamilylist = (await this.authlogService.getEditlogFamilyAll().toPromise()).data
  //   this.editlogGroupUserlist = (await this.authlogService.getEditlogGroupUserAll().toPromise()).data
  //   this.editlogManageGrouplist = (await this.authlogService.getEditlogmanagegroupAll().toPromise()).data
  //   this.editlogMemberContactGrouplist = (await this.authlogService.getEditlogMemberContactGroupAll().toPromise()).data
  //   this.editlogPersonlist = (await this.authlogService.getEditlogPersonAll().toPromise()).data
  //   this.editlogPersonAddresslist = (await this.authlogService.getEditlogPersonAddressAll().toPromise()).data
  //   this.editlogProjectlist = (await this.authlogService.getEditlogprojectAll().toPromise()).data
  //   this.editlogPurchaselist = (await this.authlogService.getEditlogPurchaseAll().toPromise()).data
  //   this.editlogWorklist = (await this.authlogService.getEditlogWorkAll().toPromise()).data
  // }

  // private async formathData() {
  //   let listLog = []
  //   Array.prototype.push.apply(listLog, this.editlogBoardlist)
  //   Array.prototype.push.apply(listLog, this.editlogBoardPersonallist)
  //   Array.prototype.push.apply(listLog, this.editlogContactGrouplist)
  //   Array.prototype.push.apply(listLog, this.editlogCoordinatorlist)
  //   Array.prototype.push.apply(listLog, this.editlogCoordinatorContactlist)
  //   Array.prototype.push.apply(listLog, this.editlogCorporationAddresslist)
  //   Array.prototype.push.apply(listLog, this.editlogFamilylist)
  //   Array.prototype.push.apply(listLog, this.editlogGroupUserlist)
  //   Array.prototype.push.apply(listLog, this.editlogManageGrouplist)
  //   Array.prototype.push.apply(listLog, this.editlogMemberContactGrouplist)
  //   Array.prototype.push.apply(listLog, this.editlogPersonlist)
  //   Array.prototype.push.apply(listLog, this.editlogPersonAddresslist)
  //   Array.prototype.push.apply(listLog, this.editlogProjectlist)
  //   Array.prototype.push.apply(listLog, this.editlogPurchaselist)
  //   Array.prototype.push.apply(listLog, this.editlogWorklist)
  //   return listLog;
  // }

}
