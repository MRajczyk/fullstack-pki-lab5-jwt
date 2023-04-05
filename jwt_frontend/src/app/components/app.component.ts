import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //logged: boolean = false;
  title = 'jwt_frontend';
  constructor(public authService: AuthService, private _jwtHelper: JwtHelperService) {
  }
}
