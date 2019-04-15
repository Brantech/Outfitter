import { Component, OnInit } from '@angular/core';
import {UserInformationService} from '../services/user-information.service';
import {RequestsService} from '../requests/requests.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public displayType = "NONE";
  public data;

  constructor(
    public userInfo: UserInformationService,
    private request: RequestsService
  ) { }

  ngOnInit() {
    //console.log(this.userInfo.authenticationToken, this.userInfo.username);
  }

  public getUsers() {
    this.request.getUsers(this.userInfo.authenticationToken).subscribe((data: any) => {
      this.displayType = "USERS";
      this.data = data.data;
    })
  }
}
