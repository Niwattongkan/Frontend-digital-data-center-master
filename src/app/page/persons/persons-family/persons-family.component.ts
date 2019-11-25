import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonsService } from '../../../shared/services/persons.service';
import SimpleCrypto from "simple-crypto-js/build/SimpleCrypto";

@Component({
  selector: 'persons-family',
  templateUrl: './persons-family.component.html',
  styleUrls: ['./persons-family.component.css']
})
export class PersonsFamilyComponent implements OnInit {

  public personId = ""

  public stepList: any = [];

  public headerTable: any = ["ชื่อ-นามสกุล", "ความสัมพันธ์", "เบอร์โทร"];
  public dataTable: any = [];

  public familyPerson: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService
  ) {
    this.setMenubar()
  }

  async ngOnInit() {
    let Crypto = new SimpleCrypto('some-unique-key');
    this.personId = String(Crypto.decrypt(decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('id'))));
    this.familyPerson = this.mapPersons((await this.personsService.getFamilyById(this.personId).toPromise()).data)
    this.dataTable = await this.setDataTable(this.familyPerson)
  }

  mapPersons(personList) {
    personList.map(data => {
      let title = data.TitleNameTh1 == 1 ? 'นาย' : data.TitleNameTh1 == 2 ? 'นางสาว' : 'นาง'
      let first = data.FristNameTh1
      let last = data.LastNameTh1
      data.FullnameTh = first && last ? title + first + ' ' + last : ''
    });
    return personList
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

  private setDataTable(data) {
    let tempTable = []
    for (let index = 0; index < data.length; index++) {
      tempTable.push({
        Fullname: data[index].FullnameTh,
        Relation: data[index].Relation ? data[index].Relation : "",
        Contact: data[index].Contact ? data[index].Contact : "",
      })
    }
    return tempTable
  }
}
