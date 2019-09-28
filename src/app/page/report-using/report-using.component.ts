import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { IMyOptions } from "mydatepicker-th";

import { ReportService } from "../../shared/services/report.service";

import { mapPersons } from "../../shared/library/mapList";

@Component({
  selector: "app-report-using",
  templateUrl: "./report-using.component.html",
  styleUrls: ["./report-using.component.css"]
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
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  customColors = [
    {
      name: "france",
      value: "#0000ff"
    }
  ];

  autoScale = true;

  public myDatePickerOptions: IMyOptions = {
    dateFormat: "dd/mm/yyyy"
  };

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) {
    this.searchform = this.setSerachForm();
  }

  async ngOnInit() {}

  public async searchReport() {
    let data = this.searchform.value;

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
    let result = (await this.reportService.getreportuserlog(data).toPromise())
      .data;
    this.reportList = result ? this.groupData(result) : [];
    let temp = [];
    this.reportList.map(element => {
      temp.push({
        name: element.CreateDate,
        value: element.data.length
      });
    });
    this.multi = [...temp];

    this.xAxisLabel = "วันที่";
    this.yAxisLabel = "ผู้มาใช้ระบบ";
  }

  public setSerachForm() {
    return this.formBuilder.group({
      Name: [""],
      Status: [""],
      StartDate: [this.setDateEdit(new Date())],
      EndDate: [this.setDateEdit(new Date())]
    });
  }

  public groupData(data) {
    let groups = data.reduce(function(obj, item) {
      let customDate = item.CreateDate.split(" ");
      obj[customDate[0]] = obj[customDate[0]] || [];
      obj[customDate[0]].push(item);
      return obj;
    }, {});
    return Object.keys(groups).map(function(key) {
      return { CreateDate: key, data: groups[key] };
    });
  }

  private setDateEdit(data) {
    let tempDate = new Date(data);
    return {
      date: {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        day: tempDate.getDate()
      }
    };
  }
  public setDate(date) {
    let year = date.year;
    let month = "000" + date.month;
    let day = "000" + date.day;
    return (
      year +
      "-" +
      month.substr(month.length - 2, month.length) +
      "-" +
      day.substr(day.length - 2, day.length)
    );
  }
}
