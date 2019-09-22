import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSearchingPersonalComponent } from './report-searching-personal.component';

describe('ReportSearchingPersonalComponent', () => {
  let component: ReportSearchingPersonalComponent;
  let fixture: ComponentFixture<ReportSearchingPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSearchingPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSearchingPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
