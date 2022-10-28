import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h1>Welcome, user!</h1>
    <button (click)="logout()">Logout</button>
  `
})
export class HomeComponent {

  constructor() {}

  logout() {
  }
}
