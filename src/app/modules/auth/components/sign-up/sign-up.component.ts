import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    errorMessage: string = '';
    language: string = 'es';
    signUpForm: FormGroup;
    loading: boolean = false;

  constructor( private fb: FormBuilder,
      private authService: AuthService,
      private router: Router) {

            this.signUpForm = this.fb.group({
              username: ['', Validators.required],
              password: ['', Validators.required]
            });

      }

  ngOnInit() {
  }

  signUp() {
    this.loading = true;
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      this.authService.register(formData).subscribe((response) => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      });
    } else {
      this.loading = false;
    }

  }
}
