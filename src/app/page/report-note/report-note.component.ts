import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';
// import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from '../../shared/services/excel.service';
import { mapPersons } from '../../shared/library/mapList';
import { PdfService } from '../../shared/services/pdf.service';
import { UsersService } from '../../shared/services/users.service';
import * as moment from 'moment';

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  
  public canExportReport = false;

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private usersService: UsersService
  ) {
    this.searchform = this.setSerachForm();
  }

  async ngOnInit() {
    this.spinner.show();
    const data = this.searchform.value;
    if (data.StartDate !== null) {
      data.StartDate = this.setDate(data.StartDate.date);
    } else {
      data.StartDate = '';
    }
    if (data.EndDate !== null) {
      data.EndDate = this.setDate(data.EndDate.date);
    } else {
      data.EndDate = '';
    }

    const result = (await this.reportService.getreportnote(data).toPromise())
      .data;
    this.reportList = mapPersons(result);
    this.canExportReport = this.usersService.canExportNoteReport();
    this.spinner.hide();
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
    this.spinner.show();
    const data = this.searchform.value;
    console.log(data);
    if (data.StartDate !== null) {
      data.StartDate = this.setDate(data.StartDate.date);
    } else {
      data.StartDate = '';
    }
    if (data.EndDate !== null) {
      data.EndDate = this.setDate(data.EndDate.date);
    } else {
      data.EndDate = '';
    }

    const result = (await this.reportService.getreportnote(data).toPromise())
      .data;
    this.reportList = mapPersons(result);
    this.spinner.hide();
  }

  public setSerachForm() {
    return this.formBuilder.group({

      CreateBy: [''],
      NoteName: [''],
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



  public exportExcel(data) {
    console.log(data);
    const exportGroup = [];
    data.forEach(element => {
      exportGroup.push({
        'ชื่อสมุดบันทึก': element.NoteName,
        'รายละเอียด': element.Description,
        'ชื่อบุคคล': element.FristNameTh,
         'วันที่สร้าง': moment(element.CreateDate).format('DD/MM/YYYY'),
      });
    });
    return this.excelService.exportAsExcelFile(
      exportGroup,
      'report-note'
    );
  }

  public exportPDF(data) {
    // console.log(data);
    const exportGroup = [];
    data.forEach(element => {
      // element.ContactGroupId = value.ContactGroupId;
      exportGroup.push({
        NoteName: element.NoteName,
        Description: element.Description,
        FristNameTh: element.FristNameTh,
        CreateDate: moment(element.CreateDate).format('DD/MM/YYYY'),
      });
    });

    let doc = new jsPDF('p', 'pt', 'a4');
    doc = this.pdfService.exportAsPdfile(doc);
    doc.setFont('Kanit-Regular');
     doc.setFontType('normal');
    doc.autoTable({
      styles: { font: 'Kanit-Regular', fontSize: 7 , columnWidth: 'auto'},
      headerStyles: { fontStyle: 'Kanit-Regular' },
      columns: [
        { title: 'ชื่อสมุดบันทึก', dataKey: 'NoteName' },
        { title: 'รายละเอียด', dataKey: 'Description' },
        { title: 'ชื่อบุคคล', dataKey: 'FristNameTh' },
        { title: 'วันที่สร้าง', dataKey: 'CreateDate' }
      ],

      body: exportGroup
    });
    doc.save('report-note.pdf');
  }
}
