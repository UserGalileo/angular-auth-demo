import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../services/user.store';
import { UserManager, User as OidcUser } from 'oidc-client';
import { oauthConfig } from './oauth-config';
import { User } from '../models';
import { from, of } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  private userManager = new UserManager(oauthConfig);

  constructor(
    private router: Router,
    private userStore: UserStore
  ) {
    this.fetchUser().subscribe(user => {
      if (user) {
        this.userStore.setUser(user);
      }
    })
  }

  getAccessToken() {
    return this.userManager.getUser().then(user => {
      return user?.access_token
    })
  }

  fetchUser() {
    return from(this.userManager.getUser()).pipe(
      map(this.extractUser)
    );
  }

  login() {
    return from(this.userManager.signinPopup()).pipe(
      tap(user => {
        console.log(user);
        this.userStore.setUser(this.extractUser(user)!);
      }),
      mapTo(true),
      catchError(() => of(false))
    )
  }

  logout() {
    this.userManager.removeUser().then(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login');
    })
  }

  completeAuthentication() {
    return this.userManager.signinPopupCallback(window.location.href)
  }

  private extractUser(user: OidcUser | null): User | null {
    if (user) {
      const { email, name: displayName } = user.profile;
      return { email, displayName } as User;
    }
    return null;
  }
}
