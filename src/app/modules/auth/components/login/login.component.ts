import { Component, OnDestroy, OnInit, DestroyRef, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {
  private fb = inject(UntypedFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private languageService = inject(LanguageService);

  private destroyRef = inject(DestroyRef);
  errorMessage = '';
  language = 'es';
  loginForm: UntypedFormGroup;
  loading = false;
  showPassword = false;
  /** Banner shown after registration redirect (query `registered=1`). */
  registeredBanner = false;

  private readonly subs = new Subscription();

  ngOnInit(): void {
    if (this.authService.getSessionData()) {
      this.router.navigate(['/profile/show']);
      return;
    }

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.subs.add(
      this.languageService.currentLanguage$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(lang => {
        this.language = lang;
      })
    );

    this.subs.add(
      this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
        const r = params.get('registered');
        if (r === '1' || r === 'true') {
          this.registeredBanner = true;
          this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  login(): void {
    this.errorMessage = '';
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = this.loginForm.value;
    this.authService.login(formData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/profile/show']);
      },
      error: error => {
        this.loading = false;
        this.errorMessage =
          error.error?.message || (this.language === 'es' ? 'Error al iniciar sesión' : 'Error logging in');
      }
    });
  }

  signUp(): void {
    this.router.navigate(['/auth/sign-up']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
