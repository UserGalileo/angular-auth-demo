import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserStore } from '../services/user.store';
import { User } from '../models';
import { Observable, of } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { AuthServiceForTokens } from './refresh-token/auth-service-for-tokens';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthTokensService implements AuthService, AuthServiceForTokens {

  constructor(
    private router: Router,
    private http: HttpClient,
    private userStore: UserStore
  ) {}

  register(credentials: { email: string; password: string; name: string; surname: string }): Observable<boolean> {
    return this.http.post<boolean>(`${env.apiUrl}/register`, credentials);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}/login`, { email, password }).pipe(
      tap(({ access_token, refresh_token }) => {
        this.saveAccessToken(access_token);
        this.saveRefreshToken(refresh_token);
      }),
      switchMap(() => this.fetchUser())
    );
  }

  logout() {
    this.http.post(`${env.apiUrl}/logout`, {
      refresh_token: this.getRefreshToken()
    }).subscribe(() => {
      this.userStore.removeUser();
      localStorage.removeItem('at');
      localStorage.removeItem('rt');
      this.router.navigateByUrl('/login');
    })
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<User>(`${env.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          )
      })
    )
  }

  getAccessToken(): any {
    return localStorage.getItem('at') || '';
  }

  getRefreshToken(): any {
    return localStorage.getItem('rt') || '';
  }

  onRefreshError() {
    this.logout();
  }

  refreshToken(refreshToken: any): Observable<{ accessToken: any; refreshToken: any }> {
    return this.http.post<{ access_token: any, refresh_token: any }>(`${env.apiUrl}/token`, {
      refresh_token: refreshToken
    }).pipe(
      map(res => ({ accessToken: res.access_token, refreshToken: res.refresh_token }))
    )
  }

  saveAccessToken(accessToken: any) {
    localStorage.setItem('at', accessToken);
  }

  saveRefreshToken(refreshToken: any) {
    localStorage.setItem('rt', refreshToken);
  }
}
