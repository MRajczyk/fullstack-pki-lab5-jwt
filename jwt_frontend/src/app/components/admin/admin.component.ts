import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/users.service";
import {User} from "../../models/user-model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, public authService: AuthService) { }

  users: User[] = [];
  onGetUsers() {
    this.userService.getUsers()
      .subscribe((list) => {
        console.log(list);
        this.users = list.users;
      })
  }

  ngOnInit(): void {
    this.onGetUsers();
  }

}
