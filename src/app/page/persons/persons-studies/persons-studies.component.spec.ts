import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsStudiesComponent } from './persons-studies.component';

describe('PersonsStudiesComponent', () => {
  let component: PersonsStudiesComponent;
  let fixture: ComponentFixture<PersonsStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
