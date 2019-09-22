import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertOrganizationsComponent } from './insert-organizations.component';

describe('InsertOrganizationsComponent', () => {
  let component: InsertOrganizationsComponent;
  let fixture: ComponentFixture<InsertOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
