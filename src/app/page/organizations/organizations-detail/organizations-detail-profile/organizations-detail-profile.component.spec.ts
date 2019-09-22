import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDetailProfileComponent } from './organizations-detail-profile.component';

describe('OrganizationsDetailProfileComponent', () => {
  let component: OrganizationsDetailProfileComponent;
  let fixture: ComponentFixture<OrganizationsDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
