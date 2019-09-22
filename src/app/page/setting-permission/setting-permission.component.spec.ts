import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPermissionComponent } from './setting-permission.component';

describe('SettingPermissionComponent', () => {
  let component: SettingPermissionComponent;
  let fixture: ComponentFixture<SettingPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
