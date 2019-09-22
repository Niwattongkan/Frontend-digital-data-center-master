import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFamilyInformationComponent } from './modal-family-information.component';

describe('ModalFamilyInformationComponent', () => {
  let component: ModalFamilyInformationComponent;
  let fixture: ComponentFixture<ModalFamilyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFamilyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFamilyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
