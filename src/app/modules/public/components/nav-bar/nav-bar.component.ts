import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  display: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  menu() {
    this.display = !this.display;
  }

}
