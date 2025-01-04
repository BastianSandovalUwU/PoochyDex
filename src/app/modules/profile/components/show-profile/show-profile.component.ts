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
    this.getUserConfigs();
    this.useData = this.authService.getSessionData();
    if(!this.useData) {
      console.log('no hay una sesión iniciada');
      this.router.navigate(['/auth/login']);
      return;
    }
  }

  getUserConfigs() {
    this.authService.getUserConfigs().subscribe((data) => {
      console.log(data);
    });
  }

  logout() {
    this.loading = true;
    this.authService.logout();
  }

}
