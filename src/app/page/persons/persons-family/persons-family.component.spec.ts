import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsFamilyComponent } from './persons-family.component';

describe('PersonsFamilyComponent', () => {
  let component: PersonsFamilyComponent;
  let fixture: ComponentFixture<PersonsFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
