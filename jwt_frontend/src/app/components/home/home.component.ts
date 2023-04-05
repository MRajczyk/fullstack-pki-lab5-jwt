import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Data} from "../../models/data-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private dataService: DataService) { }

  data: Data | undefined = undefined;
  onGetUsers() {
    this.dataService.getPublicData()
      .subscribe((msg) => {
        console.log(msg);
        this.data = msg;
      })
  }

  ngOnInit(): void {
    this.onGetUsers();
  }
}
