import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'card-organization',
  templateUrl: './card-organization.component.html',
  styleUrls: ['./card-organization.component.css']
})
export class CardOrganizationComponent implements OnInit {

  public isCollapsed = true;

  public currentPath = '';

  public headerTable: any = ['รหัสโครงการ', 'ชื่อโครงการ', 'ที่อยู่จัดส่งเอกสาร'];
  public organizationProject: any = [];

  public organizationContact: any = [];

  dataTable: any = [];

  @Input() data: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.currentPath = this.router.url;
    this.data.CorporationId ? this.setContact((await this.organizationService.getcorporationcontact(this.data.CorporationId).toPromise()).data) : null;
    this.organizationProject = this.data.CorporationId ? (await this.organizationService.getCorporation(this.data.CorporationId).toPromise()).data : [];
    this.dataTable = this.data.CorporationId ? this.setTable((await this.organizationService.getCorporationProject(this.data.CorporationId).toPromise()).data) : [];
  }

  setContact(list) {
    for (let index = 0; index < list.length; index++) {
      if (list[index].TypeContactId == '2') { this.organizationContact.push(list[index]); }
    }
  }

  deleteCorporation(data) {
    this.onDelete.emit(data);
  }

  setTable(corperationList) {
    const list = [];
    corperationList.forEach(async element => {
      list.push({
        ProjectNo: element.ProjectNo,
        ProjectName: element.ProjectName,
        Address:  this.showAddress(((await this.organizationService.getcorporationaddress(element.CorporationId).toPromise()).data)[0])
      });
    });
    return list;
  }
  public showAddress(value) {
    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const Room = value.Room ? 'ห้อง ' + value.Room + ' ' : '';
    const HouseNumber = value.HouseNumber ? 'เลขที่ ' + value.HouseNumber + ' ' : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Province = value.Province != '' ? 'จังหวัด ' + value.Province + ' ' : '';
    const Subdistrict = value.Subdistrict != '' ? 'ตำบล/แขวง ' + value.Subdistrict + ' ' : '';
    const District = value.District != '' ? 'อำเภอ/เขต ' + value.District + ' ' : '';
    const Zipcode = value.Zipcode != '' ?  'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
    return Building + Floor + Room + HouseNumber + Road + Soi + Province + District + Subdistrict + Zipcode;
  }
}
