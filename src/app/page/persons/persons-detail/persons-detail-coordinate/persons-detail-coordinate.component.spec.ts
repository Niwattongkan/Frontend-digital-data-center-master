import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailCoordinateComponent } from './persons-detail-coordinate.component';

describe('PersonsDetailCoordinateComponent', () => {
  let component: PersonsDetailCoordinateComponent;
  let fixture: ComponentFixture<PersonsDetailCoordinateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailCoordinateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailCoordinateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
