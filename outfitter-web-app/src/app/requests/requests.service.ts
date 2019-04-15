import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(
    private http: HttpClient
  ) { }

  public deleteUser(authentication, userid): Observable<{}> {
    return this.http.delete(`http://3.211.39.88:3000/api/users/${userid}`, {headers:{'x-access-token': authentication}});
  }

  public getUsers(authentication): Observable<{}> {
    return this.http.get('http://3.211.39.88:3000/api/users', {headers:{'x-access-token': authentication}});
  }

  public login(authentication): Observable<{}> {
    return this.http.get('http://3.211.39.88:3000/api/users/info', {headers:{'x-access-token': authentication}});
  }
}
