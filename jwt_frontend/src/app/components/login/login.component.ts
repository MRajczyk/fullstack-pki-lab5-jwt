import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  public name: string = '';
  public password: string = '';
  public loginFailed!: boolean;

  ngOnInit(): void {
    this.authService.hasLoginErrors$.subscribe({
      next: (value) => {
        this.loginFailed = value;
      },
    });
  }

  onSubmit(): void {
    this.authService.logIn(this.name, this.password);
  }

}
