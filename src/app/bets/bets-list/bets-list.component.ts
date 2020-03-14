import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BetsListService } from 'src/app/core/services/bets-list.service';
import { Subscription } from 'rxjs';
import { Lottery } from 'src/app/core/models/lottery.model';
import { MatDialog } from '@angular/material/dialog';
import { BetsInDialogComponent } from '../bets-dialog/bets-in-dialog/bets-in-dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bets-list',
  templateUrl: './bets-list.component.html',
  styleUrls: ['./bets-list.component.css']
})

export class BetsListComponent implements OnInit, OnDestroy {

  isAdmin: boolean;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  balance: number;
  private authStatusSub: Subscription;
  private lotterySub: Subscription;
  private roleListenerSub: Subscription;
  private userListenerSub: Subscription;

  ELEMENT_DATA: Lottery[];

  displayedColumns: string[];
  dataSource: Lottery[];


  private chosenNumbers: number[] = new Array(4);

  constructor(private authService: AuthService, public betService: BetsListService,
              public dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        // No está llegando acá, pero el servicio sí funciona
        this.userIsAuthenticated = isAuthenticated;
      });

    if (this.userIsAuthenticated) {
      this.userId = this.authService.getUserId();
      this.userListenerSub = this.authService.getUser()
        .subscribe(user => {
          this.balance = user.balance;
        });
    }
    this.betService.getLotteries();
    this.lotterySub = this.betService.getLotteryUpdateListener()
      .subscribe(lotteries => {
        this.ELEMENT_DATA = lotteries;
        this.dataSource = this.ELEMENT_DATA;
        this.displayedColumns = ['id', 'fare', 'closingDate', 'firstPrize',
          'secondPrize', 'thirdPrize', 'creationDate', 'open', 'actions'];
      });

    this.roleListenerSub = this.authService.getUser().subscribe((user) => {
      this.isAdmin = user.roles.admin;
    });
  }

  ngOnDestroy() {
    this.lotterySub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.roleListenerSub.unsubscribe();
  }

  onBet(row: Lottery) {
    this.chosenNumbers = [0, 0, 0, 0, 0];
    this.openBetDialog(row);
  }

  onDelete(row: Lottery) {
    this.isLoading = true;
    const id = row.id;
    this.betService.onDelete(id).subscribe(() => {
      this.betService.getLotteries();
    }, () => {
      this.isLoading = false;
    });
  }

  openBetDialog(row: Lottery) {
    const dialogRef = this.dialog.open(BetsInDialogComponent, {
      width: '950px',
      data: { lotteryId: row.id, balance: this.balance, fare: row.fare }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
      } else if (result === 'invalid') {
        this.openSnackBar('Los valores ingresados no son válidos');
      } else if (result) {
        this.chosenNumbers = [result.first, result.second, result.third, result.fourth, result.fifth];
        this.betService.onBet(row.id, this.userId, this.chosenNumbers)
          .subscribe(response => {
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
