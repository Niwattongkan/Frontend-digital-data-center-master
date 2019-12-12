import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../../shared/services/program.service';
import { OrganizationService } from '../../../shared/services/organization.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { AuthlogService } from '../../../shared/services/authlog.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

  public programList: any = [];
  public inputSearch = '';
  ipAddress: any;
  constructor(
    private spinner: NgxSpinnerService,
    private programService: ProgramService,
    private organizationService: OrganizationService,
    private authlogService: AuthlogService,
    private http: HttpClient,
  ) { 
    this.http.get<{ ip: string }>('https://jsonip.com').subscribe(data => {this.ipAddress = data});
  }

  public mapProject(projectList) {
    projectList.map(async data => {

      const title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง';
      const first = data.FristNameTh;
      const last = data.LastNameTh;

      data.FullnameTh = first && last ? title + first + ' ' + last : '';
    });
    return projectList;
  }

  async ngOnInit() {
    this.spinner.show();
    this.programList = this.mapProject((await this.programService.getallproject().toPromise()).data)
    Array.prototype.push.apply(this.programList, this.mapProject((await this.programService.getallpurchase().toPromise()).data))
    this.spinner.hide()
  }

  public async onSearchData() {
    this.spinner.show();
    this.programList = this.mapProject((await this.programService.getallproject().toPromise()).data)
    Array.prototype.push.apply(this.programList, this.mapProject((await this.programService.getallpurchase().toPromise()).data))

    if (this.inputSearch != '') {
      this.programList = this.programList.filter(project => {
        return project.CorporationName.includes(this.inputSearch) ||
          project.ProjectName.includes(this.inputSearch) ||
          project.FullnameTh.includes(this.inputSearch)
      });
    }
    this.spinner.hide()
    await this.updateLog(this.inputSearch)
  }

  async updateLog(inputSearch){
    await this.auditLogService(inputSearch, '' , this.ipAddress)
 }

 async auditLogService(field, origin, ipAddress) {
  await this.authlogService.insertAuditlog({
    UpdateDate: new Date(),
    UpdateMenu: "ค้นหาข้อมูลโครงการ",
    UpdateField: field,
    DataOriginal: origin,
    IpAddress: ipAddress.ip
  }).toPromise()
}

}
