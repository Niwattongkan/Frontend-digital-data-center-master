import { Component, OnInit, Input } from '@angular/core';

import { PersonsService } from '../../../../shared/services/persons.service';

@Component({
  selector: 'persons-detail-coordinate',
  templateUrl: './persons-detail-coordinate.component.html',
  styleUrls: ['./persons-detail-coordinate.component.css']
})
export class PersonsDetailCoordinateComponent {

  public coordinateForm: any = [];
  public coordinateName = '';

  public contactNumberList: any = [];
  public contactEmailList: any = [];

  @Input() personId: any;

  constructor(
    private personsService: PersonsService,
  ) { }

  async ngOnChanges() {
    this.coordinateForm = this.setContact((await this.personsService.getcoordinator(this.personId).toPromise()).data)

    this.coordinateName = this.coordinateForm[0] ? ((this.coordinateForm[0].TitleNameTh ? this.coordinateForm[0].TitleNameTh : '') +
      (this.coordinateForm[0].FristNameTh ? this.coordinateForm[0].FristNameTh : '') +
      (this.coordinateForm[0].LastNameTh ? ' ' + this.coordinateForm[0].LastNameTh : '')) : ''
  }

  setContact(list) {
    for (let index = 0; index < list.length; index++) {
      if (list[index].TypeContactId == "2") this.contactNumberList.push(list[index])
      else if (list[index].TypeContactId == "1") this.contactEmailList.push(list[index])
    }
    return list
  }
}
