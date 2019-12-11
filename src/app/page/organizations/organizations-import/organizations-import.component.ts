import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { PersonsService } from '../../../shared/services/persons.service';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrganizationService } from 'src/app/shared/services/organization.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-organizations-import',
  templateUrl: './organizations-import.component.html',
  styleUrls: ['./organizations-import.component.css']
})
export class OrganizationsImportComponent implements OnInit {

  Id: any;
  Corporation:any;
  CorporationAddress:any;
  CorporationContact:any;

  constructor(  private organizationService: OrganizationService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
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
        case 'Corporation':
          this.Corporation = jsonData;
          break;
        case 'CorporationAddress':
          this.CorporationAddress = jsonData;
          break;
        case 'CorporationContact':
          this.CorporationContact = jsonData;
          break;
       
        default:
          break;
      }
    }
    reader.readAsBinaryString(file);
  }

  Upload(type) {
    switch (type) {
      case 'Corporation':
        let tempArry1 = this.Corporation;
        tempArry1.forEach((e, index) => {
          setTimeout(() => {
            this.organizationService
              .insertCorporation(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.Corporation.shift();
                  if (this.Corporation.length == 0) this.Corporation = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });

        break;
      case 'CorporationAddress':
        let tempArry2 = this.CorporationAddress;
        tempArry2.forEach((e, index) => {
          setTimeout(() => {
            this.organizationService
              .insertCorporationAddress(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.CorporationAddress.shift();
                  if (this.CorporationAddress.length == 0) this.CorporationAddress = undefined;
                } else {
                  alert(res.message);
                }
              }, err => { alert(err); });
          }, 1000 * index);
        });
        break;

      case 'CorporationContact':
        let tempArry3 = this.CorporationContact;
        tempArry3.forEach((e, index) => {
          setTimeout(() => {
            this.organizationService
              .insertCorporationContact(e)
              .toPromise().then(res => {
                if (res.successful) {
                  console.log(res);
                  this.CorporationContact.shift();
                  if (this.CorporationContact.length == 0) this.CorporationContact = undefined;
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
        case 'Corporation':
          this.organizationService.getCorporation(this.Id).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;

        case 'CorporationAddress':
          this.organizationService.getcorporationaddress(this.Id).toPromise().then(res => {
            if (res.data.length > 0) this.saveAsExcelFile(res.data, type);
            else alert('No data');
            this.spinner.hide();
          });
          break;

        case 'CorporationContact':
          this.organizationService.getcorporationcontact(this.Id).toPromise().then(res => {
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
