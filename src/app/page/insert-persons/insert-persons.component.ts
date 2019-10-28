import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyOptions } from 'mydatepicker-th';
import Stepper from 'bs-stepper';

import { OrganizationService } from '../../shared/services/organization.service';
import { PersonsService } from '../../shared/services/persons.service';
import { DropdownService } from '../../shared/services/dropdown.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AuthlogService } from '../../shared/services/authlog.service';
import { mapPersons, groupbyList } from '../../shared/library/mapList';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { alertEvent, alertDeleteEvent } from '../../shared/library/alert';
import { calulateAge } from '../../shared/library/date';
import { validForm } from '../../shared/library/form';

@Component({
  selector: 'app-insert-persons',
  templateUrl: './insert-persons.component.html',
  styleUrls: ['./insert-persons.component.css']
})
export class InsertPersonsComponent implements OnInit {
  public alertValid = false;
  public mode = '';
  public title = '';

  public profileForm: FormGroup;
  public profileOriginForm: any;

  public personId = null;
  public imagePreview = null;
  public imageProfile = null;

  public corperationList = [];

  public notNext: any;
  public addressList = [];
  public familyList = [];
  public contactList = [];
  public coordinateList = [];
  public bursaryList = [];
  public workingList = [];
  public academyList = [];
  public imagePerson = '';
  public nametitle = [];

 // checkTitleTh = '';
  // checkTitleEn = '';
  titleNameThCheck = false;
  titleNameEnCheck = false;

  // customCheck = false;
  // customCheck1 = false;
  public imagePath: any;
  public imgURL: any;

  public myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

  private stepper: Stepper;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private personsService: PersonsService,
    private dropdownService: DropdownService,
    private organizationService: OrganizationService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authlogService: AuthlogService
  ) {
    this.profileForm = this.setProfile(null);
    this.profileOriginForm = this.profileForm.value;
    this.personId = this.activatedRoute.snapshot.paramMap.get('id');
    this.mode = this.personId ? 'Edit' : 'Insert';
    this.title = this.personId ? 'แก้ไขข้อมูลบุคคล' : 'เพิ่มข้อมูลบุคคล';
  }

  async ngOnInit() {
    this.spinnerService.show();

    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });

    const resultPerson = this.personId
      ? (await this.personsService.getDetailById(this.personId).toPromise())
          .data[0]
      : null;

    this.corperationList = (await this.organizationService
      .getOrganizationAll()
      .toPromise()).data;
    this.profileOriginForm = resultPerson ? resultPerson : null;
    this.profileForm = await this.setProfile(resultPerson);
    this.personId ? await this.setList() : null;
    this.academyList = (await this.dropdownService
      .getacademyAll()
      .toPromise()).data;
    const resultImage = this.personId
      ? (this.imagePerson =
          'http://qdoc.ecmxpert.com:8008/api/uapi/q/ddc/getphotoperson?PersonId=' +
          this.personId)
      : null;
    this.imagePreview = resultImage ? resultImage[0] : null;
    this.spinnerService.hide();
    if (
      this.profileForm.value['TitleNameOther'] !== null &&
      this.profileForm.value['TitleNameOther'] !== ''
    ) {
    //  this.checkTitleTh = 'checked';
      this.titleNameThCheck = true;
    } else {
    //  this.checkTitleTh = '';
      this.titleNameThCheck = false;
    }

    if (
      this.profileForm.value['TitleNameEnOther'] !== null &&
      this.profileForm.value['TitleNameEnOther'] !== ''
    ) {
    //  this.checkTitleEn = 'checked';
      this.titleNameEnCheck = true;
    } else {
     // this.checkTitleEn = '';
      this.titleNameEnCheck = false;
    }
    this.notNext = 1;
  }

  get getIdCard() {
    return this.profileForm.get('email');
  }

  public async submitPerson() {
    this.spinnerService.show();

    if (validForm(this.profileForm).length > 0) {
      this.spinnerService.hide();
      this.alertValid = true;
      return window.scroll(0, 300);
    }

    this.profileForm.value['Birthday'] = this.setDate(
      this.profileForm.value.Birthday
    );
    this.profileForm.value['Birthday'] = this.setDate(
      this.profileForm.value.Birthday
    );
    if (this.personId) {
      await this.personsService
        .updatePerson(this.profileForm.value)
        .toPromise();
      this.updateLog(this.profileForm.value);
    } else {
      const person = (await this.personsService
        .insertPerson(this.profileForm.value)
        .toPromise()).data[0];
      this.insertPerson(person);
    }
    this.spinnerService.hide();
    alertEvent('บันทึกข้อมูลสำเร็จ', 'success');

    return this.router.navigate(['/persons']);
  }

  public async insertPerson(person) {
    if (person.PersonId) {
      for (let i = 0; i < this.addressList.length; i++) {
        this.addressList[i].PersonId = Number(person.PersonId);
        await this.personsService
          .insertPersonAddress(this.addressList[i])
          .toPromise();
      }
      for (let i = 0; i < this.contactList.length; i++) {
        this.contactList[i].PersonId = Number(person.PersonId);
        await this.personsService
          .insertPersonContact(this.contactList[i])
          .toPromise();
      }
      for (let i = 0; i < this.workingList.length; i++) {
        this.workingList[i].PersonId = Number(person.PersonId);
        await this.personsService.insertWork(this.workingList[i]).toPromise();
      }
      for (let i = 0; i < this.bursaryList.length; i++) {
        this.bursaryList[i].PersonId = Number(person.PersonId);
        await this.personsService
          .inserteducation(this.bursaryList[i])
          .toPromise();
      }
      for (let i = 0; i < this.familyList.length; i++) {
        this.familyList[i].PersonId = Number(person.PersonId);
        await this.personsService.insertFamily(this.familyList[i]).toPromise();
      }
      for (let i = 0; i < this.coordinateList.length; i++) {
        this.coordinateList[i].PersonId = Number(person.PersonId);
        await this.personsService
          .insertCoordinator(this.coordinateList[i])
          .toPromise();
      }
    }
  }

  async updateLog(person) {
    const currentMenu = 'เพิ่ม/แก้ไข ข้อมูลบุคคล';
    this.profileOriginForm.TitleNameTh != person.TitleNameTh
      ? await this.auditLogService(
          currentMenu,
          'คำนำหน้าชื่อ (ไทย)',
          this.profileOriginForm.TitleNameTh,
          person.TitleNameTh
        )
      : null;
    this.profileOriginForm.FristNameTh != person.FristNameTh
      ? await this.auditLogService(
          currentMenu,
          'ชื่อ (ไทย)',
          this.profileOriginForm.FristNameTh,
          person.FristNameTh
        )
      : null;
    this.profileOriginForm.LastNameTh != person.LastNameTh
      ? await this.auditLogService(
          currentMenu,
          'นามสกุล (ไทย)',
          this.profileOriginForm.LastNameTh,
          person.LastNameTh
        )
      : null;
    this.profileOriginForm.TitleNameEn != person.TitleNameEn
      ? await this.auditLogService(
          currentMenu,
          'คำนำหน้าชื่อ (อังกฤษ)',
          this.profileOriginForm.TitleNameEn,
          person.TitleNameEn
        )
      : null;
    this.profileOriginForm.FristNameEn != person.FristNameEn
      ? await this.auditLogService(
          currentMenu,
          'ชื่อ (อังกฤษ)',
          this.profileOriginForm.FristNameEn,
          person.FristNameEn
        )
      : null;
    this.profileOriginForm.LastNameEn != person.LastNameEn
      ? await this.auditLogService(
          currentMenu,
          'นามสกุล (อังกฤษ)',
          this.profileOriginForm.LastNameEn,
          person.LastNameEn
        )
      : null;
    this.profileOriginForm.IdCard != person.IdCard
      ? await this.auditLogService(
          currentMenu,
          'เลขบัตรประจำตัวประชาชน',
          this.profileOriginForm.IdCard,
          person.IdCard
        )
      : null;
    this.profileOriginForm.Passport != person.Passport
      ? await this.auditLogService(
          currentMenu,
          'เลขหนังสือเดินทาง',
          this.profileOriginForm.Passport,
          person.Passport
        )
      : null;
    this.profileOriginForm.WorkPermitNo != person.WorkPermitNo
      ? await this.auditLogService(
          currentMenu,
          'ใบอนุญาตเลขที่',
          this.profileOriginForm.WorkPermitNo,
          person.WorkPermitNo
        )
      : null;
    this.profileOriginForm.Birthday != person.Birthday
      ? await this.auditLogService(
          currentMenu,
          'วันเกิด',
          this.profileOriginForm.Birthday,
          person.Birthday
        )
      : null;
    this.profileOriginForm.Sex != person.Sex
      ? await this.auditLogService(
          currentMenu,
          'เพศ',
          this.profileOriginForm.Sex,
          person.Sex
        )
      : null;
    this.profileOriginForm.Religion != person.Religion
      ? await this.auditLogService(
          currentMenu,
          'ศาสนา',
          this.profileOriginForm.Religion,
          person.Religion
        )
      : null;
    this.profileOriginForm.Nationality != person.Nationality
      ? await this.auditLogService(
          currentMenu,
          'สัญชาติ',
          this.profileOriginForm.Nationality,
          person.Nationality
        )
      : null;
    this.profileOriginForm.EthnicityId != person.EthnicityId
      ? await this.auditLogService(
          currentMenu,
          'เชื้อชาติ',
          this.profileOriginForm.EthnicityId,
          person.EthnicityId
        )
      : null;
    this.profileOriginForm.Marital != person.Marital
      ? await this.auditLogService(
          currentMenu,
          'สถานภาพการสมรส',
          this.profileOriginForm.Marital,
          person.Marital
        )
      : null;
    this.profileOriginForm.FavoriteFood != person.FavoriteFood
      ? await this.auditLogService(
          currentMenu,
          'อาหารที่ชอบ',
          this.profileOriginForm.FavoriteFood,
          person.FavoriteFood
        )
      : null;
    this.profileOriginForm.FoodDislike != person.FoodDislike
      ? await this.auditLogService(
          currentMenu,
          'อาหารที่ไม่ชอบ',
          this.profileOriginForm.FoodDislike,
          person.FoodDislike
        )
      : null;
    this.profileOriginForm.AllergicFood != person.AllergicFood
      ? await this.auditLogService(
          currentMenu,
          'อาหารที่แพ้',
          this.profileOriginForm.AllergicFood,
          person.AllergicFood
        )
      : null;
    this.profileOriginForm.CongenitalDisease != person.CongenitalDisease
      ? await this.auditLogService(
          currentMenu,
          'โรคประจำตัว',
          this.profileOriginForm.CongenitalDisease,
          person.CongenitalDisease
        )
      : null;
    this.profileOriginForm.AllergicDrugs != person.AllergicDrugs
      ? await this.auditLogService(
          currentMenu,
          'ยาที่แพ้',
          this.profileOriginForm.AllergicDrugs,
          person.AllergicDrugs
        )
      : null;
    this.profileOriginForm.VehicleRegistrationNumber !=
    person.VehicleRegistrationNumber
      ? await this.auditLogService(
          currentMenu,
          'ทะเบียนรถ',
          this.profileOriginForm.VehicleRegistrationNumber,
          person.VehicleRegistrationNumber
        )
      : null;
    this.profileOriginForm.OtherPreferences != person.OtherPreferences
      ? await this.auditLogService(
          currentMenu,
          'อื่นๆ',
          this.profileOriginForm.OtherPreferences,
          person.OtherPreferences
        )
      : null;
  }

  async auditLogService(menu, field, origin, update) {
    await this.authlogService
      .insertAuditlog({
        UpdateDate: new Date(),
        UpdateMenu: menu,
        UpdateField: field,
        DataOriginal: origin,
        UpdateData: update
      })
      .toPromise();
  }

  private setDate(data) {
    const date = data.date;
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

  public back() {
    return this.router.navigate(['/persons']);
  }

  public openModal(content, size) {
    return this.modalService.open(content, { size: size });
  }

  public openModalClass(content) {
    return this.modalService.open(content, { windowClass: 'xlModal' });
  }

  selectNewAvatar() {
    console.log('new');
  }

  public showAge(data) {
    const convert = data.date
      ? new Date(data.date.year, data.date.month, data.date.day, 0, 0, 0, 0)
      : null;
    return convert ? (calulateAge(convert) ? calulateAge(convert) : 0) : 0;
  }

  public showAddress(value) {
    const Building = value.Building ? 'อาคาร ' + value.Building + ' ' : '';
    const Floor = value.Floor ? 'ชั้น ' + value.Floor + ' ' : '';
    const Room = value.Room ? 'ห้อง ' + value.Room + ' ' : '';
    const HouseNumber = value.HouseNumber
      ? 'เลขที่ ' + value.HouseNumber + ' '
      : '';
    const Road = value.Road ? 'ถนน ' + value.Road + ' ' : '';
    const Soi = value.Soi ? 'ซอย ' + value.Soi + ' ' : '';
    const Province =
      value.Province != '' ? 'จังหวัด ' + value.Province + ' ' : '';
    const Subdistrict =
      value.Subdistrict != '' ? 'ตำบล/แขวง ' + value.Subdistrict + ' ' : '';
    const District =
      value.District != '' ? 'อำเภอ/เขต ' + value.District + ' ' : '';
    const Zipcode =
      value.Zipcode != '' ? 'รหัสไปรษณีย์ ' + value.Zipcode + ' ' : '';
    return (
      Building +
      Floor +
      Room +
      HouseNumber +
      Road +
      Soi +
      Province +
      District +
      Subdistrict +
      Zipcode
    );
  }

  public async deleteAddress(index) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        if (this.personId) {
          const model = this.addressList[index];
          model.PersonId = Number(this.personId);
          model.PersonAddressId
            ? await this.personsService
                .deletepersonaddress(model.PersonAddressId)
                .toPromise()
            : false;
        }
        this.addressList.splice(index, 1);
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  public async updateAddress(value) {
    if (value.PersonAddressId) {
      const model = value;
      model.PersonId = Number(this.personId);
      model.TypeAddress = Number(value.TypeAddress);
      await this.personsService.updatePersonAddress(model).toPromise();
      this.addressList = (await this.personsService
        .getAddressById(this.personId)
        .toPromise()).data;
    } else {
      if (this.personId) {
        value.PersonId = Number(this.personId);
        await this.personsService.insertPersonAddress(value).toPromise();
        alertEvent('บันทึกข้อมูลสำเร็จ', 'success');
      }
      this.addressList.push(value);
    }
  }

  public async deleteFamily(index) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        if (this.personId) {
          const model = this.familyList[index];
          model.PersonId = Number(this.personId);
          model.FamilyId
            ? await this.personsService.deletefamily(model.FamilyId).toPromise()
            : false;
        }
        this.familyList.splice(index, 1);
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  public async updateFamily(value) {
    if (value.FamilyId) {
      const model = value;
      model.PersonId = Number(this.personId);
      await this.personsService.updateFamily(model).toPromise();
      this.familyList = (await this.personsService
        .getFamilyById(this.personId)
        .toPromise()).data;
    } else {
      if (this.personId) {
        value.PersonId = Number(this.personId);
        const result = (await this.personsService
          .insertFamily(value)
          .toPromise()).data;
        alertEvent('บันทึกข้อมูลสำเร็จ', 'success');
        this.familyList.push(value);
      }
    }
  }

  public async deleteContact(index) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        if (this.personId) {
          const model = this.contactList[index];
          model.PersonId = Number(this.personId);
          model.PersonContactId
            ? await this.personsService
                .deletepersoncontact(model.PersonContactId)
                .toPromise()
            : false;
        }
        this.contactList.splice(index, 1);
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  public async insertContact(value) {
    if (this.personId) {
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        element.PersonId = Number(this.personId);
        await this.personsService.insertPersonContact(element).toPromise();
      }
      alertEvent('บันทึกข้อมูลสำเร็จ', 'success');
    }
    Array.prototype.push.apply(this.contactList, value);
    // this.contactList = value
  }

  public async updateContact(value) {

  }
  public async deleteCoordinator(index) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        if (this.personId) {
          const model = this.coordinateList[index];
          model.PersonId = Number(this.personId);
          model.CoordinatorId
            ? await this.personsService
                .deletecoordinator(model.CoordinatorId)
                .toPromise()
            : false;
        }
        this.coordinateList.splice(index, 1);
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  public async updateCoordinator(value) {
    if (this.personId) {
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        element.PersonId = Number(this.personId);
        const coordinate = (await this.personsService
          .insertCoordinator(element)
          .toPromise()).data[0];
        element.CoordinatorId = coordinate.CoordinatorId;
        await this.personsService.insertcoordinatorcantact(element).toPromise();
      }
      alertEvent('บันทึกข้อมูลสำเร็จ', 'success');
    }
    Array.prototype.push.apply(this.coordinateList, value);
  }

  public async deleteBursary(index) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        if (this.personId) {
          const model = this.bursaryList[index];
          model.PersonId = Number(this.personId);
          model.EducationId
            ? await this.personsService
                .deleteducation(model.EducationId)
                .toPromise()
            : false;
        }
        this.bursaryList.splice(index, 1);
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  public async updateBursary(value) {
    if (value.EducationId) {
      const model = value;
      model.PersonId = Number(this.personId);
      await this.personsService.updateeducation(model).toPromise();
      this.bursaryList = (await this.personsService
        .getEducationById(this.personId)
        .toPromise()).data;
    } else {
      if (this.personId) {
        value.PersonId = Number(this.personId);
        await this.personsService.inserteducation(value).toPromise();
        alertEvent('บันทึกข้อมูลสำเร็จ', 'success');
        this.bursaryList = (await this.personsService
          .getEducationById(this.personId)
          .toPromise()).data;
      } else {
        this.bursaryList.push(value);
      }
    }
  }

  public async deleteWorking(index) {
    return alertDeleteEvent().then(async confirm => {
      if (confirm.value) {
        if (this.personId) {
          const model = this.workingList[index];
          model.PersonId = Number(this.personId);
          model.WorkId
            ? await this.personsService.deletework(model.WorkId).toPromise()
            : false;
        }
        this.workingList.splice(index, 1);
        return alertEvent('ลบข้อมูลสำเร็จ', 'success');
      }
    });
  }

  public async updateWorking(value) {
    if (value.WorkId) {
      const model = value;
      model.PersonId = Number(this.personId);
      await this.personsService.updateWork(model).toPromise();
      this.workingList = (await this.personsService
        .getworkperson(this.personId)
        .toPromise()).data;
    } else {
      if (this.personId) {
        value.PersonId = Number(this.personId);
        await this.personsService.insertWork(value).toPromise();
        alertEvent('บันทึกข้อมูลสำเร็จ', 'success');
      }
      this.workingList.push(value);
    }
  }

  public findEducation(academy) {
    return this.academyList.find(data => data.AcademyId == academy).Academy;
  }

  public findCorperation(corpId) {
    return this.corperationList.find(data => {
      return data.CorporationId == corpId;
    });
  }

  public onImageChange(file: Event) {
    this.imageProfile = <File>file.target['files'][0];
    this.previewImage(this.imageProfile);
    //  var reader = new FileReader();
    // let temp = reader.readAsBinaryString(<File>file.target['files'][0]);
    return this.profileForm.controls['PathPhoto'].setValue(this.imageProfile);
  }

  private previewImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = _event => {
      this.imagePreview = reader.result;
    };
  }

  private async setList() {
    this.addressList = (await this.personsService
      .getAddressById(this.personId)
      .toPromise()).data;
    this.familyList = (await this.personsService
      .getFamilyById(this.personId)
      .toPromise()).data;
    this.bursaryList = (await this.personsService
      .getEducationById(this.personId)
      .toPromise()).data;
    this.workingList = (await this.personsService
      .getworkperson(this.personId)
      .toPromise()).data;
    this.contactList = (await this.personsService
      .getcontactperson(this.personId)
      .toPromise()).data;
    this.coordinateList = Object.values(groupbyList(mapPersons((await this.personsService
      .getcoordinator(this.personId)
      .toPromise()).data), 'FullnameTh'));
    for (let i = 0; i < this.coordinateList.length; i++) {
      this.nametitle.push(this.coordinateList[i][0].FullnameTh);
    }

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



  private setProfile(data) {
    return data
      ? this.formBuilder.group({
          PersonId: [data.PersonId],
          TitleNameTh: [data.TitleNameTh, [Validators.required]],
          TitleNameOther: [data.TitleNameOther],
          FristNameTh: [data.FristNameTh, [Validators.required]],
          LastNameTh: [data.LastNameTh, [Validators.required]],
          TitleNameEn: [data.TitleNameEn, [Validators.required]],
          TitleNameEnOther: [data.TitleNameEnOther],
          FristNameEn: [data.FristNameEn, [Validators.required]],
          LastNameEn: [data.LastNameEn, [Validators.required]],
          IdCard: [
            data.IdCard,
            [Validators.required, Validators.minLength(13)]
          ],
          Birthday: [this.setDateEdit(data.Birthday), [Validators.required]],
          Sex: [data.Sex, [Validators.required]],
          Passport: [data.Passport],
          Religion: [data.Religion, [Validators.required]],
          Nationality: [data.Nationality, [Validators.required]],
          PartPhoto: [data.PartPhoto],
          Marital: [data.Marital, [Validators.required]],
          EthnicityId: [data.EthnicityId, [Validators.required]],
          WorkPermitNo: [data.WorkPermitNo, [Validators.required]],
          FavoriteFood: [data.FavoriteFood],
          AllergicFood: [data.AllergicFood],
          FoodDislike: [data.FoodDislike],
          AllergicDrugs: [data.AllergicDrugs],
          CongenitalDisease: [data.CongenitalDisease],
          VehicleRegistrationNumber: [data.VehicleRegistrationNumber],
          OtherPreferences: [data.OtherPreferences],
          PathPhoto: []
        })
      : this.formBuilder.group({
          TitleNameTh: [1, [Validators.required]],
          TitleNameOther: [''],
          FristNameTh: ['', [Validators.required]],
          LastNameTh: ['', [Validators.required]],
          TitleNameEn: [1, [Validators.required]],
          TitleNameEnOther: [''],
          FristNameEn: ['', [Validators.required]],
          LastNameEn: ['', [Validators.required]],
          IdCard: ['', [Validators.required, Validators.minLength(13)]],
          Birthday: [this.setDateEdit(new Date()), [Validators.required]],
          Sex: [1, [Validators.required]],
          Passport: [''],
          Religion: [1, [Validators.required]],
          Nationality: ['', [Validators.required]],
          PartPhoto: [''],
          Marital: [1, [Validators.required]],
          EthnicityId: [1, [Validators.required]],
          WorkPermitNo: ['', [Validators.required]],
          FavoriteFood: [''],
          AllergicFood: [''],
          FoodDislike: [''],
          AllergicDrugs: [''],
          CongenitalDisease: [''],
          VehicleRegistrationNumber: [''],
          OtherPreferences: [''],
          PathPhoto: ['']
        });
  }

  public async next() {
    this.spinnerService.show();
    if (this.profileForm.controls.TitleNameTh.value == null ||
        this.profileForm.controls.TitleNameTh.value == "" ||
        this.profileForm.controls.FristNameTh.value == null ||
        this.profileForm.controls.FristNameTh.value == '' ||
        this.profileForm.controls.LastNameTh.value == null ||
        this.profileForm.controls.LastNameTh.value == '' ||
        this.profileForm.controls.TitleNameEn.value == null ||
        this.profileForm.controls.TitleNameEn.value == '' ||
        this.profileForm.controls.FristNameEn.value == null ||
        this.profileForm.controls.FristNameEn.value == '' ||
        this.profileForm.controls.LastNameEn.value == null ||
        this.profileForm.controls.LastNameEn.value == '' ||
        this.profileForm.controls.IdCard.value == null ||
        this.profileForm.controls.IdCard.value == '' ||
        this.profileForm.controls.Birthday.value == null ||
        this.profileForm.controls.Birthday.value == '' ||
        this.profileForm.controls.Sex.value == null ||
        this.profileForm.controls.Sex.value == '' ||
        this.profileForm.controls.Nationality.value == null ||
        this.profileForm.controls.Nationality.value == '' ||
        this.profileForm.controls.EthnicityId.value == null ||
        this.profileForm.controls.EthnicityId.value == '' ||
        this.profileForm.controls.Marital.value == null ||
        this.profileForm.controls.Marital.value == '' ||
        this.profileForm.controls.Religion.value == null ||
        this.profileForm.controls.Religion.value == '' ) {
      this.spinnerService.hide();
      this.alertValid = true;
      return window.scroll(0, 300);
    }

    this.profileForm.value['Birthday'] = this.setDate(
      this.profileForm.value.Birthday
    );
    if (this.personId) {
      await this.personsService
        .updatePerson(this.profileForm.value)
        .toPromise();
      this.updateLog(this.profileForm.value);
    } else {
      const person = (await this.personsService
        .insertPerson(this.profileForm.value)
        .toPromise()).data[0];
      this.personId = person;
    }
    this.spinnerService.hide();

    alertEvent('บันทึกข้อมูลสำเร็จ', 'success');
    this.notNext = 2;
    return this.stepper.next();
  }

  onChangeTitleTH() {
    console.log('onChangeTitleTH');

    if (!this.titleNameThCheck) {
      this.titleNameThCheck = true;
    } else {
      this.titleNameThCheck = false;
      this.profileForm.controls['TitleNameOther'].setValue('');
    }
  }
  onChangeTitleEN() {
    console.log('onChangeTitleEN');

    if (!this.titleNameEnCheck) {
      this.titleNameEnCheck = true;
    } else {
      this.titleNameEnCheck = false;
      this.profileForm.controls['TitleNameEnOther'].setValue('');

    }
  }
}
