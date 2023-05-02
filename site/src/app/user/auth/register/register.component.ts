import {Component, ViewChild} from '@angular/core';
import {IUserAuthInterface} from "../../../interfaces/IUserAuthInterface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {OnInit} from "@angular/core";
import {RecaptchaComponent} from "ng-recaptcha";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {
  @ViewChild('register-captcha') captchaElement?: RecaptchaComponent;
  @ViewChild('email') emailInput?: HTMLInputElement;
  @ViewChild('password') passwordInput?: HTMLInputElement;
  @ViewChild('confirm') confirmInput?: HTMLInputElement;

  private captchaIsSolved: boolean = false;

  public user: IUserAuthInterface = {
    email: "",
    password: "",
    confirm: ""
  }

  private endpoint: string = "http://localhost:1337/auth/register";

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "accept": "application/json"
  })

  constructor(private readonly http: HttpClient, private readonly toastr: ToastrService, private router: Router) {}

  public async resolved(captchaResponse: string) {
    this.captchaIsSolved = !this.captchaIsSolved;
  }

  public async detectError() {
    for (let input of [this.emailInput, this.passwordInput, this.confirmInput]) {
      if (input == null) return;
      if (input.value == "") {
        input.style.border = "1px solid red";
        input.style.border = "box";
      }
    }
  }

  public async register(): Promise<void> {
    const emailRegex: RegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (!this.user.email || !this.user.password || !this.user.confirm) {
      await this.detectError();
      return this.showToast("Error", "Credentials are not set")
    }

    if (!emailRegex.test(this.user.email)) return this.showToast("Error", "Invalid email format");
    if (this.user.password != this.user.confirm) return this.showToast("Error", "Passwords do not match");
    if (!this.captchaIsSolved) return this.showToast("Error", "Captcha is not solved");

    this.http.post(this.endpoint, this.user, {
      headers: this.httpHeaders
    }).subscribe({
      next: (data: any) => {
        if (data.status == "User registered") {
          this.showToast("Success", "You're noe registered");
          setTimeout(() => {
            this.router.navigate(["/auth/login"])
          }, 3 * 1000)
        }
        if (data.status == "Register failed") this.showToast("Error", "Registration failed");
      },
      error: (err => {
        console.error(err)
      }),
      complete: () => {
        if (this.captchaElement == null) {
          this.showToast("Error", "Failed to reload captcha, refreshing page");
          setTimeout(() => {
            window.location.reload();
          }, 3 * 1000)
          return;
        }
        this.captchaElement.reset();
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
