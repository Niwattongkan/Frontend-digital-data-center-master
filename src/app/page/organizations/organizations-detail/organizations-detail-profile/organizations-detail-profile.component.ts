import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrganizationService } from '../../../../shared/services/organization.service';

@Component({
  selector: 'organizations-detail-profile',
  templateUrl: './organizations-detail-profile.component.html',
  styleUrls: ['./organizations-detail-profile.component.css']
})
export class OrganizationsDetailProfileComponent {

  public profileForm: any = null;
  public organizationAll: any;

  public corporationId = ''

  @Input() inputForm: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService
  ) {
    this.corporationId = Object.values(this.activatedRoute.snapshot.params)[0]
    this.profileForm = this.setCoreration(null)
  }
  async ngOnInit() {
    this.profileForm = this.setCoreration(null)
  }

  async ngOnChanges() {
    this.profileForm = this.inputForm ? this.setCoreration(this.inputForm) : this.setCoreration(null)
    this.profileForm.ParentName = ((await this.organizationService.getCorporation(this.profileForm.ParentId).toPromise()).data[0]).CorporationName
  }


  setCoreration(data) {
    return data ? {
      CorporationName: data.CorporationName,
      Parent: data.Parent,
      TaxNo: data.TaxNo,
    } : {
        CorporationName: "",
        Parent: "",
        TaxNo: "",
      }
  }
}
