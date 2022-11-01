import { User } from '../models';
import { Observable } from 'rxjs';

export abstract class AuthService {
  abstract register(credentials: { email: string, password: string, name: string, surname: string }): Observable<boolean>;
  abstract login(email: string, password: string): Observable<boolean>;
  abstract fetchUser(forceReload?: boolean): Observable<User>;
  abstract logout(): void;
}
