import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSearchingCorperationComponent } from './report-searching-corperation.component';

describe('ReportSearchingCorperationComponent', () => {
  let component: ReportSearchingCorperationComponent;
  let fixture: ComponentFixture<ReportSearchingCorperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSearchingCorperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSearchingCorperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
