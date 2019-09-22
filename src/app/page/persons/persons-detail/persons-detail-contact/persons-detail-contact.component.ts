import { Component, Input } from '@angular/core';

import { PersonsService } from '../../../../shared/services/persons.service';

@Component({
  selector: 'persons-detail-contact',
  templateUrl: './persons-detail-contact.component.html',
  styleUrls: ['./persons-detail-contact.component.css']
})
export class PersonsDetailContactComponent {

  public contactList: any = [];

  public contactNumberList: any = [];
  public contactFaxList: any = [];
  public contactEmailList: any = [];
  public contacLinetList: any = [];
  public contactFacebookList: any = [];
  public contactTwitterList: any = [];
  public contactInstagramList: any = [];
  @Input() personId: any;

  constructor(
    private personsService: PersonsService,
  ) { }

  async ngOnChanges() {
    this.setContact((await this.personsService.getcontactperson(this.personId).toPromise()).data)
  }

  setContact(list) {
    for (let index = 0; index < list.length; index++) {
      if(list[index].TypeContactId == "2") this.contactNumberList.push(list[index])
      else if(list[index].TypeContactId == "1") this.contactEmailList.push(list[index])
      else if(list[index].TypeContactId == "3") this.contacLinetList.push(list[index])
      else if(list[index].TypeContactId == "4") this.contactFacebookList.push(list[index])
      else if(list[index].TypeContactId == "5") this.contactTwitterList.push(list[index])
      else if(list[index].TypeContactId == '6') this.contactInstagramList.push(list[index])
      else if(list[index].TypeContactId == "7") this.contactFaxList.push(list[index])
    }
  }

}
