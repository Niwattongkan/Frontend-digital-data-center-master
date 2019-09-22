import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactOrganizationComponent } from './modal-contact-organization.component';

describe('ModalContactOrganizationComponent', () => {
  let component: ModalContactOrganizationComponent;
  let fixture: ComponentFixture<ModalContactOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContactOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContactOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
