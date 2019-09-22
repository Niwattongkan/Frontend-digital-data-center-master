import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactInformationComponent } from './modal-contact-information.component';

describe('ModalContactInformationComponent', () => {
  let component: ModalContactInformationComponent;
  let fixture: ComponentFixture<ModalContactInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContactInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
