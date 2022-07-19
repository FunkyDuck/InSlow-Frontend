import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../../../services/iuser';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {
  user?: IUser;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    const JWT = localStorage.getItem('token');
    const HELPER = new JwtHelperService();
    const data = HELPER.decodeToken(JWT as any);

    this.userService.getUser(data.sub).subscribe(res => this.user = res.body as IUser);
  }

}
