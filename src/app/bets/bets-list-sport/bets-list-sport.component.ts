import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatchBet } from 'src/app/core/models/matchBet.model';
import { SportService } from 'src/app/core/services/sport.service';
import { SelectionModel } from '@angular/cdk/collections';

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
  private authStatusSub: Subscription;
  private matchBetSub: Subscription;
  private roleListenerSub: Subscription;
  private userListenerSub: Subscription;

  ELEMENT_DATA: MatchBet[];
  displayedColumns: string[];
  dataSource: MatchBet[];
  selection = new SelectionModel<MatchBet>(true, []);

  constructor(private authService: AuthService, public sportService: SportService) { }

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
        this.displayedColumns = ['id', 'homeTeam', 'awayTeam', 'matchDate', 'open', 'actions'];
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MatchBet): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} todos`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} partido ${row.homeTeam + '-' + row.awayTeam}`;
  }

  onSelect(event: Event, row: MatchBet) {
    console.log(event);
    console.log(row);
  }
  onBet(matches: MatchBet[]) {

  }
}
