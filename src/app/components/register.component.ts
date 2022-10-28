import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
      <h1>Register</h1>
      <input type="text" ngModel name="email" placeholder="email">
      <input type="text" ngModel name="name" placeholder="name">
      <input type="text" ngModel name="surname" placeholder="surname">
      <input type="text" ngModel name="password" placeholder="password">
      <button>Register</button>
      <p>Click <a routerLink="/login">here</a> to login</p>
    </form>
  `
})
export class RegisterComponent {

  constructor() {}

  onSubmit(formValue: any) {}
}
