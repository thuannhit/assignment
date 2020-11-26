import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
// import { RandomGuard } from './guards/random.guard';
import { JwTAuthInterceptor } from './jwt.interceptor';

@NgModule({
    declarations: [],
    providers: [
        AuthGuard,
        AuthService,
        TokenService,
        // RandomGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwTAuthInterceptor,
            multi: true
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
    ]
})
export class AuthModule { }