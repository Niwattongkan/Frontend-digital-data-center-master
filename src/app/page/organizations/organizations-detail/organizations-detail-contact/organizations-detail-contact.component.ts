import { Component, Input } from '@angular/core';

@Component({
  selector: 'organizations-detail-contact',
  templateUrl: './organizations-detail-contact.component.html',
  styleUrls: ['./organizations-detail-contact.component.css']
})
export class OrganizationsDetailContactComponent {

  public contactForm: any ={};

  @Input() inputForm: any;

  constructor() {}

  async ngOnChanges() {
    this.contactForm = this.inputForm ? this.inputForm : {}
  }

}
