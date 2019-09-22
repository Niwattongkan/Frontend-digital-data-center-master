import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrganizationComponent } from './card-organization.component';

describe('CardOrganizationComponent', () => {
  let component: CardOrganizationComponent;
  let fixture: ComponentFixture<CardOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
