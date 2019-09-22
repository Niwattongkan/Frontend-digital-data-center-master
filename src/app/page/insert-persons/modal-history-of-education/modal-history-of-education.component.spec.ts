import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistoryOfEducationComponent } from './modal-history-of-education.component';

describe('ModalHistoryOfEducationComponent', () => {
  let component: ModalHistoryOfEducationComponent;
  let fixture: ComponentFixture<ModalHistoryOfEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHistoryOfEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistoryOfEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
