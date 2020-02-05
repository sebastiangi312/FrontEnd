import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models';
import { AuthService } from './auth.service';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/profile/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private user: User;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

}
