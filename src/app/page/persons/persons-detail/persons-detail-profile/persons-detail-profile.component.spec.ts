import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailProfileComponent } from './persons-detail-profile.component';

describe('PersonsDetailProfileComponent', () => {
  let component: PersonsDetailProfileComponent;
  let fixture: ComponentFixture<PersonsDetailProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
