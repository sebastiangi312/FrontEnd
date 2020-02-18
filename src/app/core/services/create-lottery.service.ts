import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/lottery';

@Injectable({
  providedIn: 'root'
})
export class CreateLotteryService {

  createLottery(
    fare: number, closingDate: Date,
    firstPrize: number, secondPrize: number, thirdPrize: number) {

    const data = { fare, closingDate, firstPrize, secondPrize, thirdPrize };
    this.http
      .post(BACKEND_URL, data
      )
      .subscribe(result => {
        this.router.navigate(['/bets/list']);
      });
  }

  editLottery(id: string, fare: number, closingDate: Date, firstPrize: number, secondPrize: number, thirdPrize: number) {
    const editData = { fare, closingDate, firstPrize, secondPrize, thirdPrize };
    this.http.put(BACKEND_URL + '/edit/' + id, editData).subscribe(result => {
      this.router.navigate(['/bets/list']);
    })
  }

  constructor(private http: HttpClient, private router: Router) { }
}
