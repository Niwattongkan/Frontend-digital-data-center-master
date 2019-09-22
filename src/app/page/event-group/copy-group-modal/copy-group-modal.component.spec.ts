import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyGroupModalComponent } from './copy-group-modal.component';

describe('CopyGroupModalComponent', () => {
  let component: CopyGroupModalComponent;
  let fixture: ComponentFixture<CopyGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
