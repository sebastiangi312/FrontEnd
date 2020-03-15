import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBetsRoutingModule } from './my-bets-routing.module';
import { MyBetsComponent } from './my-bets.component';
import { LotteryComponent } from './lottery/lottery.component';
import { SportsComponent } from './sports/sports.component';


@NgModule({
  declarations: [MyBetsComponent, LotteryComponent, SportsComponent],
  imports: [
    CommonModule,
    MyBetsRoutingModule
  ]
})
export class MyBetsModule { }
