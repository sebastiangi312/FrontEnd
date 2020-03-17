import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, concat, pipe } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ChargeMoneyComponent } from '../charge-money/charge-money.component';
import { CreateMoneyChargeService } from 'src/app/core/services/create-money-charge.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  isAdmin = false;
  private authListenerSubs: Subscription;
  currentBalance: number;
  userId: string;
  amount: number;
  userName: string;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private chargeMoneyService: CreateMoneyChargeService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    if (this.userIsAuthenticated) {
      this.userId = this.authService.getUserId();
    }
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if (this.userIsAuthenticated) {
          this.isAdmin = this.authService.getUserRoles().admin ? true : false;
        } else {
          this.isAdmin = false;
        }
        this.userId = this.authService.getUserId();
        this.userName = this.authService.getUserName();
        this.currentBalance = this.authService.getUserBalance();
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChargeMoneyComponent, {
      width: '250px',
      data: { money: this.amount }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result > 0) {
        this.amount = result;
        this.chargeMoneyService.createTransaction(
          this.userId,
          this.userName,
          this.amount
        );
      }
    });
  }
}
