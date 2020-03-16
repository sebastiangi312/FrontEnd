import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roles, User, AuthData } from '../models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUser() {
    const userId = this.getUserId();
    return this.http.get<{
      id: string;
      name: string;
      email: string;
      birthdate: Date;
      phone: string;
      balance: number;
      roles: Roles;
    }>(BACKEND_URL + '/currentUser/' + userId);
  }

  editUser(email: string, phone: string, password: string, newPassword: string) {
    const userId = this.getUserId();
    return this.http
      .put(BACKEND_URL + '/' + userId, { userId, phone, email, password, newPassword })
      .subscribe(response => {
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/profile/', userId]);
        })
      });
  }

  createUser(id: string, name: string, email: string, password: string, birthdate: Date,
    phone: string) {
    const user: User = { id, name, email, password, birthdate, phone, balance: 0, authorized: true, roles: { subscriber: true } };
    this.http.post(BACKEND_URL + '/signup', user)
      .subscribe(
        () => {
          this.login(email, password);
          this.router.navigate(['/']);
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(email: string, password: string) {
    const authData: AuthData = { email, password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        BACKEND_URL + '/login',
        authData
      )
      .subscribe(
        response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  // Check role auth

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  canRead(user: User) {
    const allowed = ['admin', 'editor', 'subscriber', 'bettor'];
    return this.checkAuthorization(user, allowed);
  }

  canBet(user: User) {
    const allowed = ['admin', 'editor', 'bettor'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User) {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User) {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  constructor(private http: HttpClient, private router: Router) { }
}
