import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./auth/login/login.component";
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "perfil", component: PerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
