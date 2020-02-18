import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BetsListService } from 'src/app/core/services/bets-list.service';
import { Subscription } from 'rxjs';
import { Lottery } from 'src/app/core/models/lottery.model';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css']
})

export class BetsListComponent implements OnInit {

  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;
  private lotterySub: Subscription;

  ELEMENT_DATA: Lottery[];

  displayedColumns: string[];
  dataSource: Lottery[];

  constructor(private authService: AuthService,
    public betService: BetsListService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.betService.getLotteries();
    this.lotterySub = this.betService.getLotteryUpdateListener()
      .subscribe(lotteries => {
        this.ELEMENT_DATA = lotteries;
        this.dataSource = this.ELEMENT_DATA;
        this.displayedColumns = ['id', 'fare', 'closingDate', 'firstPrize',
          'secondPrize', 'thirdPrize', 'creationDate', 'open'];
      });
  }
}
