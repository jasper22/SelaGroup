import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const redirectUrl = next['_routerState']['url'];

      return Observable.create((observer) => {
          this.auth.alreadyInitialized$
          .pipe(filter(flag => flag === true ))
          .subscribe(
            flag => {
              // Now initialized
              if (this.auth.currentUserToken) {
                observer.next(true); 
                observer.complete();
              } else {
                observer.next(false);

                // Navigate to Login page
                this.router.navigateByUrl(
                  this.router.createUrlTree(
                    ['/login'], {
                      queryParams: {
                        redirectUrl
                      }
                    }
                  )
                );

                observer.complete();
              }
            }
          );

      });
  }
}
