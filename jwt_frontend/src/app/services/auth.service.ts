import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
@Injectable()
export class AuthService {
  public redirectTo: string = '/';
  private endpoint: string = '/users';
  private user: User | undefined = undefined;

  private hasLoginErrors = new BehaviorSubject<boolean>(false);
  public hasLoginErrors$ = this.hasLoginErrors.asObservable();


  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  logIn(name: string, password: string) {
    const user: Observable<User> = this.http.post<User>(environment.url + this.endpoint + '/login', {
      name: name,
      password: password
    });

    user.subscribe({
      next: user => {
        this.user = user;
        sessionStorage.setItem('token', btoa(name + ':' + password));
        sessionStorage.setItem('user', JSON.stringify(user));

        if(!environment.production) {
          console.log('user: ', user);
          console.log('token: ', sessionStorage.getItem('token'))
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
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }

}
