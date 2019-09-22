import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NoteService } from '../../../shared/services/note.service';
import { PersonsService } from '../../../shared/services/persons.service';

import { mapPersons, createdNamePersons } from '../../../shared/library/mapList';

@Component({
  selector: 'detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {

  public noteList: any = []
  public personList: any = [];

  @Input() noteId: any;

  constructor(
    private modalService: NgbModal,
    private noteService: NoteService,
    private personsService: PersonsService
  ) { }

  async ngOnInit() {
    // this.personList = await mapPersons((await this.personsService.getPersonSearch('').toPromise()).data)
    let result = (await this.noteService.getDetailNote(this.noteId).toPromise()).data
    this.noteList = result ? mapPersons(result) : []
    console.log(this.noteList)
  }

  closeModal() {
    this.modalService.dismissAll()
  }
}
