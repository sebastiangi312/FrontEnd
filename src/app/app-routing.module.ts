import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';


const routes: Routes = [
  { path: "signup", component: SignUpComponent},
  { path: "login", component: LoginComponent },
  { path: "perfil", component: PerfilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
