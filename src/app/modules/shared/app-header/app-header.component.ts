import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../../../../../entities/auth/user.entity';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  @Input() isMenuOpen = false;
  @Input() currentLanguage = 'es';
  @Input() currentUser: UserData | null = null;
  @Input() avatarUrl: string | null = null;
  @Input() canInstallPwa = false;

  @Output() menuToggle = new EventEmitter<void>();
  @Output() installPwaClick = new EventEmitter<void>();

  profileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  @HostListener('document:click')
  onDocumentClick(): void {
    this.profileMenuOpen = false;
  }

  toggleProfileMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  goToProfile(): void {
    this.profileMenuOpen = false;
    this.router.navigate(['/profile/show']);
  }

  logout(): void {
    this.profileMenuOpen = false;
    this.authService.logout();
    this.router.navigate(['/pokedex']);
  }
}
