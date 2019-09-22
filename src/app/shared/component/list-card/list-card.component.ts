import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent {

  @Input() card: any = [];
  @Output() onEvent: EventEmitter<any> = new EventEmitter<any>();

  public nextStep(index, value) {
    let element = value.icon
    this.onEvent.emit(element);
  }
  
}
