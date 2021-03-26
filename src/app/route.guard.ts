import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './services/router.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private user: UserService, private router: RouterService, private snackbar: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if ( ! this.user.loggedIn()) {
        this.snackbar.open("Oops! Please login/register before accessing this page!","OK");
        this.router.routeToLogin();
        return false;
      } else {
        return true;
      }
  }
  
}
