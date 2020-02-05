import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

}
