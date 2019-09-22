import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSearchingBoardComponent } from './report-searching-board.component';

describe('ReportSearchingBoardComponent', () => {
  let component: ReportSearchingBoardComponent;
  let fixture: ComponentFixture<ReportSearchingBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSearchingBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSearchingBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
