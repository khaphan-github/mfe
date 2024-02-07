import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
class AccessTokenGuard {
  router = inject(Router);
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<boolean | UrlTree> {
    console.log(`Access token work`);
    // this.router.navigate(['login']);
    return true;
  }
}

export const CanActivateAccessTokenGuard: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(AccessTokenGuard).canActivate(route, state);
  }
