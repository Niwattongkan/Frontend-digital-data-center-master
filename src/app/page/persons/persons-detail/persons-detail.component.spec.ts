import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailComponent } from './persons-detail.component';

describe('PersonsDetailComponent', () => {
  let component: PersonsDetailComponent;
  let fixture: ComponentFixture<PersonsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
