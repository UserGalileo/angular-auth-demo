import { Component } from '@angular/core';

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
  `
})
export class LoginComponent {

  constructor() {}

  onSubmit(formValue: any) {}
}
