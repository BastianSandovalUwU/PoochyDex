import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() language: string;
  @Output() close = new EventEmitter<void>();
  url: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isOpen']) {
      this.isOpen = changes['isOpen'].currentValue;
    }
  }

  toggleMenu() {
  }

  closeMenu() {
    this.close.emit();
  }

}
