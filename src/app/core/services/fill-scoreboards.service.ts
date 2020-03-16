import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Charge } from '../models/charge.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Match } from '../models/match.model';
import { MatchScores } from '../models/match-scores.model';
import { AdminData } from '../models/admin-data.model';
import { AuthService } from 'src/app/core/services/auth.service';


const BACKEND_URL = environment.apiUrl + '/match';
const SPORT_TICKET_URL = environment.apiUrl + '/sportTicket';

@Injectable({
  providedIn: 'root'
})
export class FillScoreboardsService {

  private matches: Match[] = [];
  private matchesUpdated = new Subject<{ matches: Match[]; matchCount: number }>();
  private matchId: string;
  private homeScore: number;
  private awayScore: number;

  constructor(private http: HttpClient, private router: Router) { }

  getMatchId() {
    return this.matchId;
  }

  getMatches(matchesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${matchesPerPage}&page=${currentPage}`;
    this.http
      .get<{ maxMatches: number; message: string; match: any; }>(
        BACKEND_URL + '/nonFilled' + queryParams
      )
      .pipe(
        map(matchData => {
          return {
            matches: matchData.match.map(partido => {
              return {
                id: partido._id, // MONGO
                homeTeam: partido.homeTeam,
                awayTeam: partido.awayTeam,
                matchDate: partido.matchDate,
              };
            }),
            maxMatches: matchData.maxMatches
          };
        })
      )
      .subscribe(transformedMatchData => {
        this.matches = transformedMatchData.matches;
        this.matchesUpdated.next({
          matches: [...this.matches],
          matchCount: transformedMatchData.maxMatches
        });
      });
  }

  getMatchUpdateListener() {
    return this.matchesUpdated.asObservable();
  }

  getMatch(id: string) {
    return this.http.get<{
      _id: string;
      homeTeam: string;
      awayTeam: string;
      matchDate: Date;
    }>(BACKEND_URL + id);
  }

  saveScores(matchId: string, homeScore: number, awayScore: number) {
    const matchData: MatchScores = {
      matchId,
      homeScore,
      awayScore
    };
    return this.http
      .put<{ message: string }>(
        BACKEND_URL + '/saveScores', matchData
      );
  }

  setSportWinners() {
    return this.http.put<{ message: string }>(SPORT_TICKET_URL + '/setSportWinners', {});
  }

}

