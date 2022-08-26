import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sideNav: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public changeRoute(route = '/'): void {
    this.router.navigate([route])
    this.sideNav.toggle()
  }

}
