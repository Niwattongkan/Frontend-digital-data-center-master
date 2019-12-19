import { Component, OnInit } from '@angular/core';
import { PersonsService } from '../../../shared/services/persons.service';
import { ExcelService } from "../../../shared/services/excel.service"
import { alertEvent, alertDeleteEvent } from '../../../shared/library/alert';
import { NgxSpinnerService } from "ngx-spinner";
import { UsersService } from '../../../shared/services/users.service';
import { HttpClient } from '@angular/common/http';
import { AuthlogService } from '../../../shared/services/authlog.service';
import { RoleService } from 'src/app/shared/services/role.service';
@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {

  public page: Number
  public personList: any = []
  public tempPersonList: any = []
  public inputSearch = ''
  public canAddPerson = false;
  roleId : any[];
  ipAddress: any;
  constructor(
    private personsService: PersonsService,
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private excelService: ExcelService,
    private authlogService: AuthlogService,
    private http: HttpClient,
    private role : RoleService
  ) {

    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {
        this.ipAddress = data
      });
  }

  ngOnInit() {
    this.spinner.show();
    this.role.getgroupuserisnull().toPromise().then(res => {
      if (!res.successful) alert(res.message);
      this.roleId = res.data;
    });
    this.canAddPerson = this.usersService.canAddPerson();
    this.spinner.hide();
  }

  mapPerson(personList) {
    this.personList = [];
    personList.forEach(async data => {
      let title = data.TitleNameTh == 1 ? 'นาย' : data.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
      let titleOrther = data.TitleNameOther != '' && data.TitleNameOther != null ? data.TitleNameOther : title
      let first = data.FristNameTh
      let last = data.LastNameTh

      let titleEn = data.TitleNameEn == 1 ? 'Mr.' : data.TitleNameEn == 2 ? 'Mrs.' : 'Miss.'
      let firstEn = data.FristNameEn
      let lastEn = data.LastNameEn

      data.FullnameTh = first && last ? titleOrther + first + ' ' + last : ''
      data.FullnameEn = firstEn && lastEn ? titleEn + firstEn + ' ' + lastEn : ''

      // this.personsService.getworkperson(data.PersonId).subscribe(res => {
      //   if (!res.successful) return console.error(res.message);
      //   data.PositionList = res.data;
      // });

      // this.personsService.getcontactperson(data.PersonId).subscribe(res => {
      //   if (!res.successful) return console.error(res.message);
      //   data.ContactList = res.data;
      // });

      // // data.PersonAddress = this.personsService.getAddressById(data.PersonId).subscribe(res => {
      // //   if (!res.successful) return console.error(res.message);
      // //   return res.data;
      // // });

      this.personList.push(data);
    });
  }




  onSearchData() {
    this.spinner.show();
    this.personsService.getallperson().toPromise().then(res => {
      if (!res.successful) return alert(res.message);
      let seachPerson = res.data.filter(person => {
        let title = person.TitleNameTh == 1 ? 'นาย' : person.TitleNameTh == 2 ? 'นางสาว' : 'นาง'
        return (String(person.FristNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.LastNameTh).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(title).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.FristNameEn).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.LastNameEn).toLocaleLowerCase()).includes(this.inputSearch.toLocaleLowerCase()) ||
          (String(person.Contact)).includes(this.inputSearch)
      });
      this.mapPerson(seachPerson);
      this.spinner.hide();
      this.updateLog(this.inputSearch);
      return this.page = 1
    });
  }

  public async delete(id) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {

        await this.personsService.deletePersonById(id).toPromise()
        this.personList = await this.mapPerson((await this.personsService.getallperson().toPromise()).data)

        return alertEvent("ลบข้อมูลสำเร็จ", "success")
      }
    })
  }

  async updateLog(inputSearch) {
    await this.auditLogService(inputSearch, '', this.ipAddress)
  }

  async auditLogService(field, origin, ipAddress) {
    await this.authlogService.insertAuditlog({
      UpdateDate: new Date(),
      UpdateMenu: "ค้นหาข้อมูลบุคคล",
      UpdateField: field,
      DataOriginal: origin,
      IpAddress: ipAddress.ip
    }).toPromise()
  }

  canEdit(url, checkNext = null) {
    /*var ret = this.usersService.canEdit(url)
    if (ret){
      if (checkNext !== null)
        return checkNext;
    }*/
    return this.canAddPerson;
  }

  public async  exportExcel() {
    this.spinner.show();
    let exportGroup = [];
    this.personList.forEach(element => {
      exportGroup.push({
        'PersonId': element.PersonId,
        'EthnicityId': element.EthnicityId,
        'TitleNameTh': element.TitleNameTh,
        'TitleNameOther': element.TitleNameOther,
        'FristNameTh': element.FristNameTh,
        'LastNameTh': element.LastNameTh,
        'TitleNameEn': element.TitleNameEn,
        'TitleNameEnOther': element.TitleNameEnOther,
        'FristNameEn': element.FristNameEn,
        'LastNameEn': element.LastNameEn,
        'IdCard': element.IdCard,
        'Birthday': element.Birthday,
        'Sex': element.Sex,
        'Passport': element.Passport,
        'WorkPermitNo': element.WorkPermitNo,
        'Marital': element.Marital,
        'Soldierly': element.Soldierly,
        'Religion': element.Religion,
        'Nationality': element.Nationality,
        'FavoriteFood': element.FavoriteFood,
        'AllergicFood': element.AllergicFood,
        'FoodDislike': element.FoodDislike,
        'CongenitalDisease': element.CongenitalDisease,
        'VehicleRegistrationNumber': element.VehicleRegistrationNumber,
        'OtherPreferences': element.OtherPreferences,
        'AllergicDrugs': element.AllergicDrugs,
        'PathPhoto': element.PathPhoto,
        'Username': element.Username,
      });
    });
    this.excelService.exportAsExcelFile(exportGroup, 'person');
    this.spinner.hide();
  }


}
