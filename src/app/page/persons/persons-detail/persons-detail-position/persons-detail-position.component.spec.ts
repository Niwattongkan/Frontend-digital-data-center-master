import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailPositionComponent } from './persons-detail-position.component';

describe('PersonsDetailPositionComponent', () => {
  let component: PersonsDetailPositionComponent;
  let fixture: ComponentFixture<PersonsDetailPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
