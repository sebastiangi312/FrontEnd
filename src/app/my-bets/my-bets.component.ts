import { Component, OnInit } from '@angular/core';
import { Ticket } from '../core/models/ticket.model';
import { SportTicket } from '../core/models/sportTicket.model';
import { UsersService } from '../core/services/users.service';
import { Subscription } from 'rxjs';
import { switchMap, concatMap, map } from 'rxjs/operators';
import { Match } from '../core/models/match.model';
import { Lottery } from '../core/models';

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css']
})
export class MyBetsComponent implements OnInit {
  isLoading = false;
  lotteryTickets: Ticket[];
  sportTickets: SportTicket[];
  lotteries: Lottery[];
  matches: Match[];
  now: Date;
  private lotteryTicketsSub: Subscription;
  private sportTicketsSub: Subscription;
  private lotteriesSub: Subscription;
  private matchesSub: Subscription;
  constructor(public userService: UsersService) { }

  ngOnInit() {
    this.now = new Date();
    this.isLoading = true;
    this.userService.fetchLotteryTickets();
    this.userService.fetchSportTickets();
    this.lotteryTicketsSub = this.userService
      .getLotteryTicketsUpdateListener()
      .pipe(
        concatMap(tickets => {
          this.lotteryTickets = tickets.tickets;
          const lotteryIds = tickets.tickets.map(ticket => ticket.lotteryId);
          this.userService.fetchLotteries(lotteryIds);
          return this.userService.getLotteriesUpdateListener();
        })
      )
      .subscribe(lotteryData => {
        this.isLoading = false;
        this.lotteries = lotteryData.lotteries;
      });
    this.sportTicketsSub = this.userService
      .getSportTicketsUpdateListener()
      .pipe(
        concatMap(tickets => {
          this.sportTickets = tickets.tickets;
          const matchesIds2d = tickets.tickets.map(ticket => ticket.matchBets.map(matchBet => matchBet.match));
          const matchesIds = [].concat.apply([], matchesIds2d);
          this.userService.fetchMatches(matchesIds);
          return this.userService.getMatchesUpdateListener();
        })
      )
      .subscribe(data => {
        this.isLoading = false;
        this.matches = data.matches.sort((x, y) => (x.status === y.status) ? 0 : x.status ? -1 : 1);;
      });
  }

  getLottery(lotteryId: string) {
    if (this.lotteries) {
      const lotteryArray = this.lotteries.filter(lot => lot.id === lotteryId);
      const lottery = lotteryArray[0];
      return lottery;
    }
    return;
  }

  getWinnings(ticket: Ticket) {
    const lottery = this.getLottery(ticket.lotteryId);
    const ticketId = ticket.id;
    if (typeof lottery === 'object') {
      if (lottery.firstPrizeWinners.includes(ticketId)) {
        return lottery.firstPrize;
      } else if (lottery.secondPrizeWinners.includes(ticketId)) {
        return lottery.secondPrize;
      } else if (lottery.thirdPrizeWinners.includes(ticketId)) {
        return lottery.thirdPrize;
      }
      return false;
    } else {
      return false;
    }
  }

  getMatch(matchId: string) {
    if (this.matches) {
      const matchesArray = this.matches.filter(m => m.id === matchId);
      if (matchesArray.length > 0) {
        const match = matchesArray[0];
        return match;
      }
    }
    return;
  }

}
