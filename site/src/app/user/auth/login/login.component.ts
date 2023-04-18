import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUserLoginInterface} from "../../../interfaces/IUserAuthInterface";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  public user: IUserLoginInterface = {
    username: "",
    password: ""
  }

  private endpoint: string = "http://localhost/auth/login";

  private data: {} = {
    username: this.user.username,
    password: this.user.password
  }

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private readonly http: HttpClient) {}
  public async login(): Promise<void> {
    this.http.post(this.endpoint, this.data, {
      headers: this.httpHeaders
    }).subscribe((data: Object): void => {
      console.log(data);
    }).unsubscribe();
  }
}
