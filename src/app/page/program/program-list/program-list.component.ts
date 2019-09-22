import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../../shared/services/program.service';
import { OrganizationService } from '../../../shared/services/organization.service';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

  public programList: any = []
  public inputSearch = ''

  constructor(
    private programService: ProgramService,
    private organizationService: OrganizationService,
  ) { }

  public mapProject(projectList) {
    projectList.map(async data => {

      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
      let first = data.FristNameTh
      let last = data.LastNameTh

      data.FullnameTh = first && last ? title + first + ' ' + last : ''
    })
    return projectList
  }

  async ngOnInit() {
    this.programList = this.mapProject((await this.programService.getallproject().toPromise()).data)
    Array.prototype.push.apply(this.programList, this.mapProject((await this.programService.getallpurchase().toPromise()).data))
    console.log(this.programList)
  }

  public async onSearchData() {
    this.programList = this.mapProject((await this.programService.getallproject().toPromise()).data)
    Array.prototype.push.apply(this.programList, (await this.programService.getallpurchase().toPromise()).data)
    if (this.inputSearch != '') {
      this.programList = this.programList.filter(project => {
        return project.CorporationName.includes(this.inputSearch) ||
          project.ProjectName.includes(this.inputSearch) ||
          project.FristNameTh.includes(this.inputSearch) ||
          project.LastNameTh.includes(this.inputSearch)
      });
    }
  }
}
