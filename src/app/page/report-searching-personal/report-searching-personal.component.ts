import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';
import { ExcelService } from '../../shared/services/excel.service';
import { ReportService } from '../../shared/services/report.service';

import jsPDF from "jspdf";
 import "jspdf-autotable";
// import "jspdf-customfonts";
import { mapPersons } from "../../shared/library/mapList";


@Component({
  selector: 'app-report-searching-personal',
  templateUrl: './report-searching-personal.component.html',
  styleUrls: ['./report-searching-personal.component.css']
})
export class ReportSearchingPersonalComponent implements OnInit {
  public searchform: FormGroup;

  public reportType = 1;
  public page = 1;

  public reportList: any = [];

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService
  ) {
    this.searchform = this.setSerachForm();
  }

  async ngOnInit() {
    const result = (await this.reportService
      .getreportperson(this.searchform.value)
      .toPromise()).data;
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
    const result = (await this.reportService.getreportperson(this.searchform.value).toPromise()).data;
    this.reportList = mapPersons(result);

  }

  public setSerachForm() {
    return this.formBuilder.group({
      Name: [''],
      CorporationName: [''],
      StartYear: [new Date().getFullYear()],
      Position: ['ba']
    });
  }

  public convertObjDate(date) {
    return date.year + '-' + date.month + '-' + date.day;
  }

  public exportExcel(data) {
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
      'searching-personal'
    );
  }


  public exportPDF() {
    //console.log(data);
    // let exportGroup = [];
    // data.forEach(element => {
    //   // element.ContactGroupId = value.ContactGroupId;
    //   exportGroup.push({
    //     name: element.FullnameTh,
    //     Position: element.Position,
    //     Contact: element.Contact,
    //     Address: this.showAddress(element)
    //   });
    // });

    var doc = new jsPDF("p", "pt");
    // var doc = new jsPDF();
    //doc.addFileToVFS('Kanit-Regular.ttf','');
    //  doc.addFont('Kanit-Regular.ttf', 'custom', 'normal');
    ///doc.setFont('custom');
    // doc.text(15, 15, 'ภาษาไทย');
    const printContent = document.getElementById("printpdf")[0];
    doc.fromHTML(
      printContent,
      15,
      0.5);
      doc.save("searching-personal.pdf");
    

    // doc.autoTable({
    //   columns: [
    //     { header: "ชื่อ-นามสกุล", dataKey: "name" },
    //     { header: "ตำแหน่ง", dataKey: "Position" },
    //     { header: "เบอร์โทร", dataKey: "Contact" },
    //     { header: "ที่อยู่", dataKey: "Address" }
    //   ],
    //   body: exportGroup
    // });
  

  }
}
