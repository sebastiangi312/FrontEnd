import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/']);
      return false;
    } else {
      return this.authService.getUser().pipe(
        map((user => user && user.roles.admin ? true : false)),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Acceso denegado');
          }
        })
      );
    }

  }
}
