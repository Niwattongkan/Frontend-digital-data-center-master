import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { alertEvent, alertDeleteEvent } from '../../shared/library/alert';
import { NgxSpinnerService } from "ngx-spinner";
import { BoardService } from '../../shared/services/board.service';
import { PersonsService } from '../../shared/services/persons.service';
import { mapPersons, createdNamePersons } from '../../shared/library/mapList';
import { AuthlogService } from '../../shared/services/authlog.service';
import { UsersService } from '../../shared/services/users.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-setting-permission',
  templateUrl: './setting-permission.component.html',
  styleUrls: ['./setting-permission.component.css']
})
export class SettingPermissionComponent implements OnInit {

  public page: Number
  ipAddress:any;
  public boardList: any = [];
  public boardOrigin: any;
  public personList: any = [];

  public inputSearch = ""
  public headers: any = ['กลุ่มสิทธิ์', 'รายชื่อบุคคล', 'เครื่องมือ'];
  public canAddPermission = false;
  public canEditPermission= false;
  public canDeletePermission = false;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private boardService: BoardService,
    private personsService: PersonsService,
    private authlogService: AuthlogService,
    private usersService: UsersService,
    private http: HttpClient
  ) { 
    this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( data => {
   
      this.ipAddress = data
    })
  }

  async ngOnInit() {
    this.spinner.show()
    this.boardList = this.groupData(mapPersons((await this.boardService.getallboard().toPromise()).data))
    this.canAddPermission = this.usersService.canAddPermission();
    this.canEditPermission = this.usersService.canEditPermission();
    this.canDeletePermission = this.usersService.canDeletePermission();
    this.spinner.hide()
  }

  public groupData(data) {
    let groups = data.reduce(function (obj, item) {
      obj[item.BoardId] = obj[item.BoardId] || [];
      obj[item.BoardId].push(item);
      return obj;
    }, {});
    return Object.keys(groups).map(function (key) {
      return { BoardId: key, Person: groups[key] };
    });
  }

  public async onSearchData() {
    this.spinner.show()
    this.boardList = this.groupData(await mapPersons((await this.boardService.getallboard().toPromise()).data))
    if (this.inputSearch != '') {
      this.boardList = this.boardList.filter(data => {
        return data.Person[0].BoardName.includes(this.inputSearch)
      });
      this.spinner.hide()
      this.updateLogSearch(this.inputSearch);
    }
    this.spinner.hide()
  }

  async updateLog(note) {
    this.boardOrigin.GroupUserName != note.GroupUserName ? await this.auditLogService("ชื่อกลุ่มผู้ใช้งาน", this.boardOrigin.GroupUserName, note.GroupUserName,this.ipAddress) : null
  }

  async auditLogService(field, origin, update,ipAddress) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: "กลุ่มผู้ใช้งาน",
      UpdateField: field,
      DataOriginal: origin,
      UpdateData: update,
      IpAddress : ipAddress.ip
    }).toPromise()
  }


  openModal(content) {
    this.modalService.open(content);
  }

  async insertPermission(value) {
    let result = (await this.boardService.insertboard({
      BoardName: value.BoardName,
      StartDate: "2019-06-04 02:36:54.800",
      EndDate: "2019-06-04 02:36:54.800",
    }).toPromise()).data[0]
    await value.Person.forEach(async element => {
      let model = {
        PersonId: element.PersonId,
        BoardId: result.BoardId
      }
      await this.boardService.insertboardperson(model).toPromise()
    });
    alertEvent("บันทึกข้อมูลสำเร็จ", "success");
    this.boardList = await this.groupData(await mapPersons((await this.boardService.getallboard().toPromise()).data))

  }


  async editPermission(value) {
    await this.boardService.updateboard({
      BoardId: value.BoardId,
      BoardName: value.BoardName,
      IsActive :1,
      StartDate: "2019-06-04 02:36:54.800",
      EndDate: "2019-06-04 02:36:54.800",
    }).toPromise()

    await this.boardService.deletegroupboardperson(value.BoardId).toPromise()

    await value.Person.forEach(async element => {
      let model = {
        PersonId: element.PersonId,
        BoardId: value.BoardId
      }
      await this.boardService.insertboardperson(model).toPromise()
    });

    this.boardList = await this.groupData(await mapPersons((await this.boardService.getallboard().toPromise()).data))
    this.boardList = await this.groupData(await mapPersons((await this.boardService.getallboard().toPromise()).data))
    console.log(this.boardList)
  }

  delete(data) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        await this.boardService.deleteboard(data.BoardId).toPromise()
        this.boardList = this.groupData(await mapPersons((await this.boardService.getallboard().toPromise()).data))
        return alertEvent("ลบข้อมูลสำเร็จ", "success")
      }
    })
  }

  canEdit(BoardId){
    return this.canEditPermission && this.usersService.canAccessPermissionWithCurrentGroup(BoardId);
  }

  canDelete(BoardId){
    return this.canDeletePermission && this.usersService.canAccessPermissionWithCurrentGroup(BoardId);
  }

  async updateLogSearch(inputSearch) {
    var menu = 'ค้นหากลุ่มจำกัดสิทธิ์';
    await this.auditLogServiceSearch(inputSearch, menu, '', this.ipAddress)
  }
  async auditLogServiceSearch(field, menu, origin, ipAddress) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: menu,
      UpdateField: field,
      DataOriginal: origin,
      IpAddress: ipAddress.ip
    }).toPromise()
  }
}
