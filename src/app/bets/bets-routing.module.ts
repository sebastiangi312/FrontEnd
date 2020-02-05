import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BetsListComponent } from './bets-list/bets-list.component';
import { UserGuard } from '../core/guards/user.guard';

const routes: Routes = [
  { path: 'list', component: BetsListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BetsRoutingModule { }
