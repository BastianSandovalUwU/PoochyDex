import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild, ViewChild, ElementRef } from '@angular/core';

export interface TabItem {
  label: string;
  value: any;
}

@Component({
  selector: 'app-custom-tabs',
  templateUrl: './custom-tabs.component.html',
  styleUrls: ['./custom-tabs.component.scss']
})
export class CustomTabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() selectedIndex: number = 0;
  @Input() activeTabColor: string = 'text-purple-600';
  @Input() inactiveTabColor: string = 'text-gray-500';
  @Input() activeTabUnderline: string = 'border-purple-600';
  @Input() showArrows: boolean = true;
  @Input() scrollable: boolean = true;

  @Output() selectedIndexChange = new EventEmitter<number>();
  @Output() tabChange = new EventEmitter<{ index: number; value: any }>();

  @ViewChild('tabsContainer', { static: false }) tabsContainer!: ElementRef<HTMLDivElement>;

  scrollPosition: number = 0;
  scrollStep: number = 200;

  selectTab(index: number): void {
    if (index !== this.selectedIndex && index >= 0 && index < this.tabs.length) {
      this.selectedIndex = index;
      this.selectedIndexChange.emit(index);
      this.tabChange.emit({ index, value: this.tabs[index].value });
    }
  }

  scrollLeft(): void {
    if (this.tabsContainer?.nativeElement) {
      this.tabsContainer.nativeElement.scrollBy({ left: -this.scrollStep, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.tabsContainer?.nativeElement) {
      this.tabsContainer.nativeElement.scrollBy({ left: this.scrollStep, behavior: 'smooth' });
    }
  }
}

