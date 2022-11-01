import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    return this.authService.fetchUser().pipe(
      take(1),
      map(() => true),
      catchError(() => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    )
  }

  canActivateChild() {
    return this.canActivate();
  }
}
