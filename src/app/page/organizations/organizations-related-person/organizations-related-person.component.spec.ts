import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsRelatedPersonComponent } from './organizations-related-person.component';

describe('OrganizationsRelatedPersonComponent', () => {
  let component: OrganizationsRelatedPersonComponent;
  let fixture: ComponentFixture<OrganizationsRelatedPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsRelatedPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsRelatedPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
