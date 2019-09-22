import { Component, OnInit, Input, Output } from '@angular/core';


@Component({
  selector: 'card-program',
  templateUrl: './card-program.component.html',
  styleUrls: ['./card-program.component.css']
})
export class CardProgramComponent implements OnInit {

  type = ""
  public isCollapsed = true;

  @Input() data: any;

  constructor() { }

  ngOnInit() {
    this.type = this.data.ProjectId ? "project" : "purchas"
  }

  public getYear(year) {
    let date = year ? new Date(year) : null
    return date ? date.getFullYear() : "-"
  }


}
