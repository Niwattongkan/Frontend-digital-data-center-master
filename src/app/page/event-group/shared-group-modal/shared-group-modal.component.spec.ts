import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedGroupModalComponent } from './shared-group-modal.component';

describe('SharedGroupModalComponent', () => {
  let component: SharedGroupModalComponent;
  let fixture: ComponentFixture<SharedGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
