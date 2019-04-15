import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  public username: string;
  public authenticationToken: string;

  constructor() { }
}
