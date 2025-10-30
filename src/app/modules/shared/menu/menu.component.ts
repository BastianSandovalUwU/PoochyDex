import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserData } from '../../../../../entities/auth/user.entity';
import { PokeApiService } from '../services/pokeApi.service';
import { HelperService } from '../services/helper.service';
import { VERSION_NUMBER } from '../../../../../entities/common/const.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() language: string = 'es';
  @Input() userData: UserData | null;
  @Output() close = new EventEmitter<void>();
  @Output() refreshCacheRequested = new EventEmitter<void>();
  url: string;
  cacheSize = { pokemon: 0 };
  showConfirmDialog = false;
  title: string;
  description: string;
  versionNumber: string = VERSION_NUMBER;

  constructor(
    private router: Router,
    private pokeApiService: PokeApiService,
    private helperService: HelperService
  ) {
  }

  ngOnInit() {
    this.updateCacheSize();
    this.setTitleAndDescription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isOpen']) {
      this.isOpen = changes['isOpen'].currentValue;
    }
    if (changes['language'] && changes['language'].currentValue) {
      this.setTitleAndDescription();
    }
  }

  setTitleAndDescription() {
    this.title = this.language === 'es' ? '¿Actualizar datos de Pokémon?' : 'Update Pokémon data?';
    this.description = this.language === 'es' ? 'Esto eliminará el cache actual y cargará los datos más recientes desde la API. ¿Continuar?' : 'This will clear the current cache and reload the latest data from the API. Continue?';
  }

  toggleMenu() {
  }

  closeMenu() {
    this.close.emit();
  }

  clearCache() {
    this.showConfirmDialog = true;
  }

  confirmClearCache() {
    this.pokeApiService.clearCache();
    this.isOpen = false;
    this.updateCacheSize();
    this.refreshCacheRequested.emit();
    this.showConfirmDialog = false;
  }

  cancelClearCache() {
    this.showConfirmDialog = false;
  }

  private updateCacheSize() {
    this.cacheSize = this.pokeApiService.getCacheSize();
  }

}
