import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: [
    trigger('toggleFilters', [
      state('visible', style({
        height: '*',
        opacity: 1
      })),
      state('hidden', style({
        height: '0px',
        opacity: 0
      })),
      transition('visible <=> hidden', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() language: string = 'es';
  @Input() isShow: boolean = false;

  @Output() filters = new EventEmitter<{ generations: number[], forms: string[] }>();

  filtersVisible: boolean = false;
  selectedGenerations: number[] = [];
  selectedForms: string[] = [];
  generations = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  generationGridClass: string = 'grid grid-cols-2 sm:grid-cols-3 gap-1';
  formGridClass: string = 'grid grid-cols-1 gap-1';

  constructor() { }

  ngOnInit() {
    this.selectedGenerations = [...this.generations];
    this.updateGridClass();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isShow']) {
      this.updateGridClass();
    }
  }

  updateGridClass() {
    if (this.isShow) {
      this.generationGridClass = 'grid grid-cols-2 gap-1';
      this.formGridClass = 'grid grid-cols-2 gap-1';
    } else {
      this.generationGridClass = 'grid grid-cols-2 sm:grid-cols-3 gap-1';
      this.formGridClass = 'grid grid-cols-2 sm:grid-cols-3 gap-1';
    }
  }

  applyFilters() {
    this.filters.emit({
      generations: this.selectedGenerations,
      forms: this.selectedForms
    });
  }

  toggleForm(form: string) {
    const index = this.selectedForms.indexOf(form);
    if (index > -1) {
      this.selectedForms.splice(index, 1);
    } else {
      this.selectedForms.push(form);
    }
  }

  getGameIconForGeneration(gen: number): string[] {
    switch(gen) {
      case 1: return ['red', 'blue'];
      case 2: return ['gold', 'silver'];
      case 3: return ['ruby', 'sapphire'];
      case 4: return ['diamond', 'pearl'];
      case 5: return ['black', 'white'];
      case 6: return ['x', 'y'];
      case 7: return ['sun', 'moon'];
      case 8: return ['sword', 'shield'];
      case 9: return ['scarlet', 'violet'];
      default: return [];
    }
  }

  getGameIconForForm(form: string): string[] {
    switch(form) {
      case 'alola': return ['https://i.imgur.com/uBItHSf.png', 'https://i.imgur.com/uBItHSf.png'];
      case 'galar': return ['https://i.imgur.com/lqJ4HD7.png', 'https://i.imgur.com/lqJ4HD7.png'];
      case 'paldea': return ['https://i.imgur.com/08V6nOU.png', 'https://i.imgur.com/08V6nOU.png'];
      case 'hisui': return ['https://i.imgur.com/8OwCV9k.png', 'https://i.imgur.com/8OwCV9k.png'];
      case 'gmax': return ['https://imgur.com/gXd5yaL.png', 'https://imgur.com/gXd5yaL.png'];
      case 'mega': return ['https://i.imgur.com/YLkgY3T.png', 'https://i.imgur.com/Ygj2JeC.png'];
      default: return [];
    }
  }

  toggleFilters() {
    this.filtersVisible = !this.filtersVisible;
  }

  toggleGeneration(gen: number) {
    const index = this.selectedGenerations.indexOf(gen);
    if (index > -1) {
      this.selectedGenerations.splice(index, 1);
    } else {
      this.selectedGenerations.push(gen);
    }
  }
}
