import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {


    if (!localStorage.getItem('tokenUser')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
