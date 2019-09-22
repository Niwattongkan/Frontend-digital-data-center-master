import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsWorkingComponent } from './persons-working.component';

describe('PersonsWorkingComponent', () => {
  let component: PersonsWorkingComponent;
  let fixture: ComponentFixture<PersonsWorkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsWorkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
