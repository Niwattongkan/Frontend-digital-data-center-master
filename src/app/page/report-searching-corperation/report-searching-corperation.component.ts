import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';
import { ExcelService } from "../../shared/services/excel.service";
import { ReportService } from '../../shared/services/report.service';
import { PdfService } from "../../shared/services/pdf.service";
import { OrganizationService } from '../../shared/services/organization.service';
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import { NgxSpinnerService } from "ngx-spinner";

import { mapPersons } from '../../shared/library/mapList';

@Component({
  selector: 'app-report-searching-corperation',
  templateUrl: './report-searching-corperation.component.html',
  styleUrls: ['./report-searching-corperation.component.css']
})
export class ReportSearchingCorperationComponent implements OnInit {

  public searchform: FormGroup;

  public startDate;
  public endDate;
  public reportType = 1;
  public page = 1;

  reportboard: any = [];
  reportList: any = [];

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private organizationService: OrganizationService,
  ) {
    this.searchform = this.setSerachForm();
  }

  async ngOnInit() {
    this.spinner.show();
    const result = (await this.reportService.getsearchcorporation().toPromise()).data;
    this.reportboard = (await this.organizationService.getserchcorporationcontact(result[1].CorporationId).toPromise()).data;
    this.reportList = result ? mapPersons(result) : [];
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
    const result = (await this.reportService.getreportcorporation(data).toPromise()).data;
    this.reportList = result ? mapPersons(result) : [];
    this.spinner.hide();

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
    this.spinner.show();
    let exportGroup = [];

    data.forEach(element => {
      exportGroup.push({
        'ชื่อองค์กร': element.CorporationName,
        'อยู่ภายใต้องค์กร': element.Parent,
        'บุคคลในองค์กร': element.FullnameTh,
        'ที่อยู่องค์กร': this.showAddress(element)
      });
    });
    this.spinner.hide();
    return this.excelService.exportAsExcelFile(
      exportGroup,
      'report-corporation'
    );

  }

  public exportPDF(data) {
    this.spinner.show();
    let exportGroup = [];
     data.forEach(element => {
      exportGroup.push({
        CorporationName: element.CorporationName,
        Parent: element.Parent,
        FullnameTh: element.FullnameTh,
        Address: this.showAddress(element)
      });
    });

    let doc = new jsPDF('p', 'pt', 'a4');
    doc = this.pdfService.exportAsPdfile(doc);
    doc.setFont('Kanit-Regular');
    doc.setFontType('normal');
    doc.autoTable({
      styles: {font: 'Kanit-Regular', fontSize: 7, columnWidth: 'auto'},
      headerStyles: {fontStyle: 'Kanit-Regular'},
      columns: [
        {title: 'ชื่อองค์กร', dataKey: 'CorporationName'},
        {title: 'อยู่ภายใต้องค์กร', dataKey: 'Parent'},
        {title: 'บุคคลในองค์กร', dataKey: 'FullnameTh'},
        {title: 'ที่อยู่องค์กร', dataKey: 'Address'}
      ],

      body: exportGroup
    });
    doc.save("report-corporation.pdf");
    this.spinner.hide();

  }

  public setSerachForm() {
    return this.formBuilder.group({
      CorporationName: [''],
      StartDate: [this.setStartDateEdit(new Date())],
      EndDate: [this.setEndDateEdit(new Date())]
    });
  }
  private setStartDateEdit(data) {
    const tempDate = new Date(data);
    return {
      date: {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth(),
        day: tempDate.getDate()
      }
    };
  }
  private setEndDateEdit(data) {
    const tempDate = new Date(data);
    return {
      date: {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        day: tempDate.getDate()
      }
    };
  }
}
