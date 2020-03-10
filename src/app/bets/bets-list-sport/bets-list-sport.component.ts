import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

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
  private authStatusSub: Subscription;
  private lotterySub: Subscription;
  private roleListenerSub: Subscription;

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

    this.roleListenerSub = this.authService.getUser().subscribe((user) => {
      this.isAdmin = user.roles.admin;
    });

  }

}
