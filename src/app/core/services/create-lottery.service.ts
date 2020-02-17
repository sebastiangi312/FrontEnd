import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lottery } from '../models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '';

@Injectable({
  providedIn: 'root'
})
export class CreateLotteryService {

  private authStatusListener = new Subject<boolean>();

  createLottery( firstPrize: string, secondPrize: string, thirdPrize: string ) {
    const lottery: Lottery = { firstPrize, secondPrize, thirdPrize };
    this.http.post(BACKEND_URL + '/lottery', lottery);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }
}
