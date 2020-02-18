import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { UserGuard } from './core/guards/user.guard';
import { AdminGuard } from './core/guards/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: 'bets', loadChildren: () => import('./bets/bets.module').then(mod => mod.BetsModule), canActivate: [UserGuard] },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule), canActivate: [UserGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule), canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [UserGuard]
})
export class AppRoutingModule { }
