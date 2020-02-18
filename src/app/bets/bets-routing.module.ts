import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  { path: 'list', component: BetsListComponent },
  { path: 'create-lottery', component: CreateLotteryComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class BetsRoutingModule { }
