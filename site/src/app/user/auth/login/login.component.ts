import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  public username: String = "";
  public password: String = "";

  private endpoint: string = "http://localhost/auth/login";
  private data: {} = {
    username: this.username,
    password: this.password
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
