import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProgramService } from '../../../shared/services/program.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrls: ['./program-detail.component.css']
})
export class ProgramDetailComponent implements OnInit {

  public programId = null;
  public purchaseId = null;

  public program: any = [];

  public programDetailForm: any = {};
  public programContactForm: any = {};
  public projectPersonContact: any = {};
  public programContactManagerForm: any = {};
  public programAddress: any = {};
  public corpatationList: any = [];

  public purchaseProjectManagercontact: any = {};
  public purchaseProjectManageraddress: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private programService: ProgramService,
    private organizationService: OrganizationService
  ) {
    const type = this.activatedRoute.snapshot.paramMap.get('typeProgamer');
    type == 'project' ? this.programId = this.activatedRoute.snapshot.paramMap.get('id') : this.purchaseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.programAddress = {
      CorporationName: '',
      ContactNumber: [],
      ContactFax: [],
      ContactEmail: [],
      ContactWeb: [],
      ContactLine: [],
      ContactFacebook: [],
    };
  }

  async ngOnInit() {
    this.corpatationList = (await this.organizationService.getCorporationAll().toPromise()).data;
    const resultProgram = this.programId ? (await this.programService.getDetailProject(this.programId).toPromise()).data : {};
    const resultPurchase = this.purchaseId ? (await this.programService.getDetailPurchase(this.purchaseId).toPromise()).data : {};

    const check = this.programId ? this.programId : this.purchaseId;
    this.purchaseProjectManagercontact = (await this.programService.getdetailPurchaseProjectManagercontact(check).toPromise()).data[0];
    this.purchaseProjectManageraddress = (await this.programService.getdetailPurchaseProjectManageraddress(check).toPromise()).data[0];
    this.programDetailForm = this.programId ? resultProgram ? resultProgram[0] : {} : this.purchaseId ? resultPurchase ? resultPurchase[0] : {} : {};


    this.programContactForm = await this.setContact();
    this.programAddress = await this.setAddress();
    this.projectPersonContact = await this.projectPersonContact(check);
    this.programContactManagerForm = await this.setContactManager(this.program);

  }

  private async setAddress() {
    const addressList = this.programId ? (await this.programService.getprojectcorporationaddress(this.programId).toPromise()).data : (await this.programService.getpurchasecorporationaddress(this.purchaseId).toPromise()).data;
    const model = {
      Address: [],
      AddressContact: []
    };

    if (addressList) {
      for (let index = 0; index < addressList.length; index++) {
        if (addressList[index].TypeAddress == 1) { model.Address.push(this.showAddress(addressList[index])); }
        else if (addressList[index].TypeAddress == 4) { model.AddressContact.push(this.showAddress(addressList[index])); }
      }
    }

    return model;
  }

  public getYear(year) {
    const date = year ? new Date(year) : null;
    return date ? date.getFullYear() : '-';
  }

  private async setContact() {
    const contactList = this.programId ? (await this.programService.getprojectcorporationcontact(this.programId).toPromise()).data : (await this.programService.getpurchasecorporationcontact(this.purchaseId).toPromise()).data;
    const model = {
      CorporationName: contactList ? contactList[0].CorporationName : '',
      ContactNumber: [],
      ContactFax: [],
      ContactEmail: [],
      ContactWeb: [],
      ContactLine: [],
      ContactFacebook: [],
    };
    if (contactList) {
      for (let index = 0; index < contactList.length; index++) {
        if (contactList[index].TypeContactId == 1) { model.ContactEmail.push(contactList[index].Contact); }
        else if (contactList[index].TypeContactId == 2) { model.ContactNumber.push(contactList[index].Contact); }
        else if (contactList[index].TypeContactId == 3) { model.ContactFax.push(contactList[index].Contact); }
        else if (contactList[index].TypeContactId == 4) { model.ContactWeb.push(contactList[index].Contact); }
        else if (contactList[index].TypeContactId == 5) { model.ContactLine.push(contactList[index].Contact); }
        else if (contactList[index].TypeContactId == 6) { model.ContactFacebook.push(contactList[index].Contact); }
      }
    }
    return model;
  }

   private async showprojectPersonContact(data) {
    const projectPersonContact = (await this.programService.getprojectpersoncontact(data).toPromise()).data;
    return {};
  }

  private setContactManager(data) {
    return {

    };
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
    const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
    return Building + Floor + Room + HouseNumber + Road + Soi + Province + District + Subdistrict + Zipcode;
  }

}
