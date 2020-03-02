import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component'
import { BetsRoutingModule } from './bets-routing.module';
import { MaterialModule } from '../material/material.module';
import { MatTableModule } from '@angular/material';
import { BetsListService } from '../core/services/bets-list.service';
import { FormsModule } from '@angular/forms';
import { BetsInDialogComponent } from './bets-in-dialog/bets-in-dialog.component';

@NgModule({
  declarations: [BetsListComponent, CreateLotteryComponent, BetsInDialogComponent],
  imports: [
    CommonModule,
    BetsRoutingModule,
    MaterialModule,
    MatTableModule,
    FormsModule,
    MatTableModule
  ], entryComponents: [
    BetsInDialogComponent
  ], providers: [BetsListService]
})
export class BetsModule { }
