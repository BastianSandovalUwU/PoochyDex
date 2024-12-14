import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/modules/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  language: string = 'es';
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    if(this.authService.getSessionData()) {
      console.log('ya hay una sesión iniciada');
      this.router.navigate(['/profile/show']);
      return;
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    this.loading = true;
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.login(formData).subscribe(response => {
        // this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  signUp() {
    this.router.navigate(['/auth/sign-up']);

  }

}
