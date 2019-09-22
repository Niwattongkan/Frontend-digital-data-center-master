import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLicenseComponent } from './setting-license.component';

describe('SettingLicenseComponent', () => {
  let component: SettingLicenseComponent;
  let fixture: ComponentFixture<SettingLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
