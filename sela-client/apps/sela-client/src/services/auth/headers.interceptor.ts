import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor
{
    constructor(private auth:AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.currentUserToken;

        if (token) {
            const authReq = req.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token}`
                }
            }); 

            return next.handle(authReq);
        }
        else {
            return next.handle(req);
        }
    }
} 