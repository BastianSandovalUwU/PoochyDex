import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  errorMessage = '';
  language = 'es';
  signUpForm: UntypedFormGroup;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  private readonly subs = new Subscription();

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.signUpForm = this.fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(3), Validators.maxLength(64), Validators.pattern(/^\S+$/)]
        ],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(128)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  ngOnInit(): void {
    if (this.authService.getSessionData()) {
      this.router.navigate(['/profile/show']);
      return;
    }
    this.subs.add(
      this.languageService.currentLanguage$.subscribe(lang => {
        this.language = lang;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /** 0 = empty; 1–4 = level shown in the bar. */
  get passwordStrengthLevel(): number {
    const p = (this.signUpForm.get('password')?.value as string) ?? '';
    if (!p) {
      return 0;
    }
    let points = 0;
    if (p.length >= 6) {
      points++;
    }
    if (p.length >= 8) {
      points++;
    }
    if (/[a-z]/.test(p) && /[A-Z]/.test(p)) {
      points++;
    }
    if (/[0-9]/.test(p)) {
      points++;
    }
    if (/[^A-Za-z0-9]/.test(p)) {
      points++;
    }
    if (points <= 1) {
      return 1;
    }
    if (points === 2) {
      return 2;
    }
    if (points === 3) {
      return 3;
    }
    return 4;
  }

  strengthSegmentClass(segmentIndex: number): string {
    const level = this.passwordStrengthLevel;
    const inactive = 'bg-gray-200 dark:bg-gray-600';
    if (level === 0) {
      return inactive;
    }
    const palette = [
      'bg-red-400 dark:bg-red-500',
      'bg-orange-400 dark:bg-orange-500',
      'bg-amber-400 dark:bg-amber-500',
      'bg-emerald-500 dark:bg-emerald-600'
    ];
    return segmentIndex < level ? palette[Math.min(level - 1, 3)] : inactive;
  }

  getStrengthLabel(): string {
    const level = this.passwordStrengthLevel;
    if (level === 0) {
      return '';
    }
    const es = ['', 'Débil', 'Regular', 'Buena', 'Fuerte'];
    const en = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    return this.language === 'es' ? es[level] : en[level];
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

  signUp(): void {
    this.errorMessage = '';

    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.errorMessage =
        this.language === 'es'
          ? 'Revisa los campos marcados antes de continuar.'
          : 'Please fix the highlighted fields before continuing.';
      return;
    }

    this.loading = true;
    const rawUser = (this.signUpForm.value.username as string).trim();
    const formData = {
      username: rawUser,
      password: this.signUpForm.value.password as string
    };

    this.authService.register(formData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/auth/login'], { queryParams: { registered: '1' } });
      },
      error: (error: unknown) => {
        this.loading = false;
        this.errorMessage = this.extractRegisterError(error);
      }
    });
  }

  private extractRegisterError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body = error.error;
      if (typeof body === 'string' && body.trim()) {
        return body.trim();
      }
      if (body && typeof body === 'object' && 'message' in body) {
        const msg = (body as { message: unknown }).message;
        if (typeof msg === 'string' && msg.trim()) {
          return msg.trim();
        }
      }
      if (error.status === 0) {
        return this.language === 'es'
          ? 'No se pudo conectar con el servidor. Comprueba la API o tu red.'
          : 'Could not reach the server. Check the API or your connection.';
      }
    }
    return this.language === 'es' ? 'Error al crear la cuenta' : 'Error creating account';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

}
