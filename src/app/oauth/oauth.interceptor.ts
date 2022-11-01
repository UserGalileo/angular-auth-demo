import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStore } from '../services/user.store';
import { Router } from '@angular/router';
import { OAuthService } from './oauth.service';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class OAuthInterceptor implements HttpInterceptor {

  constructor(
    private userStore: UserStore,
    private router: Router,
    private authService: OAuthService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.authService.getAccessToken()).pipe(
      switchMap(token => {
        req = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        })

        return next.handle(req).pipe(
          tap({
            error: error => {
              if (
                error instanceof HttpErrorResponse
                && error.status === 401
              ) {
                this.userStore.removeUser();
                this.router.navigateByUrl('/login');
              }
            }
          })
        )
      })
    )
  }
}
