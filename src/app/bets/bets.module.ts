import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component'
import { BetsRoutingModule } from './bets-routing.module';
import { MaterialModule } from '../material/material.module';
import { MatTableModule, MatInputModule } from '@angular/material';
import { BetsListService } from '../core/services/bets-list.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSportComponent } from './bets-create/sport/create-sport/create-sport/create-sport.component';
import { BetsListSportComponent } from './bets-list-sport/bets-list-sport.component';
import { BetsInDialogComponent } from './bets-in-dialog/bets-in-dialog.component';

@NgModule({
  declarations: [BetsListComponent, CreateLotteryComponent, CreateSportComponent, BetsListSportComponent, BetsInDialogComponent],

  
  imports: [
    CommonModule,
    BetsRoutingModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule
  ], entryComponents: [
    BetsInDialogComponent
  ], providers: [BetsListService]

})
export class BetsModule { }
