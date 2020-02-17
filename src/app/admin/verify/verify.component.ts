import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/core/models/';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '../../core/models/user.model';
import {UsersService } from '../../core/services/users.service';

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
  users: User[] = [];

  totalUsers = 0;
  usersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private usersSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public usersService: UsersService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
  }

}
