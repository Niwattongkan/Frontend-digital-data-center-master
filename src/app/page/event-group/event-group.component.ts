import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from "ngx-spinner";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as cloneDeep from 'lodash/cloneDeep';

import {ContactGroupService} from '../../shared/services/contact-group.service';
import {PersonsService} from '../../shared/services/persons.service';
import {ExcelService} from '../../shared/services/excel.service';
import {AuthlogService} from '../../shared/services/authlog.service';

import {mapPersons, createdNamePersons} from '../../shared/library/mapList';
import {alertEvent, alertDeleteEvent} from '../../shared/library/alert';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {

  public inputSearch = ''

  public eventGroupList: any = [];
  public eventGroupOrigin: any;

  public personList: any = [];

  public headers: any = ['วันที่จัดกลุ่ม', 'ชื่อกลุ่ม', 'สมาชิกกลุ่ม', 'ผู้สร้าง', 'ส่งออกไฟล์', 'เครื่องมือ'];
  public page: number;
  public canAddGroup = false;
  public canEditGroup = false;
  public canDeleteGroup = false;
  public canExportGroup = false;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private contactGroupService: ContactGroupService,
    private personsService: PersonsService,
    private excelService: ExcelService,
    private authlogService: AuthlogService,
    private usersService: UsersService
  ) {
  }

  async ngOnInit() {
    this.spinner.show()
    this.personList = this.mapPersons((await this.personsService.getallperson().toPromise()).data)
    this.eventGroupList = this.groupData((await this.contactGroupService.getContactGroupAll().toPromise()).data)
    await this.eventGroupList.map(async element => {
      element.Person = await this.mapPersons(element.Person);
    });
    this.canAddGroup = this.usersService.canAddGroup();
    this.canEditGroup = this.usersService.canEditGroup();
    this.canDeleteGroup = this.usersService.canDeleteGroup();
    this.canExportGroup = this.usersService.canExportGroup();
    this.spinner.hide()
  }

  mapPersons(personList) {
    personList.map(data => {
      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
      let first = data.FristNameTh
      let last = data.LastNameTh
      data.FullnameTh = first && last ? title + first + ' ' + last : ''
      let titleEn = data.TitleNameEn == 1 ? 'Mr.' : data.TitleNameEn == 2 ? 'Mrs.' : 'Miss.'
      let firstEn = data.FristNameEn
      let lastEn = data.LastNameEn
      data.FullnameEn = firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : ''
      // data.AddressPerson = this.showAddress(data)
    });
    return personList
  }

  async updateLog(group) {
    this.eventGroupOrigin.GroupName != group.GroupName ? await this.auditLogService("ชื่อกลุ่ม", this.eventGroupOrigin.GroupName, group.GroupName) : null
  }

  async onSearchData() {
    this.spinner.show()
    if (this.inputSearch != '') {
      this.eventGroupList = this.groupData((await this.contactGroupService.getContactGroupAll().toPromise()).data)

      let seachData = this.eventGroupList.filter(text => {
        return ((String(text.Person[0].GroupName)).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase())
      });
      this.eventGroupList = seachData.length > 0 ? seachData : []
      this.spinner.hide()
    } else {
      this.eventGroupList = this.groupData((await this.contactGroupService.getContactGroupAll().toPromise()).data)
      this.spinner.hide()
    }
    this.spinner.hide()
    return this.page = 1
  }

  async auditLogService(field, origin, update) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: "กลุ่มการจัดส่งเอกสาร",
      UpdateField: field,
      DataOriginal: origin,
      UpdateData: update,
    }).toPromise()
  }

  showAddress(value) {
    let Building = value.Building ? "อาคาร " + value.Building + " " : ""
    let Floor = value.Floor ? "ชั้น " + value.Floor + " " : ""
    let HouseNo = value.HouseNo ? "เลขที่ " + value.HouseNo + " " : ""
    let Road = value.Road ? "ถนน " + value.Road + " " : ""
    let Soi = value.Soi ? "ซอย " + value.Soi + " " : ""
    let Subdistrict = value.Subdistrict ? "ตำบล/แขวง " + value.Subdistrict + " " : ""
    let District = value.District ? "อำเภอ/เขต " + value.District + " " : ""
    return Building + Floor + HouseNo + Road + Soi + Subdistrict + District
  }

  public createdUser(cretedBy) {
    return createdNamePersons(this.personList, cretedBy)
  }

  public findPersonDetail(id) {
    let result = this.personList.find(person => {
      return person.PersonId == id;
    });
    return result ? result.FullnameTh : '-'
  }

  public openModal(content) {
    this.modalService.open(content);
  }

  public groupData(data) {
    let groups = data.reduce(function (obj, item) {
      obj[item.ContactGroupId] = obj[item.ContactGroupId] || [];
      obj[item.ContactGroupId].push(item);
      return obj;
    }, {});
    return Object.keys(groups).map(function (key) {
      return {ContactGroupId: key, Person: groups[key]};
    });
  }

  public copyData(value) {
    return cloneDeep(value);
  }

  public exportExcel(value) {
    let exportGroup = []
    value.Person.forEach(element => {
      element.ContactGroupId = value.ContactGroupId
      exportGroup.push(element)
    });
    return this.excelService.exportAsExcelFile(exportGroup, 'group-user');
  }

  public exportPDF(value) {
    let exportGroup = []
    value.Person.forEach(element => {
      element.ContactGroupId = value.ContactGroupId
      exportGroup.push({
        'ContactGroupId': value.ContactGroupId,
        'AddressPerson': element.AddressPerson,
        'FullnameTh': element.FullnameTh,
        'CreateBy': element.CreateBy,
        'CreateDate': element.CreateDate,
        'UpdateDate': element.UpdateDate,
      })
    });

    var doc = new jsPDF('p', 'pt');
    doc.autoTable({
      columns: [
        {header: 'ContactGroupId', dataKey: 'ContactGroupId'},
        {header: 'AddressPerson', dataKey: 'AddressPerson'},
        {header: 'FullnameTh', dataKey: 'FullnameTh'},
        {header: 'CreateBy', dataKey: 'CreateBy'},
        {header: 'CreateDate', dataKey: 'CreateDate'},
        {header: 'UpdateBy', dataKey: 'UpdateBy'},
      ],
      body: exportGroup
    });
    doc.save('group-user.pdf');
  }

  public async insertGroup(value) {

    let resultGroup = (await this.contactGroupService.insertcontactgroup({GroupName: value.GroupName}).toPromise()).data[0]

    value.Person.forEach(async element => {
      let model = {
        PersonId: element.PersonId,
        ContactGroupId: resultGroup.ContactGroupId
      }
      await this.contactGroupService.insertcotactgroupperson(model).toPromise()
    });
    this.eventGroupList = this.groupData(await mapPersons((await this.contactGroupService.getContactGroupAll().toPromise()).data))
  }

  public async updateGroup(value) {
    let resultGroup = (await this.contactGroupService.updatecontactgroup({
      ContactGroupId: value.ContactGroupId,
      GroupName: value.GroupName,
    }).toPromise()).data[0]
    await this.updateLog(value)
    await this.contactGroupService.deletemembercontactgroupperson(value.ContactGroupId).toPromise()
    value.Person.forEach(async element => {
      let model = {
        PersonId: element.PersonId,
        ContactGroupId: value.ContactGroupId
      }
      console.log(model)
      await this.contactGroupService.insertcotactgroupperson(model).toPromise()
    });
    this.eventGroupList = this.groupData(await mapPersons((await this.contactGroupService.getContactGroupAll().toPromise()).data))
  }

  public async shareGroup(value) {
    value.Person.forEach(async element => {
      let model = {
        PersonId: element.PersonId,
        ContactGroupId: value.ContactGroupId,
        StartDate: this.setDate(value.StartDate.date),
        EndDate: this.setDate(value.EndDate.date),
      }
      await this.contactGroupService.insertsharecontactgroupperson(model).toPromise()
    })
    value.Group.forEach(async element => {
      let model = {
        GroupNo: element.GroupUserId,
        StartDate: this.setDate(value.StartDate.date),
        EndDate: this.setDate(value.EndDate.date),
      }
      await this.contactGroupService.insertsharecontactgroup(model).toPromise()
    })
    this.eventGroupList = this.groupData(await mapPersons((await this.contactGroupService.getContactGroupAll().toPromise()).data))
  }

  public delete(id) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        await this.contactGroupService.deletecontactgroup(id).toPromise()
        this.eventGroupList = this.groupData(await mapPersons((await this.contactGroupService.getContactGroupAll().toPromise()).data))
        return alertEvent("ลบข้อมูลสำเร็จ", "success")
      }
    })
  }

  private setDate(date) {
    let year = date.year
    let month = ("000" + date.month)
    let day = ("000" + date.day)
    return year + "-" + month.substr(month.length - 2, month.length) + "-" + day.substr(day.length - 2, day.length)
  }

  canEdit(checkNext = null){
    var ret = this.usersService.canEdit();
    if (ret){
      if (checkNext !== null)
        return checkNext;
    }
    return ret;
  }
}
