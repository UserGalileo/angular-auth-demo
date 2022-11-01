import { Component } from '@angular/core';
import { UserStore } from '../services/user.store';
import { map, tap } from 'rxjs/operators';
import { OAuthService } from '../oauth/oauth.service';

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
    private authService: OAuthService
  ) {}

  logout() {
    this.authService.logout();
  }
}
