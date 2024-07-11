import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hyperlink',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.scss']
})
export class HyperlinkComponent implements OnInit {
  @Input() value: string = '';
  @Input() type: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirecTo(): void {
    let url = '';
    switch (this.type) {
      case 'pokemon':
        url = '/pokedex/show-pokemon/' + this.value.toLowerCase();
        this.routerTo(url);
        break;
      case 'game':
        url = '';
        this.routerTo(url);
        break
      default:
        break;
    }
  }

  routerTo(url: string) {
    this.router.navigateByUrl(url);
  }

}
