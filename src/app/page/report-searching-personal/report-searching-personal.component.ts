import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { IMyOptions } from "mydatepicker-th";
import { ExcelService } from "../../shared/services/excel.service";
import { ReportService } from "../../shared/services/report.service";
import { PdfService } from "../../shared/services/pdf.service";
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../../shared/services/users.service';

import * as jsPDF from "jspdf";
import "jspdf-autotable";

import { mapPersons } from "../../shared/library/mapList";

@Component({
  selector: "app-report-searching-personal",
  templateUrl: "./report-searching-personal.component.html",
  styleUrls: ["./report-searching-personal.component.css"]
})
export class ReportSearchingPersonalComponent implements OnInit {
  public searchform: FormGroup;

  public reportType = 1;
  public page = 1;

  public reportList: any = [];
  public searchresult: any
  public myDatePickerOptions: IMyOptions = {
    dateFormat: "dd/mm/yyyy"
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
    const result = (await this.reportService
      .getreportperson(this.searchform.value)
      .toPromise()).data;
    this.reportList = mapPersons(result);
    this.canExportReport = this.usersService.canExportSearchingPersonalReport();
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
    if (value.Province == 'กรุงเทพมหานคร') {
      const Subdistrict = value.Subdistrict != '' ? 'แขวง ' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'เขต ' + value.District + ' ' : '';
      const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
      return Building + Floor + Room + HouseNumber + Road + Soi + Subdistrict + District + Province +  Zipcode;
    } else {
      const Subdistrict = value.Subdistrict != '' ? 'ตำบล ' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'อำเภอ ' + value.District + ' ' : '';
      const Zipcode = value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
      return Building + Floor + Room + HouseNumber + Road + Soi + Subdistrict + District + Province +  Zipcode;
    }
  }

  public async searchReport() {
    this.spinner.show();
    const result = (await this.reportService
      .getreportperson(this.searchform.value)
      .toPromise()).data;
    // if(result){
    //   this.searchresult = result.filter(value => {
    //     return (String(value.FristNameTh)).includes(this.searchform.value) ||
    //       (String(value.LastNameTh)).includes(this.searchform.value) ||
    //       (String(value.FristNameEn)).includes(this.searchform.value) ||
    //       (String(value.LastNameEn)).includes(this.searchform.value) ||
    //       (String(value.CorporationName)).includes(this.searchform.value) ||
    //       (String(value.StartYear)).includes(this.searchform.value) ||
    //       (String(value.Position)).includes(this.searchform.value) ||
    //       (String(value.ProjectName)).includes(this.searchform.value) ||
    //       (String(value.ProjectNo)).includes(this.searchform.value)
    //   })
    //
    // }
    // this.reportList = mapPersons(this.searchresult);
     this.reportList = mapPersons(result);
    this.spinner.hide();
  }

  public setSerachForm() {
    return this.formBuilder.group({
      Name: [""],
      CorporationName: [""],
      StartYear: [new Date().getFullYear()],
      Position: [""],
      ProjectName: [""],
      ProjectNo: [""]
    });
  }

  public convertObjDate(date) {
    return date.year + "-" + date.month + "-" + date.day;
  }

  public exportExcel(data) {
    this.spinner.show();
    const exportGroup = [];
    data.forEach(element => {
      exportGroup.push({
        "ชื่อ-นามสกุล": element.FullnameTh,
        "ตำแหน่ง": element.Position,
        "เบอร์โทร": element.Contact,
        "ที่อยู่": this.showAddress(element)
      });
    });
    return this.excelService.exportAsExcelFile(
      exportGroup,
      "report-personal"
    );
    this.spinner.hide();
  }

  public exportPDF(data) {
    this.spinner.show();
    let exportGroup = [];
    data.forEach(element => {
      // element.ContactGroupId = value.ContactGroupId;
      exportGroup.push({
        name: element.FullnameTh,
        Position: element.Position,
        Contact: element.Contact,
        Address: this.showAddress(element)
      });
    });

    var doc = new jsPDF("p", "pt", "a4");
    doc = this.pdfService.exportAsPdfile(doc);
    doc.setFont("Kanit-Regular");
     doc.setFontType("normal");
    doc.autoTable({
      styles: { font: "Kanit-Regular", fontSize: 7 , columnWidth: 'auto'},
      headerStyles: { fontStyle: 'Kanit-Regular' },
      columns: [
        { title: "ชื่อ-นามสกุล", dataKey: "name" },
        { title: "ตำแหน่ง", dataKey: "Position" },
        { title: "เบอร์โทร", dataKey: "Contact" },
        { title: "ที่อยู่", dataKey: "Address" }
      ],

      body: exportGroup
    });
    doc.save("report-personal.pdf");
    this.spinner.hide();
  }

}
