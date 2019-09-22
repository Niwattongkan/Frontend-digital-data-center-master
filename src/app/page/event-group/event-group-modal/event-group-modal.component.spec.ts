import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGroupModalComponent } from './event-group-modal.component';

describe('EventGroupModalComponent', () => {
  let component: EventGroupModalComponent;
  let fixture: ComponentFixture<EventGroupModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGroupModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
