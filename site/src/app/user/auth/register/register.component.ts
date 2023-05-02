import { Component } from '@angular/core';
import {IUserAuthInterface} from "../../../interfaces/IUserAuthInterface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {OnInit} from "@angular/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  public user: IUserAuthInterface = {
    email: "",
    password: "",
    confirm: ""
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

  constructor(private readonly http: HttpClient, private readonly toastr: ToastrService) {}

  public async resolved(captchaResponse: string) {
    console.log(captchaResponse)
  }

  public async register(): Promise<void> {
    const emailRegex: RegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!this.user.email && !this.user.password) return this.showToast("Error", "Credentials are not set")
    if (!emailRegex.test(this.user.email)) return this.showToast("Error", "Invalid email format"); //TODO Trigger error toast
    if (this.user.password != this.user.confirm) return this.showToast("Error", "Passwords do not match");

    this.http.post(this.endpoint, this.data, {
      headers: this.httpHeaders
    }).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: (err => {
        console.error(err)
      }),
      complete: () => {
        console.log("Registration fimalized")
      }
    })
  }

  public async showToast(title: string, message: string) {
    this.toastr.info(message, title, {
      easing: 'ease-in',
      easeTime: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 3000,
      closeButton: true,
      positionClass: 'toast-top-center',
    });
  }
}
