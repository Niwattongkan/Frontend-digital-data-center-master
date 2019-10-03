import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';
import { ExcelService } from "../../shared/services/excel.service";
import { ReportService } from '../../shared/services/report.service';

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
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService
  ) {
    this.searchform = this.setSerachForm();
  }

  async ngOnInit() {
    const result = (await this.reportService.getsearchcorporation().toPromise()).data;
    this.reportList = result ? mapPersons(result) : [];
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
    const result = ((await this.reportService.getreportcorporation(this.searchform.value).toPromise()).data);
    this.reportList = result ? mapPersons(result) : [];
  }

  public exportExcel(data) {
    console.log(data);
    let exportGroup = [];
    data.forEach(element => {
      exportGroup.push({
        "ชื่อองค์กร": element.CorporationName,
        "อยู่ภายใต้องค์กร": element.Parent,
        "บุคคลในองค์กร": element.FullnameTh,
        "ที่อยู่องค์กร": this.showAddress(element)
      });
    });
    return this.excelService.exportAsExcelFile(
      exportGroup,
      "searching-personal"
    );
  }


  public setSerachForm() {
    return this.formBuilder.group({
      CorporationName: [''],
      Parent: [''],
      FullnameTh: ['']
    });
  }
}
