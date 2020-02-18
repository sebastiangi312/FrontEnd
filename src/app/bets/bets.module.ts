import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component'
import { BetsRoutingModule } from './bets-routing.module';
import { MaterialModule } from '../material/material.module';
import { MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BetsEditComponent } from './bets-edit/bets-edit.component';

@NgModule({
  declarations: [BetsListComponent, CreateLotteryComponent, BetsEditComponent],
  imports: [
    CommonModule,
    BetsRoutingModule,
    MaterialModule,
    MatTableModule,
    FormsModule
  ]
})
export class BetsModule { }
