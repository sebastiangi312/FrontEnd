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

/*Falta llamar el ID de la apuesta para saber que apuesta se está editando*/

export class EditLotteryService {

  editLottery(
    fare: number, closingDate: Date,
    firstPrize: number, secondPrize: number, thirdPrize: number ) {

    const data = { fare, closingDate, firstPrize, secondPrize, thirdPrize };
    this.http
    .post(BACKEND_URL + '/bets-edit', data
    )
    .subscribe(result => {
      this.router.navigate(['/bets/list']);
    });
  }

  constructor(private http: HttpClient, private router: Router) { }
}
