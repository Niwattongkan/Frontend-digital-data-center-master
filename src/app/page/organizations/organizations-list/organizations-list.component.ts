import {Component, OnInit} from "@angular/core";

import {OrganizationService} from "../../../shared/services/organization.service";

import {alertDeleteEvent} from "../../../shared/library/alert";
import Swal from "sweetalert2";
import {NgxSpinnerService} from "ngx-spinner";
import { UsersService } from '../../../shared/services/users.service';


@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.css']
})
export class OrganizationsListComponent implements OnInit {
  public page: Number;
  public organizationList: any = [];
  public inputSearch = "";
  public canAddOrganization= false

  constructor(
    private organizationService: OrganizationService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService
  ) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.organizationList = this.mapCorperation(
      (await this.organizationService.getOrganizationAll().toPromise()).data
    );
    this.spinner.hide();
    this.canAddOrganization = this.usersService.canAddOrganization();
  }

  public mapCorperation(corperationList) {
    corperationList.map(async data => {
      data.CorporationAddress = [];
      const CorporationContact = (await this.organizationService
        .getserchcorporationcontact(data.CorporationId)
        .toPromise()).data;
      const CorporationAddress = (await this.organizationService
        .getserchcorporationaddress(data.CorporationId)
        .toPromise()).data;
      const ParentName =
        (await this.organizationService
          .getCorporation(data.CorporationId)
          .toPromise()) != null
          ? (await this.organizationService
            .getCorporation(data.CorporationId)
            .toPromise()).data[0].CorporationName
          : null;
      data.ParentName = ParentName;
      data.CorporationContactList = CorporationContact;
      data.CorporationAddressList = CorporationAddress;
    });
    return corperationList;
  }

  public async delete(data) {
    Swal.fire({
      title: '',
      text: 'คุณต้องการลบข้อมูลนี้หรือไม่',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then(async result => {
      if (result.value) {
        await this.organizationService
          .deleteCorporation(data.CorporationId)
          .toPromise();
        await this.organizationService
          .deleteCorporationAddress(data.CorporationAddressId)
          .toPromise();
        await this.organizationService
          .deleteCorporationContact(data.CorporationContactId)
          .toPromise();
        this.organizationList = this.mapCorperation(
          (await this.organizationService.getOrganizationAll().toPromise()).data
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'คุณได้กดยกเลิก',
          'error'
        );
      }

    });
  }

  async onSearchData() {
    this.spinner.show();
    this.organizationList = this.mapCorperation(
      (await this.organizationService.getOrganizationAll().toPromise()).data
    );
    if (this.inputSearch != '') {
      this.organizationList = this.organizationList.filter(corperation => {
        return (
          corperation.CorporationName.includes(this.inputSearch) ||
          corperation.TaxNo.includes(this.inputSearch)
        );
      });
      this.spinner.hide()
    }
  }

  canEdit(url, checkNext = null){
    /*
    var ret = this.usersService.canEdit(url)
    if (ret){
      if (checkNext !== null)
        return checkNext;
    }
    return ret;
    */
   return this.canAddOrganization;
  }
}
