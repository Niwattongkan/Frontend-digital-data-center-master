import { Component, OnInit } from '@angular/core';

import { PersonsService } from '../../../shared/services/persons.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { alertEvent, alertDeleteEvent } from '../../../shared/library/alert';

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

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private personsService: PersonsService,
  ) { }

  async ngOnInit() {
    this.spinnerService.show();
    this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)
    this.tempPersonList = this.personList
    this.spinnerService.hide();
  }

  public mapPerson(personList) {
    personList.map(async data => {
      data.PersonAddress = []

      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
      let first = data.FristNameTh
      let last = data.LastNameTh

      let titleEn = data.TitleNameEn == 1 ? 'Mr.' : data.TitleNameEn == 2 ? 'Mrs.' : 'Miss.'
      let firstEn = data.FristNameEn
      let lastEn = data.LastNameEn

      let workperson = (await this.personsService.getworkperson(data.PersonId).toPromise()).data
      let workcontact = (await this.personsService.getcontactperson(data.PersonId).toPromise()).data

      data.FullnameTh = first && last ? title + first + ' ' + last : ''
      data.FullnameEn = firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : ''
      data.ContactList = workcontact
      data.PositionList = workperson

      let address = (await this.personsService.getAddressById(data.PersonId).toPromise()).data
      data.PersonAddress = address.length > 0 ? address : []
    })
    return personList
  }

  async onSearchData() {
    this.spinnerService.show();
    if (this.inputSearch != '') {
      this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)

      let seachPerson = this.personList.filter(person => {
        return (String(person.FristNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.LastNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.Contact)).includes(this.inputSearch)
      });
      this.personList = seachPerson.length > 0 ? seachPerson : await this.mapPerson((await this.personsService.getsearchpersoncontact(this.inputSearch).toPromise()).data)
    } else {
      this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)
    }
    this.spinnerService.hide();
    return this.page = 1
  }

  public async delete(id) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        this.spinnerService.show();
        await this.personsService.deletePersonById(id).toPromise()
        this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)
        this.spinnerService.hide();
        return alertEvent("ลบข้อมูลสำเร็จ", "success")
      }
    })
  }
}
