import { Component, Input } from '@angular/core';

@Component({
  selector: 'persons-detail-account',
  templateUrl: './persons-detail-account.component.html',
  styleUrls: ['./persons-detail-account.component.css']
})
export class PersonsDetailAccountComponent {

  public bankList = []

  @Input() inputForm: any;

  constructor() { }

  ngOnChanges() {
    this.bankList = this.inputForm ? this.inputForm : []
  }
}
