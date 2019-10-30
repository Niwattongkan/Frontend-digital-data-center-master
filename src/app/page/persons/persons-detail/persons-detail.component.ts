import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PersonsService } from '../../../shared/services/persons.service';

import { mapPersons, createdNamePersons } from '../../../shared/library/mapList';
import { alertEvent, alertDeleteEvent } from '../../../shared/library/alert';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'persons-detail',
  templateUrl: './persons-detail.component.html',
  styleUrls: ['./persons-detail.component.css']
})
export class PersonsDetailComponent implements OnInit {

  public personId = ""

  public detailPerson: any = {};
  public profile: any;
  public contact: any;
  public coordinate: any;
  public favorite: any;
  public account: any;
  public position: any;
  public address: any;

  public cardIcon: any = [];
  public stepList: any = [];

  public coordinateList: any = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private personsService: PersonsService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) {
    this.personId = this.activatedRoute.snapshot.paramMap.get('id');
    this.setTabbar()
    this.setMenubar()
  }

  async ngOnInit() {

    this.spinner.show();
    this.detailPerson = this.personId ? await mapPersons((await this.personsService.getDetailById(this.personId).toPromise()).data)[0] : null
    if (this.detailPerson.length == 0) {
      alertEvent('ไม่พบข้อมูลบุคคุลนี้', 'warning')
      this.spinner.hide()
      return this.router.navigate(['/persons']);
    }

    this.profile = await this.setProfile(this.detailPerson)
    this.contact = await this.setContact(this.detailPerson)
    this.coordinate = await this.setCoordinate()
    this.favorite = await this.setFavorite(this.detailPerson)

    this.account = await this.setAccount()
    this.position = await this.setPosition(this.detailPerson)
    this.address = await this.setAddress()
    this.spinner.hide()

  }

  public async deletePersonal(event) {
    return event ? alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        await this.personsService.deletePersonById(this.personId).toPromise()
        this.router.navigate(['/persons']);
        return alertEvent("ลบข้อมูลสำเร็จ", "success")
      }
    }) : null
  }

  private setTabbar() {
    this.cardIcon = [
      { icon: "profile", name: "ข้อมูลส่วนตัว", id: "profile" },
      { icon: "contact", name: "การติดต่อ", id: "contact" },
      { icon: "coordinate", name: "ผู้ประสานงาน", id: "coordinate" },
      { icon: "favorite", name: "บันทึกส่วนตัว", id: "favorite" },
      { icon: "account", name: "บัญชี", id: "account" },
      { icon: "position", name: "ตำแหน่ง สสส", id: "position" },
      { icon: "address", name: "ข้อมูลที่อยู่", id: "address" },
    ]
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

  private setProfile(data) {
    return {
      PersonId: data.PersonId ? data.PersonId : null,
      FullnameTh: data.FullnameTh ? data.FullnameTh : "",
      TitleNameTh: data.TitleNameTh ? data.TitleNameTh : "",
      FristNameTh: data.FristNameTh ? data.FristNameTh : "",
      LastNameTh: data.LastNameTh ? data.LastNameTh : "",
      FullnameEn: data.FullnameEn ? data.FullnameEn : "",
      TitleNameEn: data.TitleNameEn ? data.TitleNameEn : "",
      FristNameEn: data.FristNameEn ? data.FristNameEn : "",
      LastNameEn: data.LastNameEn ? data.LastNameEn : "",
      IdCard: data.IdCard ? data.IdCard : "",
      Birthday: data.Birthday ? data.Birthday : "",
      Sex: data.Sex ? data.Sex : "",
      Passport: data.Passport ? data.Passport : "",
      Marital: data.Marital ? data.Marital : "",
      Military: data.Military ? data.Military : "",
      Religion: data.Religion ? data.Religion : "",
      Nationality: data.Nationality ? data.Nationality : "",
      PartPhoto: data.PartPhoto ? data.PartPhoto : "",
      EthnicityId: data.EthnicityId ? data.EthnicityId : "",
      WorkPermitNo: data.WorkPermitNo ? data.WorkPermitNo : "",
      Soldierly: data.Soldierly ? data.Soldierly : "",
    }
  }

  private setContact(data) {
    return {
      PersonContactId: data.PersonContactId ? data.PersonContactId : null,
      TypeContactId: data.TypeContactId ? data.TypeContactId : null,
      Importance: data.Importance ? data.Importance : null,
      Contact: data.Contact ? data.Contact : null,
    }
  }

  private setFavorite(data) {
    return {
      FavoriteFood: data.FavoriteFood ? data.FavoriteFood : "",
      AllergicFood: data.AllergicFood ? data.AllergicFood : "",
      FavoriteColor: data.FavoriteColor ? data.FavoriteColor : "",
      FoodDislike: data.FoodDislike ? data.FoodDislike : "",
      CongenitalDisease: data.CongenitalDisease ? data.CongenitalDisease : "",
      AllergicDrugs: data.AllergicDrugs ? data.AllergicDrugs : "",
      VehicleRegistrationNumber: data.VehicleRegistrationNumber ? data.VehicleRegistrationNumber : "",
      OtherPreferences: data.OtherPreferences ? data.OtherPreferences : "",
    }
  }

  private async setCoordinate() {
    let result = (await this.personsService.getcoordinator(this.personId).toPromise()).data
    let coordinatePerson = []

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      let TitleName = element ? element.TitleNameTh == 1 ? "นาย" : element.TitleNameTh == 2 ? "นาง" : "นางสาว" : ""
      coordinatePerson.push({
        CoordinatorId: element ? element.CoordinatorId : "",
        CoordinatorName: TitleName + (element ? element.FristNameTh : "") + " " + (element ? element.LastNameTh : ""),
        ContactCoordinator: element ? element.ContactCoordinator : "",
        TypeContactId: element ? element.TypeContactId : "",
        Contact: element ? element.Contact : "",
      })
    }

    return coordinatePerson
  }

  private async setAccount() {
    let coordinatePerson = (await this.personsService.getbookbankperson(this.personId).toPromise()).data
    let bankList = []
    if (coordinatePerson) {
      for (let index = 0; index < coordinatePerson.length; index++) {
        bankList.push({
          BankId: coordinatePerson[index].BankId ? coordinatePerson[index].BankId : "",
          BankName: coordinatePerson[index].BankName ? coordinatePerson[index].BankName : "",
          Branch: coordinatePerson[index].Branch ? coordinatePerson[index].Branch : "",
          AccountName: coordinatePerson[index].AccountName ? coordinatePerson[index].AccountName : "",
          AccountNo: coordinatePerson[index].AccountNo ? coordinatePerson[index].AccountNo : "",
        })
      }
    }
    return bankList
  }

  private setPosition(data) {
    return {
      WorkId: data.WorkId ? data.WorkId : "",
      StartMonth: data.StartMonth ? data.StartMonth : "",
      StartYear: data.StartYear ? data.StartYear : "",
      EndMonth: data.EndMonth ? data.EndMonth : "",
      EndYear: data.EndYear ? data.EndYear : "",
      Position: data.Position ? data.Position : "",
      Corporation: data.Corporation ? data.Corporation : "",
    }
  }

  private async setAddress() {
    let addressList = (await this.personsService.getAddressById(this.personId).toPromise()).data
    return addressList
  }

  public nextStep(event) {

  }

  public scroll(el) {
    const elementList = document.querySelectorAll('.scroll-' + el);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
  }

}
