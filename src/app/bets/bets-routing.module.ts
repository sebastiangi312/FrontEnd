import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetsListComponent } from './bets-list/bets-list.component';
import { CreateLotteryComponent } from './bets-create/lottery/create-lottery/create-lottery.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { BetsListSportComponent } from './bets-list-sport/bets-list-sport.component';
import { CreateSportComponent } from './bets-create/sport/create-sport/create-sport/create-sport.component';

const routes: Routes = [
  { path: 'list', component: BetsListComponent },
  { path: 'create-lottery', component: CreateLotteryComponent, canActivate: [AdminGuard] },
  { path: 'edit-lottery/:id', component: CreateLotteryComponent, canActivate: [AdminGuard]},
  { path: 'list-sport', component: BetsListSportComponent, canActivate: [AdminGuard] },
  { path: 'create-sport', component: CreateSportComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class BetsRoutingModule { }
