import { GlobalBalance } from '../models/global-balance.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Lottery } from '../models/lottery.model';
import { Ticket } from '../models/ticket.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + "/lottery";
const ADMIN_URL = environment.apiUrl + '/admin';
const TICKET_URL = environment.apiUrl + '/ticket';

@Injectable({
  providedIn: 'root'
})
export class BetsListService {


  lotteries: Lottery[];
  private lotteriesUpdated = new Subject<Lottery[]>();
  globalBalance: GlobalBalance;

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

      this.lotteries.forEach(item => {
        const now = new Date();
        if (item.open && item.closingDate <= now) {
          this.http.put<{ message: string }>(BACKEND_URL + '/close', { lotteryId: item.id });
        }
      });

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
    return this.http.post<{ message: string }>(TICKET_URL + '/lotteryTicket', ticketData);
  }

  getLotteryUpdateListener() {
    return this.lotteriesUpdated.asObservable();
  }

  getLottery(id: string) {
    return { ...this.lotteries.find(p => p.id === id) };
  }

  getGlobalBalance() {
    this.http.get<{ message: string, result: any }>(ADMIN_URL + '/globalBalance')
      .subscribe((globalBalanceData) => {
        this.globalBalance.id = globalBalanceData.result._id;
        this.globalBalance.value = globalBalanceData.result.value;
      });
  }
}
