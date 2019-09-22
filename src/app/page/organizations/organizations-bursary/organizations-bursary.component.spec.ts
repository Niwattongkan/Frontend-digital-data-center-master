import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsBursaryComponent } from './organizations-bursary.component';

describe('OrganizationsBursaryComponent', () => {
  let component: OrganizationsBursaryComponent;
  let fixture: ComponentFixture<OrganizationsBursaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsBursaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsBursaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
