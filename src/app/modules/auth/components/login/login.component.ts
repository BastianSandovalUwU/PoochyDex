import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'app/modules/shared/services/authorization.service';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthorizationService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // Llama a tu servicio para autenticar al usuario
      this.authService.login(formData).subscribe(response => {
        // Maneja la respuesta del login aquí
        console.log(response);
      });
    }
  }

}
