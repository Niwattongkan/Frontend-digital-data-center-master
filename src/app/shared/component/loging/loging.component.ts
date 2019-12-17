import { Component, OnInit, Input } from '@angular/core';

import { AuthlogService } from '../../../shared/services/authlog.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {

  public editlogPersonlist = [];

  @Input() personId: any;

  constructor(
    private authlogService: AuthlogService,
    private userService: UsersService
  ) { }

  async ngOnInit() {
    let user = this.userService.getUserInfo();
    this.authlogService.getAuditLogById(user.email).subscribe(res => {
      if (!res.successful) return alert(res.message);
      this.editlogPersonlist = res.data;
    })
  }
}
