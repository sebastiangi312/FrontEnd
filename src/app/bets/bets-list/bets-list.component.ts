import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BetsListService } from 'src/app/core/services/bets-list.service';
import { Subscription } from 'rxjs';
import { Bet } from 'src/app/core/models/bet.model';

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


  bet: Bet = {
    id: 0,
    fechaCreacion: new Date(),
    fechaCierre: new Date(),
    firstPrice: 0,
    secondPrice: 0,
    thirdPrice: 0,
    fare: 0,
    open: true
  }


  displayedColumns: string[] = ['id', 'fechaCreacion', 'fechaCierre', 'Premio Mayor',
    'Segundo Premio', 'Tercer Premio', 'precio Boleta', 'Estado', 'Eliminar'];
  dataSource: any;

  constructor(private authService: AuthService,
              public betService: BetsListService) {}


  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.cargarBets();
  }

  delete() {
    this.betService.deleteBets(this.bet);
  }

  cargarBets(){
    /*this.dataSource = [
      {id: 1, fechaCreacion: new Date(), fechaCierre: new Date(), firstPrice: 10,
         secondPrice: 9, thirdPrice: 8, fare: 8, open: true},
         {id: 2, fechaCreacion: new Date(), fechaCierre: new Date(), firstPrice: 11,
          secondPrice: 10, thirdPrice: 8, fare: 8, open: false},
          {id: 3, fechaCreacion: new Date(), fechaCierre: new Date(), firstPrice: 10,
            secondPrice: 9, thirdPrice: 8, fare: 8, open: true}
    ];*/
    this.betService.cargarBets().subscribe( bets => this.dataSource = bets);
  }
}
