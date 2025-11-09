import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    signUpForm: UntypedFormGroup;
    loading: boolean = false;
    showPassword: boolean = false;
    showConfirmPassword: boolean = false;

  constructor( private fb: UntypedFormBuilder,
      private authService: AuthService,
      private router: Router) {

            this.signUpForm = this.fb.group({
              username: ['', [Validators.required, Validators.minLength(3)]],
              password: ['', [Validators.required, Validators.minLength(6)]],
              confirmPassword: ['', Validators.required]
            }, { validators: this.passwordMatchValidator() });

      }

  ngOnInit() {
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      return password.value === confirmPassword.value ? null : { passwordMismatch: true };
    };
  }

  signUp() {
    this.loading = true;
    this.errorMessage = '';

    if (this.signUpForm.valid) {
      const formData = {
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password
      };
      this.authService.register(formData).subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || (this.language === 'es' ? 'Error al crear la cuenta' : 'Error creating account');
        }
      });
    } else {
      this.loading = false;
      this.errorMessage = this.language === 'es' ? 'Por favor completa todos los campos correctamente' : 'Please fill all fields correctly';
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
