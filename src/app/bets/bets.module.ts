import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MatTableModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component';
import { CreateSportComponent } from './bets-create/sport/create-sport/create-sport/create-sport.component';
import { BetsListSportComponent } from './bets-list-sport/bets-list-sport.component';
import { BetsInDialogComponent } from './bets-dialog/bets-in-dialog/bets-in-dialog.component';
import { BetsListService } from '../core/services/bets-list.service';
import { SportService } from '../core/services/sport.service';
import { BetsRoutingModule } from './bets-routing.module';
import { BetsSportInDialogComponent } from './bets-dialog/bets-sport-in-dialog/bets-sport-in-dialog.component';
@NgModule({
  declarations: [BetsListComponent, CreateLotteryComponent, CreateSportComponent,
                BetsListSportComponent, BetsInDialogComponent, BetsSportInDialogComponent],

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
    BetsInDialogComponent,
    BetsSportInDialogComponent
  ], providers: [BetsListService, SportService]

})
export class BetsModule { }
