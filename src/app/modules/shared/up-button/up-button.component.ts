import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-button',
  templateUrl: './up-button.component.html',
  styleUrls: ['./up-button.component.scss']
})
export class UpButtonComponent implements OnInit {
  upButton: HTMLElement;
  downButton: HTMLElement;
  private isScrolling = false;

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
    if (this.isScrolling) return;
    this.isScrolling = true;

    const duration = 800; // duración en milisegundos
    const start = window.pageYOffset;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, start * (1 - easeProgress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        this.isScrolling = false;
      }
    };

    requestAnimationFrame(animateScroll);
  }

  scrollToBottom(): void {
    if (this.isScrolling) return;
    this.isScrolling = true;

    const duration = 800; // duración en milisegundos
    const start = window.pageYOffset;
    const end = document.documentElement.scrollHeight - window.innerHeight;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, start + (end - start) * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        this.isScrolling = false;
      }
    };

    requestAnimationFrame(animateScroll);
  }
}
