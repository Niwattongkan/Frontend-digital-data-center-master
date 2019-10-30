import {Component, OnInit} from "@angular/core";

import {OrganizationService} from "../../../shared/services/organization.service";

import {alertDeleteEvent} from "../../../shared/library/alert";
import Swal from "sweetalert2";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: "app-organizations-list",
  templateUrl: "./organizations-list.component.html",
  styleUrls: ["./organizations-list.component.css"]
})
export class OrganizationsListComponent implements OnInit {
  public page: Number;
  public organizationList: any = [];
  public inputSearch = "";

  constructor(
    private organizationService: OrganizationService,
    private spinner: NgxSpinnerService,
  ) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.organizationList = this.mapCorperation(
      (await this.organizationService.getOrganizationAll().toPromise()).data
    );
    this.spinner.hide();
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
      title: "",
      text: "คุณต้องการลบข้อมูลนี้หรือไม่",
      type: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก"
    }).then(async result => {
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
    });
  }

  async onSearchData() {
    this.spinner.show();
    this.organizationList = this.mapCorperation(
      (await this.organizationService.getOrganizationAll().toPromise()).data
    );
    if (this.inputSearch != "") {
      this.organizationList = this.organizationList.filter(corperation => {
        return (
          corperation.CorporationName.includes(this.inputSearch) ||
          corperation.TaxNo.includes(this.inputSearch)
        );
      });
      this.spinner.hide()
    }
  }
}
