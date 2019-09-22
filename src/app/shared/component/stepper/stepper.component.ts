import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  @Input() stepList: any = [];
  @Input() currentStep: number;

  public menuList: any = []
  // @Output() onEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router
  ) {  }

  ngOnInit() {
    this.menuList = this.stepList.filter(menuItem => menuItem);
  }

  public nextStep(index, value) {
    this.router.navigate([value.path]);
  }
}
