import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUserAuthInterface} from "../../../interfaces/IUserAuthInterface";
import {ToastrService, Toast} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  public user: IUserAuthInterface = {
    email: "",
    password: ""
  }

  public passwordShown: boolean = false;

  private endpoint: string = "http://localhost:1337/auth/login";

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private readonly http: HttpClient,
              private readonly toastr: ToastrService,
              private router: Router) {}
  public async login(): Promise<void> {
    const emailRegex: RegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!this.user.email && !this.user.password) this.showToast("Error", "Credentials are not set")
    if (!emailRegex.test(this.user.email)) return; //TODO Trigger error toast

    this.http.post(this.endpoint, this.user, {
      headers: this.httpHeaders
    }).subscribe({
      next: (data: any) => {
        if (data.status == "Login failed") this.showToast("Error", "Login failed");
        if (data.status == "Logged in") {
          localStorage.setItem("user", JSON.stringify(data.user));
          this.showToast("Success", "You have been logged in");
          setTimeout(() => {
            this.router.navigate(["/dashboard/home"])
          }, 3 * 1000)
        }
      },
      error: (err: any) => {
        if (err) {
          console.log(err);
          this.showToast("Error", "Login failed, check console for errors");
        }
      },
      complete: () => {
        console.log("Login process finalized");
      }
    })
  }

  public async showPassword(): Promise<void> {
    this.passwordShown = !this.passwordShown;
  }

  public showToast(title: string, message: string) {
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
