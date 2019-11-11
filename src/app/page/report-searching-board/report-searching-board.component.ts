import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';
import { NgxSpinnerService } from "ngx-spinner";
import { ReportService } from '../../shared/services/report.service';

import { mapPersons } from '../../shared/library/mapList';
import { ExcelService } from '../../shared/services/excel.service';
import { PdfService } from '../../shared/services/pdf.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-report-searching-board',
  templateUrl: './report-searching-board.component.html',
  styleUrls: ['./report-searching-board.component.css']
})
export class ReportSearchingBoardComponent implements OnInit {

  public searchform: FormGroup;

  public reportType = 1;
  public page = 1;

  public reportList: any = [];
  public dorp
  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
    private pdfService: PdfService,
  ) {
    this.searchform = this.setSerachForm();
  }


  async ngOnInit() {
    this.spinner.show();
    const result = ((await this.reportService.getreportboard().toPromise()).data);
    this.reportList = mapPersons(result);
    this.dorp = mapPersons(result)
    this.spinner.hide();
  }

  public showAddress(value) {

    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const Room = value.Room ? 'ห้อง ' + value.Room + ' ' : '';
    const HouseNumber = value.HouseNumber ? 'เลขที่ ' + value.HouseNumber + ' ' : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Province = value.Province != '' ? 'จังหวัด ' + value.Province + ' ' : '';
    const Subdistrict = value.Subdistrict != '' ? 'ตำบล/แขวง ' + value.Subdistrict + ' ' : '';
    const District = value.District != '' ? 'อำเภอ/เขต ' + value.District + ' ' : '';
    const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
    return Building + Floor + Room + HouseNumber + Road + Soi + Province + District + Subdistrict + Zipcode;
  }

  public async searchReport() {
    this.spinner.show();
    if(this.searchform.value != ''){
      this.reportList = mapPersons((await this.reportService.getreportboard().toPromise()).data);
      let filter = this.reportList.filter(report => {
        return (String(report.BoardName)).includes(this.searchform.value.BoardName)
      })
      this.reportList = filter
    }

    this.spinner.hide();
  }

  public setSerachForm() {
    return this.formBuilder.group({
      BoardName: [''],
    });
  }

  public convertObjDate(date) {
    return date.year + '-' + date.month + '-' + date.day;
  }


  public exportExcel(data) {
    this.spinner.show();
    const exportGroup = [];
    data.forEach(element => {
      exportGroup.push({
        'ชื่อ-นามสกุล': element.FullnameTh,
        'ชื่อกลุ่ม': element.BoardName,
        'เบอร์โทร': element.Contact,
         'ที่อยู่': this.showAddress(element)
      });
    });
    return this.excelService.exportAsExcelFile(
      exportGroup,
      'report-board'
    );
    this.spinner.hide();
  }
  public exportPDF(data) {
    this.spinner.show();
    const exportGroup = [];
    data.forEach(element => {
      exportGroup.push({
        FullnameTh: element.FullnameTh,
        BoardName: element.BoardName,
        Contact: element.Contact,
        Address: this.showAddress(element)
      });
    });

    let doc = new jsPDF('p', 'pt', 'a4');
    doc = this.pdfService.exportAsPdfile(doc);
    doc.setFont('Kanit-Regular');
     doc.setFontType('normal');
     doc.autoTable({
      styles: { font: 'Kanit-Regular', fontSize: 7},
      headerStyles: { fontStyle: 'Kanit-Regular' },
      columnStyles: {
        0: {columnWidth: 100},
        1: {columnWidth: 60},
        2: {columnWidth: 'auto'},
        3: {columnWidth: 'auto'},
        // etc
      },
      columns: [
        { title: 'ชื่อ-นามสกุล', dataKey: 'FullnameTh' },
        { title: 'ชื่อกลุ่ม', dataKey: 'BoardName' },
        { title: 'เบอร์โทร', dataKey: 'Contact' },
        { title: 'ที่อยู่', dataKey: 'Address' }
      ],

      body: exportGroup
    });
    doc.save('report-board.pdf');
    this.spinner.hide();
  }

}
