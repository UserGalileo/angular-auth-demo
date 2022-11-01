import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { catchError, map, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { OAuthService } from '../oauth/oauth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: OAuthService,
    private router: Router
  ) {}

  canActivate() {
    return this.authService.fetchUser().pipe(
      take(1),
      map(user => !!user),
      tap(isLogged => {
        if (!isLogged) {
          this.router.navigateByUrl('/login');
        }
      })
    )
  }

  canActivateChild() {
    return this.canActivate();
  }
}
