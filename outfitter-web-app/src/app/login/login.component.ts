import { Component, OnInit } from '@angular/core';
import { Aws } from '../services/aws';
import { Router } from '@angular/router';
import {UserInformationService} from '../services/user-information.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private aws = new Aws();
  private user = {
    Name: '',
    AccessToken: ''
  };
  constructor(
    private router: Router,
    private userInfo: UserInformationService
  ) {

  }

  ngOnInit() {
  }

  public login(username: string, password: string) {
    this.aws.login(username, password, (result)=>{
      this.user.Name = username;
      this.user.AccessToken = result.getAccessToken().getJwtToken();

      this.userInfo.username = this.user.Name;
      this.userInfo.authenticationToken = this.user.AccessToken;
      this.router.navigate(['/home']);
    }, (err)=>{
      console.log(err);
    });
  }
  public register(username: string, password: string) {
    this.aws.register(username, password, 'sourhead5@gmail.com', (err, result) => {
      if(err){
        console.log(err);
        return;
      }

      let cognitoUser = result.user;
      console.log(`Username: ${cognitoUser}`)
    });
  }
}
