import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HelperService } from 'app/modules/shared/services/helper.service';
import { toggleSectionCollapseAnimations } from 'app/modules/shared/animations/toggle-section-collapse.animation';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  animations: toggleSectionCollapseAnimations
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

  /** Merged classes for generation chips (`app-ui-button`). */
  generationButtonExtraClasses(gen: number): string {
    const base =
      '!min-h-0 !h-auto w-full px-3 py-1.5 rounded-full transition-colors duration-200 hover:opacity-80 hover:scale-105 relative overflow-hidden !shadow-none';
    const sel = this.selectedGenerations.includes(gen);
    const palette = sel
      ? gen === 1
        ? 'gen-button-red-blue'
        : gen === 2
          ? 'gen-button-gold-silver'
          : gen === 3
            ? 'gen-button-ruby-sapphire'
            : gen === 4
              ? 'gen-button-diamond-pearl'
              : gen === 5
                ? 'gen-button-black-white'
                : gen === 6
                  ? 'gen-button-x-y'
                  : gen === 7
                    ? 'gen-button-sun-moon'
                    : gen === 8
                      ? 'gen-button-sword-shield'
                      : 'gen-button-scarlet-violet'
      : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-200';
    const text =
      sel && (gen === 1 || gen === 5 || gen === 8)
        ? 'text-white'
        : !sel
          ? 'text-gray-700'
          : '';
    return [base, palette, text].filter(Boolean).join(' ');
  }

  /** Merged classes for regional form chips (`app-ui-button`). */
  formButtonExtraClasses(form: string): string {
    const base =
      '!min-h-0 !h-auto w-full px-3 py-1.5 rounded-full transition-colors duration-200 hover:opacity-80 hover:scale-105 relative overflow-hidden !shadow-none';
    const sel = this.selectedForms.includes(form);
    const palette = sel
      ? form === 'alola'
        ? 'form-button-alola'
        : form === 'galar'
          ? 'form-button-galar'
          : form === 'paldea'
            ? 'form-button-paldea'
            : form === 'hisui'
              ? 'form-button-hisui'
              : form === 'gmax'
                ? 'form-button-gmax'
                : 'form-button-mega'
      : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-200';
    const text = sel && form !== 'hisui' ? 'text-white' : !sel ? 'text-gray-700' : '';
    return [base, palette, text].filter(Boolean).join(' ');
  }
}
