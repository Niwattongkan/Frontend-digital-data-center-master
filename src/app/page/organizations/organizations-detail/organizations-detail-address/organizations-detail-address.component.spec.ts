import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDetailAddressComponent } from './organizations-detail-address.component';

describe('OrganizationsDetailAddressComponent', () => {
  let component: OrganizationsDetailAddressComponent;
  let fixture: ComponentFixture<OrganizationsDetailAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsDetailAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsDetailAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
