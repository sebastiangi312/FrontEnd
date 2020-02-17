import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

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
  
  ELEMENT_DATA: Bet[] = [];

  displayedColumns: string[] = ['id', 'fechaCreacion', 'fechaCierre', 'Premio Mayor',
  'Segundo Premio','Tercer Premio','precio Boleta','Estado'];
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

  cargarBets(){
  }
}

export interface Bet {
  id: number,
  fechaCreacion: Date,
  fechaCierre: Date,
  firstPrice: number,
  secondPrice: number,
  thirdPrice: number,
  fare: number,
  open: Boolean
}

