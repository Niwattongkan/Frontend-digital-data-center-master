import { Component } from '@angular/core';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent {

  stepList = [
    {
      icon: "tower",
      stepName: "ข้อมูลองค์กร"
    },
    {
      icon: "profile", stepName: "ข้อมูลส่วนตัว"
    },
    {
      icon: "capital",
      stepName: "ประวัติการรับทุน"
    }
  ];

}
