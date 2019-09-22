import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDetailContactComponent } from './organizations-detail-contact.component';

describe('OrganizationsDetailContactComponent', () => {
  let component: OrganizationsDetailContactComponent;
  let fixture: ComponentFixture<OrganizationsDetailContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsDetailContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsDetailContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
