import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/core/models/';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '../../core/models/user.model';
import { UsersService } from '../../core/services/users.service';
import { PageEvent } from '@angular/material';
import { UserData } from 'src/app/core/models/user-data.model';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})

export class VerifyComponent implements OnInit {
  /*users = [
    {id: '1042882229', name: 'Toby Lleras Rojas',
    email: 'email@gashito.com', password: '@Sai29S*',
    birthdate: '7/2/2002', phone: '300', balance: 300000,
    authorized: true, roles: { subscriber: true } },
    {},
    {},
    {}
  ]*/
  isLoading = false;
  users: UserData[] = [];

  totalUsers = 0;
  usersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private usersSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public usersService: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.users = [
      {
        id: 'user1', name: 'Sebas', email: 'sebas@gmail.com', birthdate: new Date(),
        phone: '301301301', balance: 0, roles: { subscriber: true }
      },
      {
        id: 'user2', name: 'Santi', email: 'santi@gmail.com', birthdate: new Date(),
        phone: '301301302', balance: 0, roles: { subscriber: true }
      },
      {
        id: 'user1', name: 'Sebas', email: 'sebas@gmail.com', birthdate: new Date(),
        phone: '301301301', balance: 0, roles: { bettor: true }
      }
    ]
    /*
    this.isLoading = true;
    this.usersService.getUsers(this.usersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.usersSub = this.usersService
      .getUserUpdateListener()
      .subscribe((userData: { users: User[]; userCount: number }) => {
        this.isLoading = false;
        this.totalUsers = userData.userCount;
        this.users = userData.users;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
      */
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.usersService.getUsers(this.usersPerPage, this.currentPage);
  }

  onDelete(userId: string, idUserToDelete: string) {
    this.isLoading = true;
    this.usersService.deleteUser(userId, idUserToDelete).subscribe(() => {
      this.usersService.getUsers(this.usersPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onVerify(idUserToAuthorize: string) {
    this.isLoading = true;
    /*this.usersService.verifyUser(idUserToAuthorize).subscribe(() => {

      this.usersService.getUsers(this.usersPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });*/
  }

}
