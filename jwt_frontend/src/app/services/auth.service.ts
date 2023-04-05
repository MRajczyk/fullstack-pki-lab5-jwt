import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {BackendLoginResponseModel} from "../models/backend-login-response-model";
@Injectable()
export class AuthService {
  public redirectTo: string = '/';
  private endpoint: string = '/auth';

  private hasLoginErrors = new BehaviorSubject<boolean>(false);
  public hasLoginErrors$ = this.hasLoginErrors.asObservable();


  constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) {}
  // ...
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    //return !this.jwtHelper.isTokenExpired(token);
    return token ? true : false;
  }

  logIn(email: string, password: string) {
    const payload = new HttpParams()
      .set('email', email)
      .set('password', password);

    const returnVal: Observable<BackendLoginResponseModel> = this.http.post<BackendLoginResponseModel>(environment.url + this.endpoint + '/signin', payload);

    returnVal.subscribe({
      next: returnVal => {
        sessionStorage.setItem('token', returnVal.accessToken);

        if(!environment.production) {
          console.log('token: ', returnVal.accessToken);
        }

        this.hasLoginErrors.next(false);
        this.router.navigate([this.redirectTo]);
      },
      error: err => {
        this.hasLoginErrors.next(true);
        console.log(err.message);
      }
    });
  }

  logOut(): void {
    sessionStorage.removeItem('token');
  }
}
