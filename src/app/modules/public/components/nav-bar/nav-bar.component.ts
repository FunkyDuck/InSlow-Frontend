import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  display: boolean = false;

  constructor(private userService: UsersService, private router: Router) { }

  isConnected: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(events => {
      this.isConnected = this.userService.isConnected();
      console.warn('CONNECTED :: ' + this.isConnected)
    });

  }

  menu() {
    this.display = !this.display;
  }

}
