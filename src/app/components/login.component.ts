import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <h1>Login</h1>
      <input type="text" ngModel name="email" placeholder="email">
      <input type="text" ngModel name="password" placeholder="password">
      <button>Login</button>
      <p>Click <a routerLink="/register">here</a> to create a new account</p>
    </form>
    {{ message }}
  `
})
export class LoginComponent {

  message = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(formValue: any) {
    const { email, password } = formValue;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.message = '';
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.message = 'Login failed.'
      }
    })
  }
}
