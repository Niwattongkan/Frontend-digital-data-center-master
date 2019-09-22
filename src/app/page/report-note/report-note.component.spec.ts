import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNoteComponent } from './report-note.component';

describe('ReportNoteComponent', () => {
  let component: ReportNoteComponent;
  let fixture: ComponentFixture<ReportNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
