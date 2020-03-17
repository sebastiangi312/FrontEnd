import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

import { User } from '../../core/models/user.model';
import { PageEvent } from '@angular/material';
import { UserData } from 'src/app/core/models/user-data.model';
import { VerifiedListService } from '../../core/services/verified-list.service';

@Component({
  selector: 'app-verified-list',
  templateUrl: './verified-list.component.html',
  styleUrls: ['./verified-list.component.css']
})
export class VerifiedListComponent implements OnInit, OnDestroy {

  isLoading = false;
  verifiedUsers: UserData[] = [];

  totalUsers = 0;
  usersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  isAdmin: boolean;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;
  private VerifiedUsersSub: Subscription;

  constructor(public verifiedListService: VerifiedListService, private authService: AuthService) { }

  ngOnInit() {

    this.isLoading = true;
    this.verifiedListService.getAuthorizedUsers(this.usersPerPage, this.currentPage);

    this.VerifiedUsersSub = this.verifiedListService
      .getAuthorizedUpdateListener()
      .subscribe((userData: { users: User[]; userCount: number }) => {
        this.isLoading = false;
        this.totalUsers = userData.userCount;
        this.verifiedUsers = userData.users;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();

    if (this.userIsAuthenticated) {
      this.userId = this.authService.getUserId();
    }

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        if (this.userIsAuthenticated) {
          this.isAdmin = this.authService.getUserRoles().admin ? true : false;
        } else {
          this.isAdmin = false;
        }
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  /*this.verifiedUsers = [
    {id: '1042882229', name: 'Toby Lleras Rojas', email: 'email@gashito.com',
    birthdate: null, phone: '300', balance: 300000, roles: { subscriber: true } },
    {id: '10428321229', name: 'Pito Lleras Rojas', email: 'email2@gashito.com',
    birthdate: null, phone: '301', balance: 300000, roles: { subscriber: true } },
  ]*/

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.verifiedListService.getAuthorizedUsers(this.usersPerPage, this.currentPage);
  }
}
