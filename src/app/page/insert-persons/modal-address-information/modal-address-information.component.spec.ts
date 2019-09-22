import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddressInformationComponent } from './modal-address-information.component';

describe('ModalAddressInformationComponent', () => {
  let component: ModalAddressInformationComponent;
  let fixture: ComponentFixture<ModalAddressInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddressInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddressInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
