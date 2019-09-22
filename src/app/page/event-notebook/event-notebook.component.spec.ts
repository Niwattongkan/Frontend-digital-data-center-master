import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNotebookComponent } from './event-notebook.component';

describe('EventNotebookComponent', () => {
  let component: EventNotebookComponent;
  let fixture: ComponentFixture<EventNotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventNotebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
