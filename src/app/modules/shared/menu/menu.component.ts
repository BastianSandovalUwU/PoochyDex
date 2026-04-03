import { Component, EventEmitter, Input, OnChanges, OnInit, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserData } from '../../../../../entities/auth/user.entity';
import { PokeApiService } from '../services/pokeApi.service';
import { NetworkService } from '../services/network.service';
import { VERSION_NUMBER } from '../../../../../entities/common/const.interface';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { MENU_OPTIONS, MenuOption } from '../../../../../entities/common/url-routes';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() language: string = 'es';
  @Input() userData: UserData | null;
  @Output() close = new EventEmitter<void>();
  url: string;
  isOnline = true;
  lastDataSource: 'network' | 'cache' = 'network';
  versionNumber: string = VERSION_NUMBER;
  filteredMenuOptions: MenuOption[] = [];
  currentRoute: string = '';
  expandedSections: Set<string> = new Set();
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    private pokeApiService: PokeApiService,
    private networkService: NetworkService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.networkService.isOnline$.subscribe(v => this.isOnline = v);
    this.pokeApiService.lastDataSource$.subscribe(src => this.lastDataSource = src);
    this.filterMenuOptions();
    this.updateCurrentRoute();

    // Suscribirse a los cambios de ruta
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentRoute();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updateCurrentRoute() {
    this.currentRoute = this.router.url;
    // Expand sections when a child route is active
    this.autoExpandActiveSections();
  }

  autoExpandActiveSections() {
    this.filteredMenuOptions.forEach(option => {
      if (option.children && option.children.length > 0) {
        const hasActiveChild = option.children.some(child =>
          child.route && this.isRouteActive(child.route)
        );
        if (hasActiveChild) {
          this.expandedSections.add(this.getOptionKey(option));
        }
      }
    });
  }

  getOptionKey(option: MenuOption): string {
    return option.route || option.labelEs || option.labelEn;
  }

  toggleExpanded(option: MenuOption) {
    const key = this.getOptionKey(option);
    if (this.expandedSections.has(key)) {
      this.expandedSections.delete(key);
    } else {
      this.expandedSections.add(key);
    }
  }

  isExpanded(option: MenuOption): boolean {
    return this.expandedSections.has(this.getOptionKey(option));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isOpen']) {
      this.isOpen = changes['isOpen'].currentValue;
    }
    if(changes['userData'] || changes['language']) {
      this.filterMenuOptions();
    }
  }

  filterMenuOptions() {
    this.filteredMenuOptions = MENU_OPTIONS.filter(option => {
      // Optional role gate on root items
      if (option.role && this.userData?.role !== option.role) {
        return false;
      }
      return true;
    }).map(option => {
      // Clone so MENU_OPTIONS is never mutated
      const filteredOption = { ...option };

      // Same role filter for nested items
      if (filteredOption.children) {
        filteredOption.children = filteredOption.children.filter(child => {
          if (child.role && this.userData?.role !== child.role) {
            return false;
          }
          return true;
        });
      }

      return filteredOption;
    });
  }

  getLabel(option: MenuOption): string {
    return this.language === 'es' ? option.labelEs : option.labelEn;
  }

  hasAccess(option: MenuOption): boolean {
    if (!option.role) {
      return true;
    }
    return this.userData?.role === option.role;
  }

  isRouteActive(route?: string): boolean {
    if (!route) {
      return false;
    }

    const current = this.currentRoute;

    // Case 1: exact match (with or without trailing slash)
    if (current === route || current === route + '/' || current + '/' === route) {
      return true;
    }

    // Case 2: routes that accept path segments (menu entry ends with "/")
    // e.g. "/pokedex/show-pokedex/" matches "/pokedex/show-pokedex/kanto"
    if (route.endsWith('/')) {
      const routeBase = route.slice(0, -1);
      if (current.startsWith(route)) {
        return true;
      }
      if (current === routeBase || current.startsWith(routeBase + '/')) {
        return true;
      }
    } else {
      // No trailing slash: prefix match only (avoid /pokedex/list matching /pokedex/list-pokedex)
      if (current.startsWith(route + '/')) {
        return true;
      }
    }

    return false;
  }

  toggleMenu() {
  }

  closeMenu() {
    this.close.emit();
  }

  logout() {
    this.authService.logout();
    if(this.router.url.includes('/apiDex')) {
      this.router.navigate(['/']);
    }
    this.closeMenu();
  }

}
