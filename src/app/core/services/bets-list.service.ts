import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Lottery } from '../models/lottery.model';
import { Ticket } from '../models/ticket.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


const BACKEND_URL = environment.apiUrl + '/lottery';
const TICKET_URL = environment.apiUrl + '/ticket';

@Injectable({
  providedIn: 'root'
})
export class BetsListService {


  lotteries: Lottery[];
  private lotteriesUpdated = new Subject<Lottery[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getLotteries() {
    this.http.get<{ message: string, result: any }>(BACKEND_URL).pipe(
      map(lotteryData => {
        return lotteryData.result.map(lottery => {
          return {
            id: lottery._id,
            fare: lottery.fare,
            closingDate: new Date(lottery.closingDate),
            firstPrize: lottery.firstPrize,
            secondPrize: lottery.secondPrize,
            thirdPrize: lottery.thirdPrize,
            creationDate: new Date(lottery.creationDate),
            open: lottery.open
          };
        });
      })
    ).subscribe(transformedLotteries => {
      this.lotteries = transformedLotteries;
      this.lotteriesUpdated.next([...this.lotteries]);
    });
  }

  onDelete(id: string) {
    return this.http.delete(BACKEND_URL + '/delete/' + id);
  }

  onBet(lotteryId: string, userId: string, chosenNumbers: number[]) {
    const ticketData: Ticket = {
      lotteryId: lotteryId,
      userId: userId,
      firstNumber: chosenNumbers[0],
      secondNumber: chosenNumbers[1],
      thirdNumber: chosenNumbers[2],
      fourthNumber: chosenNumbers[3],
      fifthNumber: chosenNumbers[4]
    };
    this.http.post<{ message: string }>(TICKET_URL + '/lotteryTicket', ticketData)
    .subscribe(response => {
      console.log(response.message);
    },
    error => {
      console.log(error);
    });
  }

  getLotteryUpdateListener() {
    return this.lotteriesUpdated.asObservable();
  }

  getLottery(id: string) {
    return { ...this.lotteries.find(p => p.id === id) };
  }
}
