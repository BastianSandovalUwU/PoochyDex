import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HelperService } from 'app/modules/shared/services/helper.service';
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

  constructor(private helperService: HelperService) { }

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
    return this.helperService.getGameIconForGeneration(gen);
  }

  getGameIconForForm(form: string): string[] {
    return this.helperService.getGameIconForForm(form);
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
