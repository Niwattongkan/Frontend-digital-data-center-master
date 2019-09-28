import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { IMyOptions } from "mydatepicker-th";
import { ExcelService } from "../../shared/services/excel.service";
import { ReportService } from "../../shared/services/report.service";

import jsPDF from "jspdf";
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

  public myDatePickerOptions: IMyOptions = {
    dateFormat: "dd/mm/yyyy"
  };

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService
  ) {
    this.searchform = this.setSerachForm();
  }

  async ngOnInit() {
    let result = (await this.reportService
      .getreportperson(this.searchform.value)
      .toPromise()).data;
    this.reportList = mapPersons(result);
  }

  public showAddress(value) {
    let Building = value.Building ? "อาคาร " + value.Building + " " : "";
    let Floor = value.Floor ? "ชั้น " + value.Floor + " " : "";
    let Room = value.Room ? "ห้อง " + value.Room + " " : "";
    let HouseNumber = value.HouseNumber
      ? "เลขที่ " + value.HouseNumber + " "
      : "";
    let Road = value.Road ? "ถนน " + value.Road + " " : "";
    let Soi = value.Soi ? "ซอย " + value.Soi + " " : "";
    let Province =
      value.Province != "" ? "จังหวัด " + value.Province + " " : "";
    let Subdistrict =
      value.Subdistrict != "" ? "ตำบล/แขวง " + value.Subdistrict + " " : "";
    let District =
      value.District != "" ? "อำเภอ/เขต " + value.District + " " : "";
    let Zipcode =
      value.Zipcode != "" ? "รหัสไปรษณีย์ " + value.Zipcode + " " : "";
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
    let result = (await this.reportService
      .getreportperson(this.searchform.value)
      .toPromise()).data;
    this.reportList = mapPersons(result);
  }

  public setSerachForm() {
    return this.formBuilder.group({
      Name: [""],
      CorporationName: [""],
      StartYear: [new Date().getFullYear()],
      Position: [""]
    });
  }

  public convertObjDate(date) {
    return date.year + "-" + date.month + "-" + date.day;
  }

  public exportExcel(data) {
    console.log(data);
    let exportGroup = [];
    data.forEach(element => {
      exportGroup.push({
        "ชื่อ-นามสกุล": element.FullnameTh,
        ตำแหน่ง: element.Position,
        เบอร์โทร: element.Contact,
        ที่อยู่: this.showAddress(element)
      });
    });
    return this.excelService.exportAsExcelFile(
      exportGroup,
      "searching-personal"
    );
  }

  public exportPDF(data) {
    console.log(data);
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

    var doc = new jsPDF("p", "pt");
    doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
    doc.setFont('Comic Sans');
    doc.autoTable({
      columns: [
        { header: "ชื่อ-นามสกุล", dataKey: "name" },
        { header: "ตำแหน่ง", dataKey: "Position" },
        { header: "เบอร์โทร", dataKey: "Contact" },
        { header: "ที่อยู่", dataKey: "Address" }
      ],
      body: exportGroup
    });
    doc.save("searching-personal.pdf");
  }
}
