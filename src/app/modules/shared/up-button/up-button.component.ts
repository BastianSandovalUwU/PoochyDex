import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-button',
  templateUrl: './up-button.component.html',
  styleUrls: ['./up-button.component.scss']
})
export class UpButtonComponent implements OnInit {
  upButton: HTMLElement;
  downButton: HTMLElement;

  constructor() {}

  ngOnInit() {
    this.upButton = document.getElementById('upButton');
    this.downButton = document.getElementById('downButton');

    this.upButton.style.display = 'none';
    this.downButton.style.display = 'flex';
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollMaximo = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollTop === 0) {
      this.upButton.style.display = 'none';
      this.downButton.style.display = 'flex';
    } else if (scrollTop >= scrollMaximo - 10) {
      this.upButton.style.display = 'flex';
      this.downButton.style.display = 'none';
    } else {
      this.upButton.style.display = 'flex';
      this.downButton.style.display = 'flex';
    }
  }

  scrollUp(): void {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToBottom(): void {
    window.scroll({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }
}
