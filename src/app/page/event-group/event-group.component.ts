import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import * as cloneDeep from 'lodash/cloneDeep';

import { ContactGroupService } from '../../shared/services/contact-group.service';
import { PersonsService } from '../../shared/services/persons.service';
import { ExcelService } from '../../shared/services/excel.service';
import { AuthlogService } from '../../shared/services/authlog.service';

import { mapPersons, createdNamePersons } from '../../shared/library/mapList';
import { alertEvent, alertDeleteEvent } from '../../shared/library/alert';
import { UsersService } from '../../shared/services/users.service';
import { FontService } from './font';

@Component({
  selector: 'app-event-group',
  templateUrl: './event-group.component.html',
  styleUrls: ['./event-group.component.css']
})
export class EventGroupComponent implements OnInit {

  public inputSearch = ''
  ipAddress: any;
  public eventGroupList: any = [];
  public eventGroupOrigin: any;

  public personList: any[] = [];
  public User : any;
  public  email: any;
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
    private usersService: UsersService,
    private http: HttpClient,
    private font: FontService
  ) {
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data
      });
  }

  async ngOnInit() {
    this.spinner.show()
    this.personList = this.mapPersons((await this.personsService.getallperson().toPromise()).data)
    this.eventGroupList = this.groupData((await this.contactGroupService.getContactGroupAll().toPromise()).data)
    this.User = this.usersService.getUserInfo();
    this.email = this.User.email;
    await this.eventGroupList.map(async element => {
      element.Person = await this.mapPersons(element.Person);
    });
 
  
    this.canAddGroup = this.usersService.canAddGroup();
    this.canEditGroup = this.usersService.canEditGroup();
    this.canDeleteGroup = this.usersService.canDeleteGroup();
    this.canExportGroup = this.usersService.canExportGroup();
    this.spinner.hide();

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
    this.eventGroupOrigin.GroupName != group.GroupName ? await this.auditLogService("ชื่อกลุ่ม", this.eventGroupOrigin.GroupName, group.GroupName, this.ipAddress) : null
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

  async auditLogService(field, origin, update, ipAddress) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: "กลุ่มการจัดส่งเอกสาร",
      UpdateField: field,
      DataOriginal: origin,
      UpdateData: update,
      IpAddress: ipAddress.ip
    }).toPromise()
  }

  public check (data){
    console.log('ssss',data);
    return true;
  }

  public showAddress(value) {
    if (!value) return;
    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const Room = value.Room ? 'ห้อง ' + value.Room + ' ' : '';
    const HouseNumber = value.HouseNumber ? 'เลขที่ ' + value.HouseNumber + ' ' : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Province = value.Province != '' ? 'จังหวัด ' + value.Province + ' ' : '';

    if (value.Province == 'กรุงเทพมหานคร') {
      const Subdistrict = value.Subdistrict != '' ? 'แขวง ' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'เขต ' + value.District + ' ' : '';
      const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
      return Building + Floor + Room + HouseNumber + Road + Soi + Subdistrict + District + Province + Zipcode;
    } else {
      const Subdistrict = value.Subdistrict != '' ? 'ตำบล ' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'อำเภอ ' + value.District + ' ' : '';
      const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
      return Building + Floor + Room + HouseNumber + Road + Soi + Subdistrict + District + Province + Zipcode;
    }
  }

  public createdUser(cretedBy) {
    return createdNamePersons(this.personList, cretedBy)
  }

  public findPersonDetail(id) {
    let result = this.personList.find(d => d.perPersonId == id);
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
      return { ContactGroupId: key, Person: groups[key] };
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


  genPDF(exportGroup: any[]) {
    var doc = new jsPDF({
      orientation: 'landscape',
      // filters: ['ASCIIHexEncode'],
      // unit: 'in',
      // format: [4, 2]
    });
    let x = 10, y = 10, w = 130, h = 60;
    // doc.addFont('SukhumvitSet-Text.ttf', 'SukhumvitSet-Text', 'normal');
    let Sarabun = this.font.getFont();
    doc.addFileToVFS("Sarabun-Regular.ttf", Sarabun);
    doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
    doc.setFont('Sarabun'); // set font
    doc.setFontType('normal');
    doc.setFontSize(12);

    let pageCount = 0;
    exportGroup.forEach(e => {
      pageCount++;
      // Box 1
      doc.rect(x, y, w, h);
      const x1 = 15;
      let tite = e.TitleNameTh == 1 ? 'นาย' : e.TitleNameTh == 2 ? 'นางสาว' : 'นาง';
      doc.text('ถึง : ' + tite + " " + e.FristNameTh + " " + e.LastNameTh, x1, 20);
      doc.text('เบอร์โทร์ : ' + e.Contact, x1, 30);

      let value = e;
      const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
      const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
      const Room = value.Room ? 'ห้อง ' + value.Room + ' ' : '';
      const HouseNumber = value.HouseNumber ? 'เลขที่ ' + value.HouseNumber + ' ' : '';
      const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
      const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
      const Province = value.Province != '' ? 'จังหวัด ' + value.Province + ' ' : '';
      const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
      let Subdistrict = '';
      let District = '';

      if (value.Province == 'กรุงเทพมหานคร') {
        Subdistrict = value.Subdistrict != '' ? 'แขวง ' + value.Subdistrict + ' ' : '';
        District = value.District != '' ? 'เขต ' + value.District + ' ' : '';
      } else {
        Subdistrict = value.Subdistrict != '' ? 'ตำบล ' + value.Subdistrict + ' ' : '';
        District = value.District != '' ? 'อำเภอ ' + value.District + ' ' : '';
      }

      doc.text('ที่อยู่ :  ' + Building + Floor + Room + HouseNumber + Road + Soi, x1, 40);
      doc.text('           ' + Subdistrict + District, x1, 50);
      doc.text('           ' + Province + Zipcode, x1, 60);

      //Box 2
      const x2 = x + w + (15 * 1.5);
      doc.rect((x + w + 15), y, w, h);
      doc.text('ถึง : ..........................................................................................................', x2, 20);
      doc.text('เบอร์โทร์ : .................................................................................................', x2, 30);
      doc.text('ที่อยู่ : .......................................................................................................', x2, 40);
      doc.text('         .........................................................................................................', x2, 50);
      doc.text('         .........................................................................................................', x2, 60);
      if (pageCount <= exportGroup.length - 1) doc.addPage();
    });

    doc.save('group-user.pdf');
  }

  public exportPDF(value) {
    this.contactGroupService
      .getContactGroupById(value.ContactGroupId)
      .toPromise().then(res => {
        if (res.successful) {
          this.genPDF(res.data);
        } else {
          console.error(res.message);
        }
      }, err => { alert(err); });
  }

  public async insertGroup(value) {

    let resultGroup = (await this.contactGroupService.insertcontactgroup({ GroupName: value.GroupName }).toPromise()).data[0]

    value.Person.forEach(async element => {
      let model = {
        PersonId: element.PersonId,
        ContactGroupId: resultGroup.ContactGroupId
      }
      await this.contactGroupService.insertcotactgroupperson(model).toPromise()
    });
    alertEvent("บันทึกข้อมูลสำเร็จ", "success");

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

  canEdit(checkNext = null) {
    /*var ret = this.usersService.canEdit();
    if (ret){
      if (checkNext !== null)
        return checkNext
    }
    return ret;*/
    return checkNext;
  }
}
