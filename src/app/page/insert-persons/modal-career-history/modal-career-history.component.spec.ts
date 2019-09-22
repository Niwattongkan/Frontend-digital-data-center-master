import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCareerHistoryComponent } from './modal-career-history.component';

describe('ModalCareerHistoryComponent', () => {
  let component: ModalCareerHistoryComponent;
  let fixture: ComponentFixture<ModalCareerHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCareerHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCareerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
