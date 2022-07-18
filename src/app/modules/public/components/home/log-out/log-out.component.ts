import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router, private serv: UsersService) { }

  ngOnInit(): void {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 5);
  }

}
