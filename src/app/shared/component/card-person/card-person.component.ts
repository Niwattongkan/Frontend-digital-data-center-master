import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import SimpleCrypto from "simple-crypto-js";
import { UsersService } from '../../services/users.service';
import { PersonsService } from '../../services/persons.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'card-person',
  templateUrl: './card-person.component.html',
  styleUrls: ['./card-person.component.css'],
})
export class CardPersonComponent implements OnInit {

  @Input() isCollapsed = true;
  @Input() Role: any[] = [];
  public cypeID
  public currentPath = '';
  public imagePerson = '';
  public image = './';
  public canEditPerson = false;
  public canDeletePerson = false;

  AddressList: any[] = [];
  PositionList: any[] = [];
  ContactList: any[] = [];


  @Input() data: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private usersService: UsersService,
    private personsService: PersonsService,
  ) { }

  ngOnInit() {
    let Crypto = new SimpleCrypto('some-unique-key');
    if (this.data) {
      this.cypeID = encodeURIComponent(Crypto.encrypt(this.data.PersonId))
      this.canEditPerson = this.usersService.canEditPerson();
      this.canDeletePerson = this.usersService.canDeletePerson();
    }
  }

  ngOnChanges() {
    this.currentPath = this.router.url;
    if (this.data) {
      this.data = this.setProfile(this.data);
      // this.data = await this.setProfile(this.enCypeId(this.data));
      this.imagePerson = 'https://tc.thaihealth.or.th:4122/uapi/ddc/getphotoperson?PersonId=' + this.data.PersonId;

      this.personsService.getAddressById(this.data.PersonId).subscribe(res => {
        if (!res.successful) return console.error(res.message);
        this.AddressList = res.data;
      });

      this.personsService.getworkperson(this.data.PersonId).subscribe(res => {
        if (!res.successful) return console.error(res.message);
        this.PositionList = res.data;
      });

      this.personsService.getcontactperson(this.data.PersonId).subscribe(res => {
        if (!res.successful) return console.error(res.message);
        this.ContactList = res.data;
      });

    }
  }

  public deletePerson(id) {
    this.onDelete.emit(id);
  }

  public getYear(year) {
    const date = new Date(year);
    return 'ปี ' + (date.getFullYear() + 543);
  }

  private setProfile(data) {
    const result = data;
    result.TitleNameTh = result.TitleNameTh == 1 ? 'นาย ' : result.TitleNameTh == 2 ? 'นางสาว ' : 'นาง';
    result.TitleNameEn = result.TitleNameEn == 1 ? 'Mr. ' : result.TitleNameEn == 2 ? 'Mrs. ' : 'Miss';
    result.Sex = result.Sex == 1 ? 'ชาย' : 'หญิง';
    result.Religion = result.Religion == 1 ? 'พุทธ' : result.Religion == 2 ? 'คริส' : 'อิสลาม';
    result.EthnicityId = result.EthnicityId == 1 ? 'ไทย' : 'ต่างชาติ';
    result.Marital = result.Marital == 1 ? 'โสด' : result.Marital == 2 ? 'แต่งงาน' : result.Marital == 3 ? 'หย่า' : 'เป็นหม้าย';
    return result;
  }

  public showAddress(value) {

    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? ' ชั้น ' + value.Floor + ' ' : '';
    const Room = value.Room ? ' ห้อง ' + value.Room + ' ' : '';
    const HouseNumber = value.HouseNumber ? ' เลขที่ ' + value.HouseNumber + ' ' : '';
    const Road = value.Road ? ' ถนน' + value.Road + ' ' : '';
    const Soi = value.Soi ? ' ซอย' + value.Soi + ' ' : '';

    if (value.Province == 'กรุงเทพมหานคร') {
      const Province = value.Province != '' ? ' ' + value.Province + ' ' : '';
      const Subdistrict = value.Subdistrict != '' ? ' แขวง' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'เขต' + value.District + '' : '';
      const Zipcode = value.Zipcode != '' ? ' ' + value.Zipcode + ' ' : '';
      return HouseNumber + Building + Floor + Room + Road + Soi + Subdistrict + District + Province + Zipcode;
    } else {
      const Province = value.Province != '' ? ' จังหวัด' + value.Province + '' : '';
      const Subdistrict = value.Subdistrict != '' ? 'ตำบล' + value.Subdistrict + ' ' : '';
      const District = value.District != '' ? 'อำเภอ' + value.District + '' : '';
      const Zipcode = value.Zipcode != '' ? ' ' + value.Zipcode + ' ' : '';
      return HouseNumber + Building + Floor + Room + Road + Soi + Subdistrict + District + Province + Zipcode;
    }
  }

  canEdit(personid) {
    let rs = this.Role.find(c => c.PersonId == personid);
    if (!rs) return true;
    else return false;
    // var ret = this.usersService.canAccessPersonWithCurrentGroup(personid);
    // if (ret) {
    //   if (checkNext !== null)
    //     return checkNext;
    // }
    // return ret;
  }
}
