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
  
  ELEMENT_DATA: Bet[] = [
    {id: 1, fechaCreacion: new Date(), fechaCierre: new Date, firstPrice: 10, price: 5},
    {id: 2, fechaCreacion: new Date(), fechaCierre: new Date, firstPrice: 11, price: 6},
    {id: 3, fechaCreacion: new Date(), fechaCierre: new Date, firstPrice: 12, price: 7}
  ];

  displayedColumns: string[] = ['id', 'fechaCreacion', 'fechaCierre', 'firstPrice','price'];
  dataSource = this.ELEMENT_DATA;

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

export interface Bet {
  id: number,
  fechaCreacion: Date,
  fechaCierre: Date,
  firstPrice: number,
  price: number
}

