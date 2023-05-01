import { Component } from '@angular/core';
import {IUserAuthInterface} from "../../../interfaces/IUserAuthInterface";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  public user: IUserAuthInterface = {
    email: "",
    password: ""
  }

  public data: any = {
    username: this.user.email,
    password: this.user.password
  }

  private endpoint: string = "http://localhost:1337/auth/register";

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "accept": "application/json"
  })

  constructor(private readonly http: HttpClient) {}

  public async register(): Promise<void> {
    const emailRegex: RegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!emailRegex.test(this.user.email)) return; //TODO Trigger error toast

    this.http.post(this.endpoint, this.data, {
      headers: this.httpHeaders
    }).subscribe((data: Object): void => {
      console.log(data);
    }).unsubscribe();
  }
}
