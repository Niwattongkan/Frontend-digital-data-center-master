import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OrganizationService } from '../../../../shared/services/organization.service';
import { UsersService } from 'src/app/shared/services/users.service';

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
    private organizationService: OrganizationService,
    private usersService:UsersService,
    private activatedRoute: ActivatedRoute
  ) {
 //   this.corporationId = this.inputForm ? this.inputForm.CorporationId : ""
    this.profileForm = this.setCoreration(null)
  }
  async ngOnInit() {
    this.corporationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.profileForm = this.setCoreration(null)
    console.log(this.inputForm);
  }

  async ngOnChanges() {
    this.profileForm = this.inputForm ? this.setCoreration(this.inputForm) : this.setCoreration(null)
    this.profileForm.ParentName = ((await this.organizationService.getCorporation(this.profileForm.ParentId).toPromise()).data[0]).CorporationName
  }


  setCoreration(data) {
    console.log(data)
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

  canEdit(){
    debugger
    return this.usersService.canEditOrganization();
  }

}
