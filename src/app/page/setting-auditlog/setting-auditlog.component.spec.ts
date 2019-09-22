import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAuditlogComponent } from './setting-auditlog.component';

describe('SettingAuditlogComponent', () => {
  let component: SettingAuditlogComponent;
  let fixture: ComponentFixture<SettingAuditlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAuditlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingAuditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
