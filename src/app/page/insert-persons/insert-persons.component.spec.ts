import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPersonsComponent } from './insert-persons.component';

describe('InsertPersonsComponent', () => {
  let component: InsertPersonsComponent;
  let fixture: ComponentFixture<InsertPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
