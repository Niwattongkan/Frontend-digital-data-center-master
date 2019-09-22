import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsDetailFavoriteComponent } from './persons-detail-favorite.component';

describe('PersonsDetailFavoriteComponent', () => {
  let component: PersonsDetailFavoriteComponent;
  let fixture: ComponentFixture<PersonsDetailFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsDetailFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsDetailFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
