import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrganizationService } from '../../../shared/services/organization.service';

import { mapPersons, createdNamePersons } from '../../../shared/library/mapList';


@Component({
  selector: 'app-organizations-related-person',
  templateUrl: './organizations-related-person.component.html',
  styleUrls: ['./organizations-related-person.component.css']
})
export class OrganizationsRelatedPersonComponent implements OnInit {

  public organizationId = ""

  public bursariesPerson: any = [];
  public page: Number;
  
  public stepList: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService
  ) {
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.setMenubar();
  }

  async ngOnInit() {
    this.bursariesPerson = await mapPersons((await this.organizationService.getCorporationPerson(this.organizationId).toPromise()).data)
  }

  datFormate(data) {
    return "ตั้งแต่ " + data.StartMonth + " ถึง " + data.EndMonth
  }
  
  private setMenubar() {
    this.stepList = [
      { icon: "", stepName: "ข้อมูลองค์กร", path: "/organizations/detail/" + this.organizationId },
      { icon: "", stepName: "บุคคลที่เกี่ยวข้อง", path: "/organizations/related-person/" + this.organizationId },
      { icon: "", stepName: "ประวัติการรับทุน", path: "/organizations/bursary/" + this.organizationId },
    ]
  }
}
