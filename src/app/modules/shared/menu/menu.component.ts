import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  url: string;

  constructor(private router: Router) {

    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
           console.log(data);
           this.url = data.url;
      }
  });
  }

  ngOnInit() {

  }

}
