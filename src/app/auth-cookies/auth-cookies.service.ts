import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserStore } from '../services/user.store';
import { environment as env } from '../../environments/environment';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthCookiesService implements AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore
  ) {
    this.http.get<void>(`${env.apiUrl}/csrf-token`).subscribe();
  }

  register(credentials: { email: string; password: string; name: string; surname: string }): Observable<boolean> {
    return this.http.post<boolean>(`${env.apiUrl}/register`, credentials);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${env.apiUrl}/login`, { email, password }).pipe(
      switchMap(() => this.fetchUser())
    );
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<any>(`${env.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          )
      })
    )
  }

  logout() {
    this.http.get<any>(`${env.apiUrl}/logout`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login');
    })
  }
}
