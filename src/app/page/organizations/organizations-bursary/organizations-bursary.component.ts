import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";

import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-organizations-bursary',
  templateUrl: './organizations-bursary.component.html',
  styleUrls: ['./organizations-bursary.component.css']
})
export class OrganizationsBursaryComponent implements OnInit {

  public organizationId = ""

  public bursariesPerson: any = [];
  public page: any;

  public stepList: any = [];

  constructor(
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService
  ) {
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.setMenubar();
  }

  async ngOnInit() {
    this.spinner.show();
    this.bursariesPerson = (await this.organizationService.getCorporationProject(this.organizationId).toPromise()).data
    this.spinner.hide();

  }

  private setMenubar() {
    this.stepList = [
      { icon: "", stepName: "ข้อมูลองค์กร", path: "/organizations/detail/" + this.organizationId },
      { icon: "", stepName: "บุคคลที่เกี่ยวข้อง", path: "/organizations/related-person/" + this.organizationId },
      { icon: "", stepName: "ประวัติการรับทุน", path: "/organizations/bursary/" + this.organizationId },
    ]
  }

  public getYear(year) {
    let now = new Date(year)
    return (now.getFullYear() + 543)
  }
}
