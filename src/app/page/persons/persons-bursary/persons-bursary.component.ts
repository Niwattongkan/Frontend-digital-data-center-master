import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonsService } from '../../../shared/services/persons.service';

@Component({
  selector: 'persons-bursary',
  templateUrl: './persons-bursary.component.html',
  styleUrls: ['./persons-bursary.component.css']
})
export class PersonsBursaryComponent implements OnInit {

  public personId = ""

  public bursariesPerson: any = [];

  public stepList: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService
  ) {
    this.personId = this.activatedRoute.snapshot.paramMap.get('id');
    this.setMenubar();
  }

  async ngOnInit() {
    this.bursariesPerson = (await this.personsService.getProjectById(this.personId).toPromise()).data
    console.log(this.bursariesPerson)
  }

  private setMenubar() {
    this.stepList = [
      { icon: "profile", stepName: "ข้อมูลส่วนตัว", path: "/persons/detail/" + this.personId },
      { icon: "family", stepName: "ครอบครัว", path: "/persons/family/" + this.personId },
      { icon: "working", stepName: "การทำงาน", path: "/persons/working/" + this.personId },
      { icon: "capital", stepName: "การรับทุน", path: "/persons/bursary/" + this.personId },
      { icon: "Asset 36", stepName: "การศึกษา", path: "/persons/studies/" + this.personId },
    ]
  }

}
