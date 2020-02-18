import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component'
import { BetsRoutingModule } from './bets-routing.module';
import { MaterialModule } from '../material/material.module';
import { MatTableModule } from '@angular/material';
import { BetsListService } from '../core/services/bets-list.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BetsListComponent, CreateLotteryComponent],
  imports: [
    CommonModule,
    BetsRoutingModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    MatTableModule
  ],providers: [BetsListService]
})
export class BetsModule { }
