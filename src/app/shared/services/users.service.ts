import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './config-services/api.service';
import { HttpClient} from '@angular/common/http';

@Injectable()

export class UsersService {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) { }

  getGroupUsersAll(): Observable<any> {
    return this.apiService.get(`getallgroupuser`);
  }

  public getPermissionById(): any {
    this.apiService.getJSON('getpermissionbyid').subscribe((data) => {
      const mockPermission = '{ "successful": true, "data": [ ' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 1, "MenuName": "หน้าแรก", "MenuNameEn": "home" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 2, "MenuName": "ข้อมูลบุคคล", "MenuNameEn": "persons" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 3, "MenuName": "ข้อมูลองค์กร", "MenuNameEn": "organizations" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 4, "MenuName": "ข้อมูลโครงการ", "MenuNameEn": "program" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 5, "MenuName": "รายงานการสืบค้นข้อมูลบุคคล", "MenuNameEn": "searching-personal" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 6, "MenuName": "รายงานการสืบค้นข้อมูลองค์กร", "MenuNameEn": "searching-corperation" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 7, "MenuName": "รายงานการสืบค้นข้อมูลคณะกรรมการ", "MenuNameEn": "searching-board" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 8, "MenuName": "รายงานการใช้งานระบบ", "MenuNameEn": "using" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 9, "MenuName": "รายงานบันทึกจากฝ่ายเลขา", "MenuNameEn": "note" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 10, "MenuName": "สมุดบันทึก", "MenuNameEn": "notebook" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 11, "MenuName": "กลุ่มการจัดส่งเอกสาร", "MenuNameEn": "group" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 12, "MenuName": "กลุ่มผู้ใช้งาน", "MenuNameEn": "users" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 13, "MenuName": "กลุ่มจำกัดสิทธิ์", "MenuNameEn": "permission" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 14, "MenuName": "Audit Log", "MenuNameEn": "auditlog" },' +
      '{ "PersonId": 5, "PView": 1, "PAdd": 1, "PEdit": 1, "PDelete": 1, "Import": 1, "Export": 1, "MenuId": 15, "MenuName": "จัดการสิทธิ์การใช้งาน", "MenuNameEn": "license" }' +
      ' ] }';

      //localStorage.setItem('u_permission', mockPermission);
      localStorage.setItem('u_permission', JSON.stringify(data));
    });
  }

  public getLocalUserPermission(): any {
    try {
      return JSON.parse(localStorage.getItem('u_permission')).data;
    } catch (error) {
      console.log('error while get userPermission:', error);
      return [];
    }
  }
}