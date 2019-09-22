import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';

import { ReportService } from '../../shared/services/report.service';

import { mapPersons } from '../../shared/library/mapList';

@Component({
  selector: 'app-report-searching-personal',
  templateUrl: './report-searching-personal.component.html',
  styleUrls: ['./report-searching-personal.component.css']
})
export class ReportSearchingPersonalComponent implements OnInit {

  public searchform: FormGroup

  public reportType = 1
  public page = 1

  public reportList: any = []

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.searchform = this.setSerachForm()
  }

  async ngOnInit() {
    let result = ((await this.reportService.getreportperson(this.searchform.value).toPromise()).data)
    this.reportList = mapPersons(result)
  }

  public showAddress(value) {

    let Building = value.Building ? "อาคาร " + value.Building + " " : ""
    let Floor = value.Floor ? "ชั้น " + value.Floor + " " : ""
    let Room = value.Room ? "ห้อง " + value.Room + " " : ""
    let HouseNumber = value.HouseNumber ? "เลขที่ " + value.HouseNumber + " " : ""
    let Road = value.Road ? "ถนน " + value.Road + " " : ""
    let Soi = value.Soi ? "ซอย " + value.Soi + " " : ""
    let Province = value.Province != '' ? "จังหวัด " + value.Province + " " : ""
    let Subdistrict = value.Subdistrict != '' ? "ตำบล/แขวง " + value.Subdistrict + " " : ""
    let District = value.District != '' ? "อำเภอ/เขต " + value.District + " " : ""
    let Zipcode = value.Zipcode != '' ? "รหัสไปรษณีย์ " + value.Zipcode + " " : ""
    return Building + Floor + Room + HouseNumber + Road + Soi + Province + District + Subdistrict + Zipcode
  }
  
  public async searchReport() {
    let result = ((await this.reportService.getreportperson(this.searchform.value).toPromise()).data)
    this.reportList = mapPersons(result)
  }

  public setSerachForm() {
    return this.formBuilder.group({
      Name: [""],
      CorporationName: [null],
      StartYear: [new Date().getFullYear()],
      Position: [""],
    })
  }

  public convertObjDate(date) {
    return date.year + '-' + date.month + '-' + date.day
  }


}
