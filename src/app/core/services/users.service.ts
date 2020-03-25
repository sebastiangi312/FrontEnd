import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, Roles, Lottery } from '../models';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VerifyData } from '../models/verify-data.model';
import { AdminData } from '../models/admin-data.model';
import { Ticket } from '../models/ticket.model';
import { SportTicket } from '../models/sportTicket.model';
import { Match } from '../models/match.model';


const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // START My tickets
  private lotteryTickets: Ticket[];
  private sportTickets: SportTicket[];
  private matches: Match[];
  private lotteries: Lottery[];
  private lotteryTicketsUpdated = new Subject<{ tickets: Ticket[] }>();
  private sportTicketsUpdated = new Subject<{ tickets: SportTicket[] }>();
  private lotteriesUpdated = new Subject<{ lotteries: Lottery[] }>();
  private matchesUpdated = new Subject<{ matches: Match[] }>();
  // END My tickets
  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[]; userCount: number }>();

  constructor(private http: HttpClient, private router: Router) { }

  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; users: any; maxUsers: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(userData => {
          return {
            users: userData.users.map(user => {
              return {
                id: user._id, // MONGO
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                phone: user.phone,
                balance: user.balance,
                authorized: user.authorized,
                roles: user.roles
              };
            }),
            maxUsers: userData.maxUsers
          };
        })
      )
      .subscribe(transformedUserData => {
        this.users = transformedUserData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUserData.maxUsers
        });
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      email: string;
      birthdate: Date;
      phone: string;
      balance: number;
      authorized: boolean;
      roles: Roles;
    }>(BACKEND_URL + '/currentUser/' + id);
  }

  deleteUser(userId: string, idUserToAuthorize: string) {
    return this.http.delete(BACKEND_URL + '/' + userId);
  }

  authorizeUser(idUserToAuthorize: string, newBalance: number) {
    const verifyData: VerifyData = {
      idUserToAuthorize, newBalance
    };
    return this.http
      .put<{ message: string }>(
        BACKEND_URL + '/userAuth', verifyData
      );
  }

  deauthorizeUser(idUserToDeauthorize: string, newBalance = 0) {
    const verifyData: VerifyData = {
      idUserToAuthorize: idUserToDeauthorize, newBalance
    };
    return this.http
      .put<{ message: string }>(
        BACKEND_URL + '/userDeauth', verifyData
      );
  }


  // START My tickets

  fetchLotteryTickets() {
    this.http
      .get<{ message: string; tickets: any; }>(
        BACKEND_URL + '/myLotteryTickets'
      )
      .pipe(
        map(lotteryTicketsData => {
          return {
            lotteryTickets: lotteryTicketsData.tickets.map(ticket => {
              return {
                id: ticket._id,
                lotteryId: ticket.lotteryId,
                userId: ticket.userId,
                firstNumber: ticket.firstNumber,
                secondNumber: ticket.secondNumber,
                thirdNumber: ticket.thirdNumber,
                fourthNumber: ticket.fourthNumber,
                fifthNumber: ticket.fifthNumber
              };
            }),
          };
        })
      )
      .subscribe(transformedLotteryData => {
        this.lotteryTickets = transformedLotteryData.lotteryTickets;
        this.lotteryTicketsUpdated.next({
          tickets: [...this.lotteryTickets]
        });
      });
  }

  fetchSportTickets() {
    this.http
      .get<{ message: string; tickets: any; }>(
        BACKEND_URL + '/mySportTickets'
      )
      .pipe(
        map(sportTicketsData => {
          return {
            sportTickets: sportTicketsData.tickets.map(ticket => {
              return {
                id: ticket._id,
                userId: ticket.user,
                betValue: ticket.betValue,
                matchBets: ticket.matchBets,
                isWinner: ticket.isWinner,
                profit: ticket.profit,
                closingDate: new Date(ticket.closingDate)
              };
            }),
          };
        })
      )
      .subscribe(transformedSportTicketData => {
        this.sportTickets = transformedSportTicketData.sportTickets;
        this.sportTicketsUpdated.next({
          tickets: [...this.sportTickets]
        });
      });
  }

  fetchLotteries(ids: string[]) {
    this.http
      .get<{ message: string; lotteries: any; }>(
        BACKEND_URL + '/myLotteries', { params: { ids: ids } }
      )
      .pipe(
        map(lotteriesData => {
          return {
            lotteries: lotteriesData.lotteries.map(lottery => {
              return {
                id: lottery._id,
                fare: lottery.fare,
                closingDate: new Date(lottery.closingDate),
                firstPrize: lottery.firstPrize,
                secondPrize: lottery.secondPrize,
                thirdPrize: lottery.thirdPrize,
                creationDate: lottery.creationDate,
                open: lottery.open,
                firstPrizeWinners: lottery.firstPrizeWinners,
                secondPrizeWinners: lottery.secondPrizeWinners,
                thirdPrizeWinners: lottery.thirdPrizeWinners,
                winningNumbers: lottery.winningNumbers
              };
            }),
          };
        })
      )
      .subscribe(transformedLotteryData => {
        this.lotteries = transformedLotteryData.lotteries;
        this.lotteriesUpdated.next({
          lotteries: [...this.lotteries]
        });
      });
  }

  fetchMatches(ids: string[]) {
    this.http
      .get<{ message: string; matches: any; }>(
        BACKEND_URL + '/myMatches', { params: { ids: ids } }
      )
      .pipe(
        map(matchesData => {
          // console.log(matchesData);
          // No sé si score es string o number
          return {
            matches: matchesData.matches.map(match => {
              return {
                id: match._id,
                homeTeam: match.homeTeam,
                awayTeam: match.awayTeam,
                matchDate: new Date(match.matchDate),
                finalScoreBoard: match.finalScoreBoard,
                status: match.open
              };
            }),
          };
        })
      )
      .subscribe(transformedMatchesData => {
        this.matches = transformedMatchesData.matches;
        this.matchesUpdated.next({
          matches: [...this.matches]
        });
      });
  }

  getSportTickets() {
    return this.sportTickets;
  }

  getLotteryTickets() {
    return this.lotteryTickets;
  }

  getLotteryTicketsUpdateListener() {
    return this.lotteryTicketsUpdated.asObservable();
  }

  getLotteriesUpdateListener() {
    return this.lotteriesUpdated.asObservable();
  }
  getMatchesUpdateListener() {
    return this.matchesUpdated.asObservable();
  }

  getSportTicketsUpdateListener() {
    return this.sportTicketsUpdated.asObservable();
  }
  // END My Tickets

}
