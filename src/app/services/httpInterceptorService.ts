import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './rest-api.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    
    data:any=localStorage.getItem("auth"); 

    constructor(private authenticationService: RestApiService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.isAuth && req.url.indexOf('login') === -1) {
            const authReq = req.clone({
                headers: new HttpHeaders({ Authorization: 'Basic ' + JSON.parse(this.data).data })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
     
}