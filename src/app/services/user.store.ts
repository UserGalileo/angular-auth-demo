import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private _user$ = new BehaviorSubject<User | null>(null);
  public user$ = this._user$.asObservable();

  setUser(user: User) {
    this._user$.next(user);
  }

  removeUser() {
    this._user$.next(null);
  }
}
