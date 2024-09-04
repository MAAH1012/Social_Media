import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { AbstractCommonService } from "./common.abstract.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

export interface AuthResponseData{
    // kind: string;
    // idToken: string;
    // email: string;
    // refreshToken: string;
    // expiresIn: string;
    // localId:string;
    // registered?:boolean;
    jwt: string;
}

@Injectable({ providedIn: 'root'})
export class AuthService extends AbstractCommonService{

    private signUpUrl ="http://localhost:8080/api/v1/register";
    private logInUrl = "http://localhost:8080/api/v1/login";
    authStatus = new BehaviorSubject<boolean>(this.isLoggedin());

    constructor(http: HttpClient, private router: Router){
        super(http);
    }
    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>(this.fullUrl + "login",
        {
            userName: email,
            passWord: password
        }).pipe(
            tap(resData => {
                debugger
                localStorage.setItem('token', resData.jwt);
                this.authStatus.next(true);
            })
        );
    }

    signUp(email: string, password: string){
        debugger
        const body = {
            userName: email,
            passWord: password
        }
        return this.http.post<AuthResponseData>(this.fullUrl + "register",body).pipe(
            tap(resData => {
                localStorage.setItem('token', resData.jwt);
                this.authStatus.next(true);
            })
        );
    }

    public isLoggedin():boolean {
        try {
            return this.tokenNotExpired();
        }catch (error) {
            let token = localStorage.getItem('token');
            if(token){
                alert("Session expired, Please login again to continue");
                localStorage.removeItem('token');
            }
            window.location.reload();
        }return false;
    }

    public tokenNotExpired(){
        let jwtHelper = new JwtHelperService();
        const token: string = localStorage.getItem('token');
        return token != null && !jwtHelper.isTokenExpired(token);
    }
    logOut() {
        localStorage.removeItem('token');
        this.authStatus.next(false);
        this.router.navigate(['/auth']);

    }
}