import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { UserGuard } from './core/guards/user.guard';


const routes: Routes = [
  { path: '', redirectTo: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'bets', loadChildren: () => import('./bets/bets.module').then(mod => mod.BetsModule), canActivate: [UserGuard] },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule), canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [UserGuard]
})
export class AppRoutingModule { }
