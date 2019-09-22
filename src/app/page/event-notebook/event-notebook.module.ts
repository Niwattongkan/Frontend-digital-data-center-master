import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RoutingModule } from './event-notebook.routing';

import { EventNotebookComponent } from './event-notebook.component';
import { NoteModalComponent } from './note-modal/note-modal.component';
import { SharedNoteModalComponent } from './shared-note-modal/shared-note-modal.component';
import { DetailModalComponent } from './detail-modal/detail-modal.component'

import { NoteService } from '../../shared/services/note.service';
import { SharedService } from '../../shared/services/shared.service';
import { PersonsService } from '../../shared/services/persons.service';
import { GroupService } from '../../shared/services/group.service';

@NgModule({
  imports: [
    SharedModule,
    RoutingModule
  ],
  declarations: [
    EventNotebookComponent,
    NoteModalComponent,
    SharedNoteModalComponent,
    DetailModalComponent
  ],
  providers: [
    NoteService,
    SharedService,
    PersonsService,
    GroupService
  ]
})

export class EventNotebookModule { }
