import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'persons-detail-favorite',
  templateUrl: './persons-detail-favorite.component.html',
  styleUrls: ['./persons-detail-favorite.component.css']
})
export class PersonsDetailFavoriteComponent {

  public favoriteForm: any = {};

  @Input() inputForm: any;

  constructor() { }

  ngOnChanges() {
    this.favoriteForm = this.inputForm ? this.inputForm : ""
  }

}
