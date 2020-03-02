import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from '../models/user-data.model';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class VerifiedListService {
  private verifiedUsers: UserData[] = [];
  private verifiedUsersUpdated = new Subject<{ users: UserData[]; userCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthorizedUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, users: any, maxUsers: number }>(BACKEND_URL + 'authUsers/list').pipe(
      map(verifiedUsers => {
        return{
        verifiedUser: verifiedUsers.users.map(users => {
          return {
            id: users._id,
            name: users.name,
            email: users.email,
            birthdate: users.birthdate,
            phone: users.phone,
            balance: users.balance,
          };
        }),
        maxUsers: verifiedUsers.maxUsers
      };
      })
      ).subscribe((transformedVerifiedUsers) => {
        this.verifiedUsers = transformedVerifiedUsers.verifiedUser;
        this.verifiedUsersUpdated.next({
          users: [...this.verifiedUsers],
          userCount: transformedVerifiedUsers.maxUsers
        });
      });
  }

  getAuthorizedUpdateListener() {
    return this.verifiedUsersUpdated.asObservable();
  }

}