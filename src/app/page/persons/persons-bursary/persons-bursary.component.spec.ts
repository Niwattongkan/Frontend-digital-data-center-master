import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsBursaryComponent } from './persons-bursary.component';

describe('PersonsBursaryComponent', () => {
  let component: PersonsBursaryComponent;
  let fixture: ComponentFixture<PersonsBursaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsBursaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsBursaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
