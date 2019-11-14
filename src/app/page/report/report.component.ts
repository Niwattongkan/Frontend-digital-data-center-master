import { Component, OnInit } from '@angular/core';
import { IMyOptions } from 'mydatepicker-th';

import { ReportService } from '../../shared/services/report.service';

import { mapPersons } from '../../shared/library/mapList';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public startDate
  public endDate
  public reportType = 1
  public page = 1
  
  reportboard: any = []
  reportList: any = []

  multi: any[] = []

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
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(
    private reportService: ReportService
  ) { }

  async ngOnInit() {



  }

  public onSelect(e){

  }

  public searchReport(){

  }

  // public async searchReport() {
  //   switch (Number(this.reportType)) {
  //     case 1: {
  //       let result = ((await this.reportService.getreportperson(
  //         this.convertObjDate(this.startDate.date),
  //         this.convertObjDate(this.endDate.date)
  //       ).toPromise()).data)
  //       this.reportList = mapPersons(result)
  //       this.reportboard = result ? this.groupData(result) : []
  //       let temp = []
  //       this.reportboard.map(element => {
  //         temp.push({
  //           name: element.CreateDate,
  //           value: element.data.length,
  //         })
  //       });
  //       this.multi = [...temp]

  //       this.xAxisLabel = 'วันที่';
  //       this.yAxisLabel = 'ผู้มาใช้ระบบ';

  //       break;
  //     }
  //     case 2: {
  //       let result = ((await this.reportService.getreportboard(
  //         this.convertObjDate(this.startDate.date),
  //         this.convertObjDate(this.endDate.date)
  //       ).toPromise()).data)
  //       this.reportList = mapPersons(result)
  //       this.reportboard = result ? this.groupData(result) : []
  //       let temp = []
  //       this.reportboard.map(element => {
  //         temp.push({
  //           name: element.CreateDate,
  //           value: element.data.length,
  //         })
  //       });
  //       this.multi = [...temp]

  //       this.xAxisLabel = 'วันที่';
  //       this.yAxisLabel = 'ผู้มาใช้ระบบ';

  //       break;
  //     }
  //     case 3: {
  //       let result = (await this.reportService.getreportuserlog(
  //         this.convertObjDate(this.startDate.date),
  //         this.convertObjDate(this.endDate.date)
  //       ).toPromise()).data
  //       this.reportList = mapPersons(result)
  //       this.reportboard = result ? this.groupData(result) : []
  //       let temp = []
  //       this.reportboard.map(element => {
  //         temp.push({
  //           name: element.CreateDate,
  //           value: element.data.length,
  //         })
  //       });
  //       this.multi = [...temp]

  //       this.xAxisLabel = 'วันที่';
  //       this.yAxisLabel = 'ผู้มาใช้ระบบ';

  //       break;
  //     }
  //     case 4: {
  //       let result = (await this.reportService.getreportcontactgroup(
  //         this.convertObjDate(this.startDate.date),
  //         this.convertObjDate(this.endDate.date)
  //       ).toPromise()).data
  //       this.reportList = mapPersons(result)
  //       this.reportboard = result ? this.groupData(result) : []
  //       let temp = []
  //       this.reportboard.map(element => {
  //         temp.push({
  //           name: element.CreateDate,
  //           value: element.data.length,
  //         })
  //       });
  //       this.multi = [...temp]

  //       this.xAxisLabel = 'วันที่';
  //       this.yAxisLabel = 'ผู้มาใช้ระบบ';

  //       break;
  //     }

  //     case 5: {
  //       let result = (await this.reportService.getreportgroupuser(
  //         this.convertObjDate(this.startDate.date),
  //         this.convertObjDate(this.endDate.date)
  //       ).toPromise()).data
  //       this.reportList = mapPersons(result)
  //       this.reportboard = result ? this.groupData(result) : []
  //       let temp = []
  //       this.reportboard.map(element => {
  //         temp.push({
  //           name: element.CreateDate,
  //           value: element.data.length,
  //         })
  //       });
  //       this.multi = [...temp]

  //       this.xAxisLabel = 'วันที่';
  //       this.yAxisLabel = 'ผู้มาใช้ระบบ';

  //       break;
  //     }
  //   }
  // }


  public groupData(data) {
    let groups = data.reduce(function (obj, item) {
      let customDate = item.CreateDate.split(" ")
      obj[customDate[0]] = obj[customDate[0]] || [];
      obj[customDate[0]].push(item);
      return obj;
    }, {});
    return Object.keys(groups).map(function (key) {
      return { CreateDate: key, data: groups[key] };
    });
  }

  public convertObjDate(date) {
    return date.year + '-' + date.month + '-' + date.day
  }

}
