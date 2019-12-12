import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {alertEvent, alertDeleteEvent} from '../../shared/library/alert';
import {NgxSpinnerService} from "ngx-spinner";
import {GroupUserService} from '../../shared/services/group-user.service';
import {AuthlogService} from '../../shared/services/authlog.service';
import {HttpClient} from '@angular/common/http';
import {mapPersons, createdNamePersons} from '../../shared/library/mapList';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'app-setting-users',
  templateUrl: './setting-users.component.html',
  styleUrls: ['./setting-users.component.css']
})
export class SettingUsersComponent implements OnInit {

  public headers: any = ['ชื่อผู้ใช้งาน', 'กลุ่มผู้ใช้งาน', 'กลุ่มสิทธิ์', 'เครื่องมือ'];
  public page: number;
  public groupUsersList: any = [];
  public groupUsersOrigin: any;
  public inputSearch = '';
  public canAddUser = false;
  public canEditUser = false;
  public canDeleteUser = false;
  ipAddress:any;
  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private groupUserService: GroupUserService,
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
    this.groupUsersList = mapPersons((await this.groupUserService.getallgroupuser().toPromise()).data);
    this.canAddUser = this.usersService.canAddUser();
    this.canEditUser = this.usersService.canEditUser();
    this.canDeleteUser = this.usersService.canDeleteUser();
    this.spinner.hide()
  }

  async onSearchData() {
    this.spinner.show()
    this.groupUsersList = mapPersons((await this.groupUserService.getallgroupuser().toPromise()).data);
    if (this.inputSearch != '') {
      this.groupUsersList = this.groupUsersList.filter(group => {
        return (String(group.FullnameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(group.GroupUserName).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(group.BoardName).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase());
      });
      this.spinner.hide()
      this.updateLogSearch(this.inputSearch);
    }
    this.spinner.hide()
    return this.page = 1;
  }

  // public groupData(data) {
  //   let groups = data.reduce(function (obj, item) {
  //     obj[item.GroupUserId] = obj[item.GroupUserId] || [];
  //     obj[item.GroupUserId].push(item);
  //     return obj;
  //   }, {});
  //   return Object.keys(groups).map(function (key) {
  //     return { GroupUserId: key, Person: groups[key] };
  //   });
  // }

  async updateLog(note) {
    this.groupUsersOrigin.Person[0].BoardName != note.BoardName ? await this.auditLogService('ชื่อกลุ่มสิทธิ์', this.groupUsersOrigin.Person[0].BoardName, note.BoardName,this.ipAddress) : null;
  }

  async auditLogService(field, origin, update,ipAddress) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: 'กลุ่มผู้ใช้งาน',
      UpdateField: field,
      DataOriginal: origin,
      UpdateData: update,
      IpAddress : ipAddress.ip
    }).toPromise();
  }

  public openModal(content, size) {
    this.modalService.open(content, {size: size});
  }

  public async insertGroupUser(data) {
    const result = (await this.groupUserService.insertgroupuser({GroupUserName: data.GroupUserName}).toPromise()).data[0];

    for (let index = 0; index < data.Person.length; index++) {
      const model = {
        GroupUserId: result.GroupUserId,
        PersonId: data.Person[index].PersonId,
        UpdateBy: 1,
        IsActive: 1
      };
      const resultPerson = (await this.groupUserService.insertgroupuserperson(model).toPromise()).data[0];
      await this.groupUserService.insertmanagegroup({
        GroupUserPersonalId: resultPerson.GroupUserPersonalId,
        BoardId: data.Person.BoardId,
        GroupUserId : result.GroupUserId,
        CreateBy: 1,
        UpdateBy:1,
        IsActive: 1
      }).toPromise();
    }
    alertEvent("บันทึกข้อมูลสำเร็จ", "success");
    this.groupUsersList = mapPersons((await this.groupUserService.getallgroupuser().toPromise()).data);
  }

  public async updateGroupUser(data) {
    const groupName = {
      GroupUserId: data.GroupUserId,
      GroupUserName: data.GroupUserName,
   //   CreateDate: '2019-05-31 08:08:04'
    };
    // await this.updateLog(data)
    await this.groupUserService.updategroupuser(groupName).toPromise();
    var UpdateBy = this.usersService.getUserInfo().email;
    for (let index = 0; index < data.Person.length; index++) {
      const model = {
        GroupUserId: data.GroupUserId,
        GroupUserName: data.GroupUserName,
        BoardId : data.BoardId,
        UpdateBy: UpdateBy,
        IsActive: 1
      };
      await this.groupUserService.updategroupuser(model).toPromise();
      await this.groupUserService.updatemanagegroup(model).toPromise();
    }

    this.groupUsersList = mapPersons((await this.groupUserService.getallgroupuser().toPromise()).data);
  }

  editGroupUser() {

  }

  delete(data) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        await this.groupUserService.deletegroupuser(data.GroupUserId, '').toPromise();
        await this.groupUserService.deletegroupuserperson(data.GroupUserPersonalId).toPromise();
        this.groupUsersList = mapPersons((await this.groupUserService.getallgroupuser().toPromise()).data);
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  canEdit(GroupUserId){
    return this.canEditUser && this.usersService.canAccessUserWithCurrentGroup(GroupUserId);
  }

  canDelete(GroupUserId){
    return this.canDeleteUser && this.usersService.canAccessUserWithCurrentGroup(GroupUserId);
  }

  async updateLogSearch(inputSearch) {
    var menu = 'ค้นหากลุ่มผู้ใช้งาน';
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
