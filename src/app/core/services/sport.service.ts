import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatchBet } from '../models/matchBet.model';
import { GlobalBalance } from '../models/global-balance.model';

const BACKEND_URL = environment.apiUrl + '/match';
const ADMIN_URL = environment.apiUrl + '/admin';
const TICKET_URL = environment.apiUrl + '/sportTicket';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  matchBets: MatchBet[];
  private matchBetsUpdated = new Subject<MatchBet[]>();
  globalBalance: GlobalBalance;

  constructor(private http: HttpClient, private rout: Router) { }

  getMatchBets() {
    this.http.get<{ message: string, result: any }>(BACKEND_URL)
      .pipe(
        map(matchBetsData => {
          return matchBetsData.result.map(matchBet => {
            return {
              id: matchBet._id,
              homeTeam: matchBet.homeTeam,
              awayTeam: matchBet.awayTeam,
              matchDate: new Date(matchBet.matchDate),
              open: matchBet.open
            };
          });
        })
      )
      .subscribe(transformedMatchBetsData => {
        this.matchBets = transformedMatchBetsData;
        this.matchBets.forEach(item => {
          const now = new Date();
          if (item.open && item.matchDate <= now) {
            this.http.put<{ message: string }>(BACKEND_URL + '/close', { matchBetId: item.id });
          }
        });
        this.matchBetsUpdated.next([...this.matchBets]);
      });
  }

  getMatchBetUpdateListener() {
    return this.matchBetsUpdated.asObservable();
  }

  getMatchBet(id: string) {
    return { ...this.matchBets.find(p => p.id === id) };
  }

  getGlobalBalance() {
    this.http.get<{ message: string, result: any }>(ADMIN_URL + '/globalBalance')
      .subscribe((globalBalanceData) => {
        this.globalBalance.id = globalBalanceData.result._id;
        this.globalBalance.value = globalBalanceData.result.value;
      });
  }

  createSportTicket() {
    // post
  }

}
