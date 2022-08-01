import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IMenu } from '../../services/imenu';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  display: boolean = false;

  isConnected: boolean = false;

  links: IMenu[] = [
    { link: '/', name: 'Connection', isConnected: false },
    { link: '/register', name: 'Register', isConnected: false },
    { link: '/user', name: 'Home', isConnected: true },
    { link: '/user/settings', name: 'Settings', isConnected: true },
    { link: '/logout', name: 'Logout', isConnected: true },
    { link: '/use', name: 'Conditions of use' },
    { link: '/about', name: 'About' }

  ];


  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(events => {
      this.isConnected = this.userService.isConnected();
    });

  }

  menu() {
    this.display = !this.display;
  }

}
