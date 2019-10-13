import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private adminService: AdminService) {
  }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const currentUser = this.adminService.currentUserValue;
        if (this.adminService.isTokenExpired() || !currentUser) {
        // not logged in so redirect to login page with the return url
          this.router.navigate(['admin/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }

        if (currentUser) {
            // logged in so return true
            return true;
        }
  }
}
