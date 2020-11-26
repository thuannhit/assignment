import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
import { JwtTokensDTO } from './dtos';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() { }

    getAccessToken(): string {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    getRefreshToken(): string {
        return localStorage.getItem(REFRESH_TOKEN);
    }

    getTokens(): JwtTokensDTO{
        return {
            accessToken: localStorage.getItem(ACCESS_TOKEN),
            refreshToken: localStorage.getItem(REFRESH_TOKEN)
        }
    }

    saveTokens(token: JwtTokensDTO): void {
        localStorage.setItem(ACCESS_TOKEN, token.accessToken);
        localStorage.setItem(REFRESH_TOKEN, token.refreshToken);
    }

    saveAccessToken(token: JwtTokensDTO): void {
        localStorage.setItem(ACCESS_TOKEN, token.accessToken);
    }

    saveRefreshToken(token: JwtTokensDTO): void {
        localStorage.setItem(REFRESH_TOKEN, token.refreshToken);
    }

    removeAccessToken(): void {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    
    removeRefreshToken(): void {
        localStorage.removeItem(REFRESH_TOKEN);
    }
    
    removeTokens(): void {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }
}