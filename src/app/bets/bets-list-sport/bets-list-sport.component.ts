import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SportBet } from 'src/app/core/models/sportBet.model';
import { SportService } from 'src/app/core/services/sport.service';
@Component({
  selector: 'app-bets-list-sport',
  templateUrl: './bets-list-sport.component.html',
  styleUrls: ['./bets-list-sport.component.css']
})
export class BetsListSportComponent implements OnInit {

  isAdmin: boolean;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  balance: number;
  private authStatusSub: Subscription;
  private sportBetSub: Subscription;
  private roleListenerSub: Subscription;
  private userListenerSub: Subscription;

  ELEMENT_DATA: SportBet[];
  displayedColumns: string[];
  dataSource: SportBet[];

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

    // this.sportService.getSportBets();

    this.roleListenerSub = this.authService.getUser().subscribe((user) => {
      this.isAdmin = user.roles.admin;
    });

  }

}
