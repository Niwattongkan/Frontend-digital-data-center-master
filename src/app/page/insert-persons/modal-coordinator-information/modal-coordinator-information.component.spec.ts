import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoordinatorInformationComponent } from './modal-coordinator-information.component';

describe('ModalCoordinatorInformationComponent', () => {
  let component: ModalCoordinatorInformationComponent;
  let fixture: ComponentFixture<ModalCoordinatorInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCoordinatorInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoordinatorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
