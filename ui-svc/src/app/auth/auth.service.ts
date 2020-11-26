import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtTokensDTO, LoggedUser, UserDTO, UserRegisterRequestDTO } from './dtos';
import { TokenService } from './token.service'
const MIDDLE_URL = 'user'
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl = '';
    private loggedUser: BehaviorSubject<UserDTO> = new BehaviorSubject<UserDTO>(null);
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    login(user: { username: string, password: string }): Observable<boolean> {
        this.tokenService.removeTokens()
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}/login`, user)
            .pipe(
                tap((loggedUser: LoggedUser) => this.saveLoggedUser(loggedUser)),
                mapTo(true),
                catchError(error => {
                    alert(error.error);
                    return of(false);
                }));
    }

    register(data: UserRegisterRequestDTO): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/${MIDDLE_URL}/register`, data)
            .pipe(
                tap(_ => AuthService.log('register')),
                catchError(AuthService.handleError)
            );
    }

    logout() {
        return this.http.post<any>(`${environment.apiUrl}/logout`, {
            'refreshToken': this.tokenService.getRefreshToken()
        }).pipe(
            tap(() => this.doLogoutUser()),
            mapTo(true),
            catchError(error => {
                alert(error.error);
                return of(false);
            }));
    }

    isLoggedIn() {
        return !!this.tokenService.getAccessToken();
    }

    refreshToken() {
        this.tokenService.removeTokens()
        return this.http.post<any>(`${environment.apiUrl}/refresh`, {
            'refreshToken': this.tokenService.getRefreshToken()
        }).pipe(tap((tokens: JwtTokensDTO) => {
            this.tokenService.saveTokens(tokens);
        }));
    }

    private saveLoggedUser(loggedUser: LoggedUser) {
        this.loggedUser.next(loggedUser.userInfo)
        this.tokenService.saveTokens({ refreshToken: loggedUser.refreshToken, accessToken: loggedUser.accessToken });
    }

    private doLogoutUser() {
        this.loggedUser.next(null);
        this.tokenService.removeTokens();
    }

    private static handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }

    private static log(message: string): any {
        console.log(message);
    }
}
