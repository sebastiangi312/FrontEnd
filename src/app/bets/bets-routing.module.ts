import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component';
import { UserGuard } from '../core/guards/user.guard';

const routes: Routes = [
  { path: 'list', component: BetsListComponent },
  { path: 'create-lottery', component: CreateLotteryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BetsRoutingModule { }
