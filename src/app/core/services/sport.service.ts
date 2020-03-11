import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, subscribeOn } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SportBet } from '../models/sportBet.model';
import { GlobalBalance } from '../models/global-balance.model';
import { stringify } from 'querystring';

const BACKEND_URL = environment.apiUrl + '/sportBet';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  sportBets: SportBet[];
  private sportBetsUpdated = new Subject<SportBet[]>();
  globalBalance: GlobalBalance;

  constructor(private http: HttpClient, private rout: Router) { }

  getSportBets() {
    this.http.get<{message: string, result: any}>(BACKEND_URL)
    .pipe(
      map(sportBetsData => {
        return sportBetsData.result.map(sportBet => {
          return {
            id: sportBet._id,
            homeTeam: sportBet.homeTeam,
            awayTeam: sportBet.awayTeam,
            matchDate: new Date(sportBet.matchDate),
            open: sportBet.open
          };
        });
      })
    )
    .subscribe(transformedSportBetsData => {
      this.sportBets = transformedSportBetsData;
      this.sportBets.forEach(item => {
        const now = new Date();
        if(item.open && item.matchDate <= now) {
          this.http.put<{message: string}>(BACKEND_URL + '/close', { sportBetId: item.id });
        }
      });
      this.sportBetsUpdated.next([...this.sportBets]);
    });
  }
}
