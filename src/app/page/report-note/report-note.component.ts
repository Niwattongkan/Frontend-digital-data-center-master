import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';
// import * as moment from "moment";
import { ReportService } from '../../shared/services/report.service';

import { mapPersons } from '../../shared/library/mapList';

@Component({
  selector: 'app-report-note',
  templateUrl: './report-note.component.html',
  styleUrls: ['./report-note.component.css']
})
export class ReportNoteComponent implements OnInit {
  public searchform: FormGroup;
  public reportType = 1;
  public page = 1;

  public reportList: any = [];

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.searchform = this.setSerachForm();
  }

  async ngOnInit() {
    const data = this.searchform.value;

    if (data.StartDate !== null) {
      data.StartDate = this.setDate(data.StartDate.date);
    } else {
      data.StartDate = null;
    }
    if (data.EndDate !== null) {
      data.EndDate = this.setDate(data.EndDate.date);
    } else {
      data.EndDate = null;
    }

    const result = (await this.reportService.getreportnote(data).toPromise())
      .data;
    this.reportList = mapPersons(result);
  }

  public showAddress(value) {
    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const Room = value.Room ? 'ห้อง ' + value.Room + ' ' : '';
    const HouseNumber = value.HouseNumber
      ? 'เลขที่ ' + value.HouseNumber + ' '
      : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Province =
      value.Province != '' ? 'จังหวัด ' + value.Province + ' ' : '';
    const Subdistrict =
      value.Subdistrict != '' ? 'ตำบล/แขวง ' + value.Subdistrict + ' ' : '';
    const District =
      value.District != '' ? 'อำเภอ/เขต ' + value.District + ' ' : '';
    const Zipcode =
      value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
    return (
      Building +
      Floor +
      Room +
      HouseNumber +
      Road +
      Soi +
      Province +
      District +
      Subdistrict +
      Zipcode
    );
  }

  public async searchReport() {
    const data = this.searchform.value;
    console.log(data);
    if (data.StartDate !== null) {
      data.StartDate = this.setDate(data.StartDate.date);
    } else {
      data.StartDate = null;
    }
    if (data.EndDate !== null) {
      data.EndDate = this.setDate(data.EndDate.date);
    } else {
      data.EndDate = null;
    }

    const result = (await this.reportService.getreportnote(data).toPromise())
      .data;
    this.reportList = mapPersons(result);
    console.log(this.reportList.FullnameTh)
  }

  public setSerachForm() {
    return this.formBuilder.group({
      Name: [''],
      Notename: [''],
      StartDate: [this.setDateEdit(new Date())],
      EndDate: [this.setDateEdit(new Date())]
    });
  }

  private setDateEdit(data) {
    const tempDate = new Date(data);
    return {
      date: {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        day: tempDate.getDate()
      }
    };
  }

  public setDate(date) {
    const year = date.year;
    const month = '000' + date.month;
    const day = '000' + date.day;
    return (
      year +
      '-' +
      month.substr(month.length - 2, month.length) +
      '-' +
      day.substr(day.length - 2, day.length)
    );
  }
}
