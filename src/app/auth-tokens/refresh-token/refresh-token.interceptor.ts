import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthServiceForTokens } from './auth-service-for-tokens';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private isRefreshing$ = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthServiceForTokens) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      req = this.addTokenHeader(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        const isError = error instanceof HttpErrorResponse;
        const isStatus401 = error.status === 401;
        const isWhitelist = !req.url.includes('token');

        if (isError && isStatus401 && isWhitelist) {
          return this.handle401(req, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!this.isRefreshing$.getValue()) {
      this.isRefreshing$.next(true);

      const refreshToken = this.authService.getRefreshToken();

      if (refreshToken) {
        return this.authService.refreshToken(refreshToken).pipe(
          tap(({ accessToken, refreshToken }) => {
            this.authService.saveAccessToken(accessToken);
            this.authService.saveRefreshToken(refreshToken);
            this.isRefreshing$.next(false);
          }),
          switchMap(({ accessToken }) => {
            return next.handle(this.addTokenHeader(request, accessToken));
          }),
          catchError((err) => {
            this.isRefreshing$.next(false);
            this.authService.onRefreshError();
            return throwError(err);
          })
        )
      }

      this.isRefreshing$.next(false);
      this.authService.onRefreshError();
      return throwError('Missing refresh token');
    }

    return this.isRefreshing$.pipe(
      filter((is) => !is),
      take(1),
      switchMap(() => {
        const accessToken = this.authService.getAccessToken();
        return next.handle(this.addTokenHeader(request, accessToken));
      })
    )
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}
