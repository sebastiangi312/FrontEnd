import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBetsComponent } from './my-bets.component';

const routes: Routes = [{ path: '', component: MyBetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBetsRoutingModule { }
