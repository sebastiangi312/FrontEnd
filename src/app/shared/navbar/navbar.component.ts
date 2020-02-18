import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  isAdmin = false;
  private authListenerSubs: Subscription;
  private roleListenerSubs: Subscription;
  userId: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.userId = this.authService.getUserId();
    }
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.roleListenerSubs = this.authService.getUser().subscribe((user) => {
          this.isAdmin = false;
          this.isAdmin = user.roles.admin;
        });
        this.userIsAuthenticated = isAuthenticated;
      });

  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.roleListenerSubs.unsubscribe();
  }
}
