import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/users.service";
import {User} from "../../models/user-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private userService: UserService) { }

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
