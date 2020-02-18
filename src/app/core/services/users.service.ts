import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, Roles } from '../models';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VerifyData } from '../models/verify-data.model';
import { AdminData } from '../models/admin-data.model';


const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[]; userCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(userData => {
          return {
            users: userData.users.map(user => {
              return {
                id: user._id, // MONGO
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                phone: user.phone,
                balance: user.balance,
                authorized: user.authorized,
                roles: user.roles
              };
            }),
            maxUsers: userData.maxUsers
          };
        })
      )
      .subscribe(transformedUserData => {
        this.users = transformedUserData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUserData.maxUsers
        });
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      email: string;
      birthdate: Date;
      phone: string;
      balance: number;
      authorized: boolean;
      roles: Roles;
    }>(BACKEND_URL + id);
  }

  deleteUser(userId: string, idUserToAuthorize: string) {
    return this.http.delete(BACKEND_URL + userId);
  }

  verifyUser(userId: string, idUserToAuthorize: string) {
    const adminData: AdminData = {
      userId
    };
    const verifyData: VerifyData = {
      idUserToAuthorize
    };
    this.http
      .put<{ message: string }>(
        BACKEND_URL + './userAuth', verifyData// , verifyData
      )
      .subscribe();
  }

}
