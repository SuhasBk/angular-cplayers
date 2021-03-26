import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router, private location: Location) { }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }

  routeBack() {
    this.location.back();
  }

  routeToStaticView() {
    this.router.navigate(['my-recommendations']);
  }

  routeToRegister() {
    this.router.navigate(['register']);
  }
}
