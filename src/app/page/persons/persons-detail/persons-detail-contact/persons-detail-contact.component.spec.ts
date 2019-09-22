import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailContactComponent } from './persons-detail-contact.component';

describe('PersonsDetailContactComponent', () => {
  let component: PersonsDetailContactComponent;
  let fixture: ComponentFixture<PersonsDetailContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
