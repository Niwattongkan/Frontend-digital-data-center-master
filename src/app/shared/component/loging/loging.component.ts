import { Component, OnInit, Input } from '@angular/core';

import { AuthlogService } from '../../../shared/services/authlog.service';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {

  public editlogPersonlist = [];

  @Input() personId: any;

  constructor(
    private authlogService: AuthlogService,
  ) { }

  async ngOnInit() {
    this.editlogPersonlist = this.findEditLog((await this.authlogService.getEditlogPersonAll().toPromise()).data)
  }

  public findEditLog(personList) {
    let result = []
    personList ? personList.find(data => data.PersonId == this.personId ? result.push(data) : false) : null
    return result
  }
}
