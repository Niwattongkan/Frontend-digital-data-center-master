import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProgramComponent } from './card-program.component';

describe('CardProgramComponent', () => {
  let component: CardProgramComponent;
  let fixture: ComponentFixture<CardProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
