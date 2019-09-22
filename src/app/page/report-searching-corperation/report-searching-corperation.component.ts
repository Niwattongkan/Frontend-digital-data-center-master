import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';

import { ReportService } from '../../shared/services/report.service';

import { mapPersons } from '../../shared/library/mapList';

@Component({
  selector: 'app-report-searching-corperation',
  templateUrl: './report-searching-corperation.component.html',
  styleUrls: ['./report-searching-corperation.component.css']
})
export class ReportSearchingCorperationComponent implements OnInit {

  public searchform: FormGroup

  public startDate
  public endDate
  public reportType = 1
  public page = 1

  reportboard: any = []
  reportList: any = []

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
    let result = ((await this.reportService.getreportcorporation(this.searchform.value).toPromise()).data)
    this.reportList = result ? mapPersons(result) : []
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
    let result = ((await this.reportService.getreportcorporation(this.searchform.value).toPromise()).data)
    this.reportList = result ? mapPersons(result) : []
  }


  public setSerachForm() {
    return this.formBuilder.group({
      CorporationName: [""],
      StartYear: [new Date().getFullYear()],
      Position: [""],
    })
  }
}
