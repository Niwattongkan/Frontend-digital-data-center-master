import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailAddressComponent } from './persons-detail-address.component';

describe('PersonsDetailAddressComponent', () => {
  let component: PersonsDetailAddressComponent;
  let fixture: ComponentFixture<PersonsDetailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
