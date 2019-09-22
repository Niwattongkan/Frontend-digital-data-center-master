import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedNoteModalComponent } from './shared-note-modal.component';

describe('SharedNoteModalComponent', () => {
  let component: SharedNoteModalComponent;
  let fixture: ComponentFixture<SharedNoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedNoteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
