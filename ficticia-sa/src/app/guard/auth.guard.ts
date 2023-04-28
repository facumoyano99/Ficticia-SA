import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  validateAuth(canLoad?: boolean): boolean | Promise<boolean> {
    const token = this.authService.getCredentials();
    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      return true;
    }
  }

  // logout(message?: string) {
  //   this.logOutService.onLogout();
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.validateAuth();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.validateAuth(true);
  }
}
