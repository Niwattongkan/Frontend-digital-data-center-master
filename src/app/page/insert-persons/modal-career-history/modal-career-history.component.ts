import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { validForm } from '../../../shared/library/form';
import { convertDateToString } from '../../../shared/library/date';

import { OrganizationService } from '../../../shared/services/organization.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'modal-career-history',
  templateUrl: './modal-career-history.component.html',
  styleUrls: ['./modal-career-history.component.css']
})
export class ModalCareerHistoryComponent implements OnInit {

  @Input() data: any;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  public alertValid = false
  public careerForm: FormGroup

  public corporationList: any = []

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };


  constructor(
    private organizationService: OrganizationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
  ) {
    this.careerForm = this.setCareer(null)
  }

  async ngOnInit() {
    this.corporationList = (await this.organizationService.getOrganizationAll().toPromise()).data
    this.careerForm = this.data ? this.setCareer(this.data) : this.setCareer(null)
  }

  private setCareer(data) {
    return data ? this.formBuilder.group({
      WorkId: [data.WorkId],
      StartDate: [this.setDateEdit(data.StartMonth), [Validators.required]],
      EndDate: [this.setDateEdit(data.EndMonth), [Validators.required]],
      Position: [data.Position],
      CorporationId: [data.CorporationId],
      CorporationName: [data.CorporationName],
    })
      : this.formBuilder.group({
        StartDate: [this.setDateEdit(new Date()), [Validators.required]],
        EndDate: [this.setDateEdit(new Date()), [Validators.required]],
        Position: [""],
        CorporationId: [""],
        CorporationName :[""]
      })
  }

  private setDateEdit(data) {
    let tempDate = new Date(data)
    return {
      date: {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        day: tempDate.getDate(),
      }
    }
  }

  private setDate(data) {
    let date = data.date
    let year = date.year
    let month = ("000" + date.month)
    let day = ("000" + date.day)
    return year + "-" + month.substr(month.length - 2, month.length) + "-" + day.substr(day.length - 2, day.length)
  }

  submit() {
    if (validForm(this.careerForm).length > 0) {
      this.alertValid = true;
      return;
    }
    let model = {
      WorkId: this.careerForm.value.WorkId,
      StartMonth: this.setDate(this.careerForm.get('StartDate').value),
      StartYear: this.setDate(this.careerForm.get('StartDate').value),
      EndMonth: this.setDate(this.careerForm.get('EndDate').value),
      EndYear: this.setDate(this.careerForm.get('EndDate').value),
      Position: this.careerForm.value.Position,
      CorporationId: this.careerForm.value.CorporationId,
      CorporationName: this.careerForm.value.CorporationName
    }
    model.WorkId ? null : delete model.WorkId,

    this.onSubmit.emit(model)
    return this.modalService.dismissAll()
  }

  closeModal() {
    if (this.careerForm.dirty)
      Swal.fire({
        title: '',
        text: 'ต้องการบันทึกข้อมูลหรือไม่',
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        reverseButtons: true
      }).then(async result => {
        if (!result.value) {
          return this.modalService.dismissAll();
        }
      });
    else {
      return this.modalService.dismissAll();
    }
  }

}
