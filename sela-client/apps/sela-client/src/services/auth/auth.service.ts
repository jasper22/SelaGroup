import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject, ReplaySubject  } from 'rxjs';
import { LoginStatus } from './LoginStatus';

import { environment } from '../../environments/environment'
import { retry, catchError, map } from 'rxjs/operators';

import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUser$: BehaviorSubject<string>  = new BehaviorSubject<string>('');

  alreadyInitialized$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private httpClient: HttpClient, private localStorage: LocalStorage) { 
  
    this.alreadyInitialized$.next(false);

    this.localStorage.getItem('token').subscribe((value) => {

      if (value != null) {
        this.loggedInUser$.next((<string> value));
      }

      this.alreadyInitialized$.next(true);
    })
  }

  get currentUserToken(){
    return this.loggedInUser$.getValue();
  }

  set currentUserToken(token: string) {
    this.localStorage.setItem('token', token).subscribe(() => {
        this.loggedInUser$.next(token);

        this.alreadyInitialized$.next(true); 
    });
  }

  loginUser(username: string, userPassword: string): Observable<LoginStatus> {
    this.alreadyInitialized$.next(false); 

    return this.httpClient.post<LoginStatus>(environment.api.loginApi, {username: username, password: userPassword})
                          .pipe(
                                retry(3),
                                catchError(err => throwError(err)),
                                map(user => {
                                  const currentUser = <LoginStatus> user;
                                  this.currentUserToken = currentUser.token;
                                  return currentUser;
                                })
                          );
  }

  logoutUser(): void {
    this.localStorage.removeItem('currentUser').subscribe(() =>{
      this.loggedInUser$.next(null);
    });
  }
}
