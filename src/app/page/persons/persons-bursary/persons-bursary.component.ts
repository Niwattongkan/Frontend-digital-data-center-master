import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonsService } from '../../../shared/services/persons.service';
import SimpleCrypto from "simple-crypto-js/build/SimpleCrypto";

@Component({
  selector: 'persons-bursary',
  templateUrl: './persons-bursary.component.html',
  styleUrls: ['./persons-bursary.component.css']
})
export class PersonsBursaryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService
  ) {
    this.setMenubar();
  }

  public personId = ''

  public bursariesPerson: any = [];

  public stepList: any = [];

  async ngOnInit() {
    let Crypto = new SimpleCrypto('some-unique-key');
    this.personId = String(Crypto.decrypt(decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id'))));
    this.bursariesPerson = (await this.personsService.getProjectById(this.personId).toPromise()).data;
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
