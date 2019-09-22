import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsingComponent } from './report-using.component';

describe('ReportUsingComponent', () => {
  let component: ReportUsingComponent;
  let fixture: ComponentFixture<ReportUsingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUsingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
