import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { catchError, filter, take, switchMap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { JwtTokensDTO } from './dtos'

@Injectable()
export class JwTAuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<JwtTokensDTO> = new BehaviorSubject<JwtTokensDTO>(null);
    constructor(
        private router: Router,
        private tokenService: TokenService,
        private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): any {

        const accessToken = this.tokenService.getAccessToken();

        if (accessToken) {
            request = this.addTokenToHeader(request, accessToken)
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error.error.error);
                if (error.status === 401) {
                    if (error.error.error === 'invalid_token') {
                        this.handleAccessTokenExpired(request, next)
                        // this.authService.refreshToken()
                        //     .subscribe(() => {
                        //         location.reload();
                        //     });
                    } else {
                        this.router.navigate(['login']).then(_ => console.log('redirect to login'));
                    }
                }
                return throwError(error);
            }));
    }
    private handleAccessTokenExpired(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((tokens: JwtTokensDTO) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(tokens);
                    return next.handle(this.addTokenToHeader(request, tokens.accessToken));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(tokens => {
                    return next.handle(this.addTokenToHeader(request, tokens.accessToken));
                }));
        }
    }

    private addTokenToHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}