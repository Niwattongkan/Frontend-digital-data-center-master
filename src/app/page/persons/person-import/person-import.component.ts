import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { PersonsService } from '../../../shared/services/persons.service';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-person-import',
  templateUrl: './person-import.component.html',
  styleUrls: ['./person-import.component.css']
})
export class PersonImportComponent implements OnInit {

  personData: any[];
  PersonAddress: any[];
  PersonContact: any[];
  PersonCoordinator: any[];
  PersonEducation: any[];
  PersonFamily: any[];
  PersonWork: any[];
  PersonId: any;

  constructor(private personsService: PersonsService, private spinner: NgxSpinnerService, ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange(ev, type) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary', cellDates: true });
      workBook.SheetNames.forEach(function (sheetName) {
        jsonData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], { dateNF: "YYYY-MM-DD" });
      });

      switch (type) {
        case 'person':
          this.personData = jsonData;
          break;
        case 'PersonAddress':
          this.PersonAddress = jsonData;
          break;
        case 'PersonContact':
          this.PersonContact = jsonData;
          break;
        case 'PersonCoordinator':
          this.PersonCoordinator = jsonData;
          break;
        case 'PersonEducation':
          this.PersonEducation = jsonData;
          break;
        case 'PersonFamily':
          this.PersonFamily = jsonData;
          break;
        case 'PersonWork':
          this.PersonWork = jsonData;
          break;

        default:
          break;
      }
    }
    reader.readAsBinaryString(file);
  }

  Upload(type) {
    switch (type) {
      case 'person':
        let tempArry1 = this.personData;
        tempArry1.forEach((e, index) => {
          setTimeout(() => {
            this.personsService
              .insertPerson(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.personData.shift();
                  if (this.personData.length == 0) this.personData = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });

        break;
      case 'PersonAddress':
        let tempArry2 = this.PersonAddress;
        tempArry2.forEach((e, index) => {
          setTimeout(() => {
            this.personsService
              .insertPersonAddress(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.PersonAddress.shift();
                  if (this.PersonAddress.length == 0) this.PersonAddress = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });
        break;

      case 'PersonContact':
        let tempArry3 = this.PersonContact;
        tempArry3.forEach((e, index) => {
          setTimeout(() => {
            this.personsService
              .insertPersonContact(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.PersonContact.shift();
                  if (this.PersonContact.length == 0) this.PersonContact = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });
        break;

      case 'PersonCoordinator':
        let tempArry4 = this.PersonCoordinator;
        tempArry4.forEach((e, index) => {
          setTimeout(() => {
            this.personsService
              .insertCoordinator(e)
              .toPromise().then(res => {
                if (res.successful) {
                  this.personsService
                    .insertcoordinatorcantact(e)
                    .toPromise().then(res => {
                      this.PersonCoordinator.shift();
                      if (this.PersonCoordinator.length == 0) this.PersonCoordinator = undefined;
                    });
                } else {
                  alert(res.message);
                }
              });
          }, 1000 * index);
        });
        break;
      case 'PersonEducation':
        let tempArry5 = this.PersonEducation;
        tempArry5.forEach((e, index) => {
          setTimeout(() => {
            this.personsService
              .inserteducation(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.PersonEducation.shift();
                  if (this.PersonEducation.length == 0) this.PersonEducation = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });
        break;
      case 'PersonFamily':
        let tempArry6 = this.PersonFamily;
        tempArry6.forEach((e, index) => {
          setTimeout(() => {
            this.personsService
              .insertFamily(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.PersonFamily.shift();
                  if (this.PersonFamily.length == 0) this.PersonFamily = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });
        break;
      case 'PersonWork':
        let tempArry7 = this.PersonWork;
        tempArry7.forEach((e, index) => {
          setTimeout(() => {
            this.personsService
              .insertWork(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.PersonWork.shift();
                  if (this.PersonWork.length == 0) this.PersonWork = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });
        break;

      default:
        break;
    }
  }

  Export(type) {
    this.spinner.show();
    try {
      switch (type) {
        case 'person':
          this.personsService.getallperson().toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;

        case 'PersonAddress':
          this.personsService.getAddressById(this.PersonId).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;

        case 'PersonContact':
          this.personsService.getcontactperson(this.PersonId).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;

        case 'PersonCoordinator':
          this.personsService.getcoordinator(this.PersonId).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;
        case 'PersonEducation':
          this.personsService.getEducationById(this.PersonId).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;
        case 'PersonFamily':
          this.personsService.getFamilyById(this.PersonId).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;
        case 'PersonWork':
          this.personsService.getworkperson(this.PersonId).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;

        default: this.spinner.hide();
          break;
      }
    } catch (error) {
      this.spinner.hide();
    }
  }

  private saveAsExcelFile(json, fileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
  }
}
