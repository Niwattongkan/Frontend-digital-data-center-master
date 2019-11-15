import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'home-modal',
  templateUrl: './home-modal.component.html'
})
export class HomeModalComponent {

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
  }

  public closeModal() {
    this.modalService.dismissAll()
  }

  public removeModal() {
    this.modalService.dismissAll()
  }
}
