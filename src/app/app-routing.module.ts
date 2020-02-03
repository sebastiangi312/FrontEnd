import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { PerfilComponent } from './profile/perfil.component';
import { EditarPerfilComponent } from './edit-profile/editar-perfil.component';


const routes: Routes = [
  { path: "signup", component: SignUpComponent},
  { path: "login", component: LoginComponent },
  { path: "perfil/:id", component: PerfilComponent},
  { path: "editar-perfil/:id", component: EditarPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

