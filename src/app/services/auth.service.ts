import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userBehavior = new BehaviorSubject<User | null>(null);
  private _user = new BehaviorSubject<User>({} as User);
  $user = this._user.asObservable().pipe(skip(1));
  private tokenTag: string = 'ase-auth-token';
  constructor(private cookies: CookieService) {}

  set token(token: string) {
    try {
      let user: User = jwt_decode(token);
      if (user.NomEmpleado) this._user.next(this.parseUser(user));
    } catch (er: any) {
      //LOG OUT
    }
    this.cookies.set('user-token', token);
  }
  get token() {
    return this.cookies.get('user-token');
  }
  get user(): User {
    return this._user.value as User;
  }
  setToken(token: string | null): void {
    let user: any;
    try {
      user = jwt_decode(token as string);
      if (user['Correo']) this._user.next(this.parseUser(user));
    } catch (err) {
      user = null;
    }
    this.cookies.set(this.tokenTag, token as string);
  }
  parseUser(userFromToken: any): User {
    return {
      NumEmpleado: parseInt(userFromToken['NumEmpleado']),
      NomEmpleado: userFromToken['NomEmpleado'],
      Apaterno: userFromToken['Apaterno'],
      Amaterno: userFromToken['Amaterno'],
      Puesto: userFromToken['Puesto'],
    } as User;
  }
  validateToken(): boolean {
    try {
      const token = this.cookies.get('user-token');
      if (!token) return false;
      let user: User = jwt_decode(token);
      if (user && user.NomEmpleado) {
        return true;
      } else return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getUser(): User {
    let token = this.token;
    try {
      let user: any = jwt_decode(token);
      return this.parseUser(user);
    } catch (err) {
      return {};
    }
  }
  clearCredentials() {
    this.setToken(null);
  }
}
