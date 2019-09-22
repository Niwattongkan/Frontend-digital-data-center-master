import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailAccountComponent } from './persons-detail-account.component';

describe('PersonsDetailAccountComponent', () => {
  let component: PersonsDetailAccountComponent;
  let fixture: ComponentFixture<PersonsDetailAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
