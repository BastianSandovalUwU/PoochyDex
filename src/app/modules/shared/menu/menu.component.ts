import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../../../../entities/auth/user.entity';
import { PokeApiService } from '../services/pokeApi.service';
import { NetworkService } from '../services/network.service';
import { VERSION_NUMBER } from '../../../../../entities/common/const.interface';
import { AuthService } from 'app/modules/auth/services/auth.service';

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
  url: string;
  isOnline = true;
  lastDataSource: 'network' | 'cache' = 'network';
  versionNumber: string = VERSION_NUMBER;

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

  logout() {
    this.authService.logout();
    if(this.router.url.includes('/apiDex')) {
      this.router.navigate(['/']);
    }
    this.closeMenu();
  }

}
