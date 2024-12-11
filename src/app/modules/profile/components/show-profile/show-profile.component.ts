import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { UserData } from '../../../../../../entities/auth/user.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

  useData: UserData
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.useData = this.authService.getSessionData();
    if(!this.useData) {
      console.log('no hay una sesión iniciada');
      this.router.navigate(['/auth/login']);
      return;
    }
  }

  logout() {
    this.loading = true;
    this.authService.logout();
  }

}
