import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyOptions } from 'mydatepicker-th';

import { ReportService } from '../../shared/services/report.service';
import { ExcelService } from "../../shared/services/excel.service";
import { mapPersons } from '../../shared/library/mapList';
import { PdfService } from "../../shared/services/pdf.service";
import * as moment from 'moment';

import * as jsPDF from "jspdf";
import "jspdf-autotable";

@Component({
  selector: 'app-report-using',
  templateUrl: './report-using.component.html',
  styleUrls: ['./report-using.component.css']
})
export class ReportUsingComponent implements OnInit {
  public searchform: FormGroup;

  public startDate;
  public endDate;
  public reportType = 1;
  public page = 1;

  reportList: any = [];

  multi: any[] = [];

  view: any[] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  customColors = [
    {
      name: 'france',
      value: '#0000ff'
    }
  ];

  autoScale = true;

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) {
  }

  async ngOnInit() {
    this.searchform = this.setSerachForm();
  }

  public async searchReport() {
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
    const result = (await this.reportService.getreportuserlog(data).toPromise()).data;
    this.reportList = result
    const temp = [];
    this.reportList.map(element => {
      temp.push({
        name: element.CreateDate,
        value: element.data.size
      });
    });
    this.multi = [...temp];

    this.xAxisLabel = 'วันที่';
    this.yAxisLabel = 'ผู้มาใช้ระบบ';
  }

  public setSerachForm() {
    return this.formBuilder.group({
      Name: [''],
      Status: [''],
      StartDate: [this.setDateEdit(new Date())],
      EndDate: [this.setDateEdit(new Date())]
    });
  }

  public groupData(data) {
    const groups = data.reduce(function(obj, item) {
      const customDate = item.CreateDate.split(' ');
      obj[customDate[0]] = obj[customDate[0]] || [];
      obj[customDate[0]].push(item);
      return obj;
    }, {});
    return Object.keys(groups).map(function(key) {
      return { CreateDate: key, data: groups[key] };
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
    const exportGroup = [];
    data.forEach(element => {
      exportGroup.push({
        "ชื่อผู้ใช้งาน": element.FullnameTh,
        "สถานะการทำงาน": element.UpdateMenu,
        "วันที่แก้ไข": moment(element.UpdateDate).format('DD/MM/YYYY'),
        "รายละเอียด": element.Detail
      });
    });
    return this.excelService.exportAsExcelFile(
      exportGroup,
      "report-using"
    );
  }

  public exportPDF(data) {
    //console.log(data);
    let exportGroup = [];
    data.forEach(element => {
      // element.ContactGroupId = value.ContactGroupId;
      exportGroup.push({
        FullnameTh: element.FullnameTh,
        UpdateMenu: element.UpdateMenu,
        UpdateDate: moment(element.UpdateDate).format('DD/MM/YYYY'),
        Detail: element.Detail,
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
        { title: "ชื่อผู้ใช้งาน", dataKey: "FullnameTh" },
        { title: "สถานะการทำงาน", dataKey: "UpdateMenu" },
        { title: "วันที่แก้ไข", dataKey: "UpdateDate" },
        { title: "รายละเอียด", dataKey: "Detail" }
      ],

      body: exportGroup
    });
    doc.save("report-using.pdf");
  }
}
