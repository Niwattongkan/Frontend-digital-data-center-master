import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonsService } from '../../../shared/services/persons.service';
import SimpleCrypto from "simple-crypto-js/build/SimpleCrypto";

@Component({
  selector: 'app-persons-studies',
  templateUrl: './persons-studies.component.html',
  styleUrls: ['./persons-studies.component.css']
})
export class PersonsStudiesComponent implements OnInit {

  public personId = ""

  public stepList: any = [];

  public personStudy: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService
  ) {
    this.setMenubar();
  }

  async ngOnInit() {
    let Crypto = new SimpleCrypto('some-unique-key');
    this.personId = String(Crypto.decrypt(decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id'))));
    this.personStudy = (await this.personsService.getEducationById(this.personId).toPromise()).data
  }

  private setMenubar() {
    this.personId = this.activatedRoute.snapshot.paramMap.get('id')
    this.stepList = [
      { icon: "profile", stepName: "ข้อมูลส่วนตัว", path: "/persons/detail/" + this.personId },
      { icon: "family", stepName: "ครอบครัว", path: "/persons/family/" + this.personId },
      { icon: "working", stepName: "การทำงาน", path: "/persons/working/" + this.personId },
      { icon: "capital", stepName: "การรับทุน", path: "/persons/bursary/" + this.personId },
      { icon: "Asset 36", stepName: "การศึกษา", path: "/persons/studies/" + this.personId },
    ]
  }

}
