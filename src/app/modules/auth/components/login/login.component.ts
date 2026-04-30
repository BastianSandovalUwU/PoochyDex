import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/modules/auth/services/auth.service';
import { LanguageService } from 'app/modules/shared/services/language.service';
import { detailFadeInAnimations } from 'app/modules/shared/animations/detail-fade-in.animation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  animations: detailFadeInAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage = '';
  language = 'es';
  loginForm: UntypedFormGroup;
  loading = false;
  showPassword = false;
  /** Banner shown after registration redirect (query `registered=1`). */
  registeredBanner = false;

  private readonly subs = new Subscription();

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {}

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
      this.languageService.currentLanguage$.subscribe(lang => {
        this.language = lang;
      })
    );

    this.subs.add(
      this.route.queryParamMap.subscribe(params => {
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
    this.authService.login(formData).subscribe({
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
