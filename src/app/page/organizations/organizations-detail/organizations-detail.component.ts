import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-organizations-detail',
  templateUrl: './organizations-detail.component.html',
  styleUrls: ['./organizations-detail.component.css']
})
export class OrganizationsDetailComponent implements OnInit {

  public organizationId = ""

  public organizationDetail: any;

  public profile: any;
  public contact: any;
  public address: any;

  public stepList: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService
  ) {
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.stepList = this.setMenubar();
  }

  async ngOnInit() {
    this.organizationDetail = (await this.organizationService.getCorporation(this.organizationId).toPromise()).data[0]
    this.profile = this.organizationDetail ? await this.setProfile(this.organizationDetail) : null
    this.contact = this.organizationDetail ? await this.setContact() : null
    this.address = this.organizationDetail ? await this.setAddress(this.organizationDetail) : null
  }

  private setMenubar() {
    return [
      { icon: "", stepName: "ข้อมูลองค์กร", path: "/organizations/detail/" + this.organizationId },
      { icon: "", stepName: "บุคคลที่เกี่ยวข้อง", path: "/organizations/related-person/" + this.organizationId },
      { icon: "", stepName: "ประวัติการรับทุน", path: "/organizations/bursary/" + this.organizationId },
    ]
  }

  public scroll(el) {
    const elementList = document.querySelectorAll('.scroll-' + el);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }


  private setProfile(data) {
    return {
      CorporationId: this.organizationId ? this.organizationId : "",
      CorporationName: data.CorporationName ? data.CorporationName : "",
      Detail: data.Detail ? data.Detail : "",
      Parent: data.Parent ? data.Parent : "",
      File: data.File ? data.File : "",
      TaxNo: data.TaxNo ? data.TaxNo : "",
    }
  }

  private async setContact() {
    let contactList = (await this.organizationService.getcorporationcontact(this.organizationId).toPromise()).data
    let model = {
      CorporationName: "",
      ContactNumber: [],
      ContactFax: [],
      ContactEmail: [],
      ContactWeb: [],
      ContactLine: [],
      ContactFacebook: [],
    }
    if(contactList) {
      for (let index = 0; index < contactList.length; index++) {
        if (contactList[index].TypeContactId == 1) model.ContactEmail.push(contactList[index].Contact)
        else if (contactList[index].TypeContactId == 2) model.ContactNumber.push(contactList[index].Contact)
        else if (contactList[index].TypeContactId == 3) model.ContactFax.push(contactList[index].Contact)
        else if (contactList[index].TypeContactId == 4) model.ContactWeb.push(contactList[index].Contact)
        else if (contactList[index].TypeContactId == 4) model.ContactLine.push(contactList[index].Contact)
        else if (contactList[index].TypeContactId == 4) model.ContactFacebook.push(contactList[index].Contact)
      }
    }
    return model
  }

  private async setAddress(data) {
    return {
      AdressId: data.AdressId ? data.AdressId : "",
      AddressType: data.AddressType ? data.AddressType : "",
      Subdistrict: data.Subdistrict ? data.Subdistrict : "",
      District: data.District ? data.District : "",
      Province: data.Province ? data.Province : "",
      Zipcode: data.Zipcode ? data.Zipcode : "",
      HouseNo: data.HouseNo ? data.HouseNo : "",
      Building: data.Building ? data.Building : "",
      Floor: data.Floor ? data.Floor : "",
      Room: data.Room ? data.Room : "",
      Road: data.Road ? data.Road : "",
      Soi: data.Soi ? data.Soi : "",
    }
  }
}

