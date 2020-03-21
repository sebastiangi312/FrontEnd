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

  constructor(private http: HttpClient, private router: Router) { }

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private userCedula: string;
  private userName: string;
  private userBalance: number;
  private userBirthdate: Date;
  private userPhone: string;
  private userRoles: Roles;
  private userEmail: string;
  private authStatusListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  // Get atributos del usuario (no podemos hacer getUser porque trae contraseña y demás datos).
  getUserId() {
    return this.userId;
  }
  getUserName() {
    return this.userName;
  }
  getUserCedula() {
    return this.userCedula;
  }
  getUserBalance() {
    return this.userBalance;
  }
  getUserBirthdate() {
    return this.userBirthdate;
  }
  getUserPhone() {
    return this.userPhone;
  }
  getUserRoles() {
    return this.userRoles;
  }
  getUserEmail() {
    return this.userEmail;
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
      .post<{
        token: string; expiresIn: number; userId: string; id: string; name: string; email: string;
        birthdate: Date; phone: string; balance: number; roles: Roles
      }>(
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
            this.userRoles = response.roles;
            this.userId = response.userId;
            this.userCedula = response.id;
            this.userName = response.name;
            this.userBalance = response.balance;
            this.userBirthdate = response.birthdate;
            this.userPhone = response.phone;
            this.userEmail = response.email;
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
      // Esto a veces pasa muy tarde.
      this.getUser()
        .subscribe(user => {
          this.userRoles = user.roles;
          this.userCedula = user.id;
          this.userName = user.name;
          this.userPhone = user.phone;
          this.userBalance = user.balance;
          this.userBirthdate = user.birthdate;
          this.userEmail = user.email;
          this.authStatusListener.next(true);
        });
    }
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.userCedula = null;
    this.userName = null;
    this.userPhone = null;
    this.userBalance = null;
    this.userBirthdate = null;
    this.userRoles = null;
    this.userEmail = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
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

  private checkAuthorization(roles: Roles, allowedRoles: string[]): boolean {
    if (!roles) { return false; }
    for (const role of allowedRoles) {
      if (roles[role]) {
        return true;
      }
    }
    return false;
  }

  canRead() {
    const roles = this.getUserRoles();
    const allowed = ['admin', 'editor', 'subscriber', 'bettor'];
    return this.checkAuthorization(roles, allowed);
  }

  canBet() {
    const roles = this.getUserRoles();
    const allowed = ['admin', 'editor', 'bettor'];
    return this.checkAuthorization(roles, allowed);
  }

  canEdit() {
    const roles = this.getUserRoles();
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(roles, allowed);
  }

  canDelete() {
    const roles = this.getUserRoles();
    const allowed = ['admin'];
    return this.checkAuthorization(roles, allowed);
  }
}
