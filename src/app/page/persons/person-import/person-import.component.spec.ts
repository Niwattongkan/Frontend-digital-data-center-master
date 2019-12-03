import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonImportComponent } from './person-import.component';

describe('PersonImportComponent', () => {
  let component: PersonImportComponent;
  let fixture: ComponentFixture<PersonImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
