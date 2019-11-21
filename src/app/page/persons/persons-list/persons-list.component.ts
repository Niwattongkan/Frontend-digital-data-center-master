import { Component, OnInit } from '@angular/core';

import { PersonsService } from '../../../shared/services/persons.service';

import { alertEvent, alertDeleteEvent } from '../../../shared/library/alert';
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {

  public page: Number
  public personList: any = []
  public tempPersonList: any = []
  public inputSearch = ''
  public canAddPerson = false;

  constructor(
    private personsService: PersonsService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService
  ) { }

  async ngOnInit() {
    this.spinner.show();
    this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)
    this.tempPersonList = this.personList
    this.canAddPerson = this.usersService.canAddPerson();
    this.spinner.hide();
  }

  public async  mapPerson(personList) {
    personList.map(async data => {
      data.PersonAddress = []

      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
      let titleOrther = await data.TitleNameOther != '' && data.TitleNameOther != null ? data.TitleNameOther : title
      let first = data.FristNameTh
      let last = data.LastNameTh

      let titleEn = data.TitleNameEn == 1 ? 'Mr.' : data.TitleNameEn == 2 ? 'Mrs.' : 'Miss.'
      let firstEn = data.FristNameEn
      let lastEn = data.LastNameEn

      let workperson = (await this.personsService.getworkperson(data.PersonId).toPromise()).data
      let workcontact = (await this.personsService.getcontactperson(data.PersonId).toPromise()).data

      data.FullnameTh = first && last ? titleOrther + first + ' ' + last : ''
      data.FullnameEn = firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : ''
      data.ContactList = workcontact
      data.PositionList = workperson

      let address = (await this.personsService.getAddressById(data.PersonId).toPromise()).data
      data.PersonAddress = address.length > 0 ? address : []
    })
    return personList
  }

  async onSearchData() {
    this.spinner.show();
    if (this.inputSearch != '') {
      this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)

      let seachPerson = this.personList.filter(person => {
        return (String(person.FristNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.LastNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.Contact)).includes(this.inputSearch)
      });
      this.personList = seachPerson.length > 0 ? seachPerson : await this.mapPerson((await this.personsService.getsearchpersoncontact(this.inputSearch).toPromise()).data)
      this.spinner.hide()
    } else {
      this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)
      this.spinner.hide()
    }

    return this.page = 1
  }

  public async delete(id) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {

        await this.personsService.deletePersonById(id).toPromise()
        this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)

        return alertEvent("ลบข้อมูลสำเร็จ", "success")
      }
    })
  }


  canEdit(url, checkNext = null){
    /*var ret = this.usersService.canEdit(url)
    if (ret){
      if (checkNext !== null)
        return checkNext;
    }*/
    return this.canAddPerson;
  }
}
