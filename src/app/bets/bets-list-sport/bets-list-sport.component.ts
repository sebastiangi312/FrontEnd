import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatchBet } from 'src/app/core/models/matchBet.model';
import { SportService } from 'src/app/core/services/sport.service';
import { SelectionModel } from '@angular/cdk/collections';
import { BetsSportInDialogComponent } from '../bets-dialog/bets-sport-in-dialog/bets-sport-in-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SportTicket } from 'src/app/core/models/sportTicket.model';

@Component({
  selector: 'app-bets-list-sport',
  templateUrl: './bets-list-sport.component.html',
  styleUrls: ['./bets-list-sport.component.css']
})
export class BetsListSportComponent implements OnInit, OnDestroy {

  isAdmin: boolean;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  balance: number;
  chosenMatches: MatchBet[] = new Array();
  private authStatusSub: Subscription;
  private matchBetSub: Subscription;
  private roleListenerSub: Subscription;
  private userListenerSub: Subscription;

  ELEMENT_DATA: MatchBet[];
  displayedColumns: string[];
  dataSource: MatchBet[];
  selection = new SelectionModel<MatchBet>(true, []);

  constructor(private authService: AuthService, public dialog: MatDialog,
    public sportService: SportService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    if (this.userIsAuthenticated) {
      this.userId = this.authService.getUserId();
      this.userListenerSub = this.authService.getUser()
        .subscribe(user => {
          this.balance = user.balance;
        });
    }
    this.sportService.getMatchBets();
    this.matchBetSub = this.sportService.getMatchBetUpdateListener()
      .subscribe(matchBets => {
        this.ELEMENT_DATA = matchBets;
        this.dataSource = this.ELEMENT_DATA;
        this.displayedColumns = ['id', 'homeTeam', 'awayTeam', 'finalScoreBoard', 'matchDate', 'open', 'actions'];
      });
    this.roleListenerSub = this.authService.getUser().subscribe((user) => {
      this.isAdmin = user.roles.admin;
    });
  }

  ngOnDestroy() {
    this.matchBetSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.roleListenerSub.unsubscribe();
  }

  onSelect(row: MatchBet, selection: SelectionModel<MatchBet>) {
    selection.toggle(row);
    if (selection.isSelected(row)) {
      if (!this.chosenMatches.find(p => p.id === row.id)) {
        this.chosenMatches.push(row);
      }
    } else {
      const i: number = this.chosenMatches.findIndex(p => p.id === row.id);
      if (i !== -1) {
        this.chosenMatches.splice(i, 1);
      }
    }
  }

  onBet() {
    const dialogRef = this.dialog.open(BetsSportInDialogComponent, {
      width: '500px',
      data: { chosenMatches: this.chosenMatches, balance: this.balance }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
      } else if (result === 'invalid') {
        this.openSnackBar('Los valores ingresados no son válidos');
      } else if (result) {
        const matchBets: { match: string, scoreBoard: string }[] = new Array();
        for (let i = 0; i < this.chosenMatches.length; i++) {
          matchBets.push({
            match: this.chosenMatches[i].id,
            scoreBoard: result.formArray[i].homeScore + '-' + result.formArray[i].awayScore
          });
        }
        const data: SportTicket = { userId: this.userId, betValue: result.betValue, matchBets: matchBets };
        console.log(data);
        this.sportService.onBet(data)
          .subscribe(
            response => {
              this.openSnackBar('Ticket creado exitosamente');
            },
            error => {
              this.openSnackBar('Hubo un error interno');
            });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 5000 });
  }

}
