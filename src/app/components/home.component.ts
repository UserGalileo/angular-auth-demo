import { Component } from '@angular/core';
import { UserStore } from '../services/user.store';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  template: `
    <h1>Welcome, {{ displayName$ | async }}!</h1>
    <button (click)="logout()">Logout</button>
  `
})
export class HomeComponent {

  displayName$ = this.userStore.user$.pipe(
    map(user => user?.displayName)
  );

  constructor(
    private userStore: UserStore,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }
}
