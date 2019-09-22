import { Component, Input } from '@angular/core';

import { PersonsService } from '../../../../shared/services/persons.service';

@Component({
  selector: 'persons-detail-position',
  templateUrl: './persons-detail-position.component.html',
  styleUrls: ['./persons-detail-position.component.css']
})
export class PersonsDetailPositionComponent {
  public table = []

  public positionForm: any = {};
  public workingPerson: any = [];
  public workingCorporation: any = [];
  @Input() personId: any;

  constructor(
    private personsService: PersonsService
  ) { }

  async ngOnChanges() {
    this.workingCorporation = (await this.personsService.getworkperson(this.personId).toPromise()).data
  }

  public convertDate(date) {
    let dateStart = new Date(date.StartMonth)
    let dateEnd = new Date(date.EndMonth)
    let year = dateEnd.getFullYear() - dateStart.getFullYear();
    let month = dateEnd.getMonth() - dateStart.getMonth();
    let text = year == 0 && month == 0 ? "ปัจจุบัน" : "";
    let textYear = year == 0 ? "" : year + " ปี "
    let textMonth = month == 0 ? "" : month + " เดือน"
    return text + textYear + textMonth
  }

}
