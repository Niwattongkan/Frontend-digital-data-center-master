import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'forget-password-modal',
  templateUrl: './forget-password-modal.component.html',
  styleUrls: ['./forget-password-modal.component.css']
})
export class ForgetPasswordModalComponent implements OnInit {

  public alertUser = false;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }


  closeModal() {
    this.modalService.dismissAll()
  }
}
