import {Component, ComponentFactoryResolver} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUserAuthInterface} from "../../../interfaces/IUserAuthInterface";
import {ToastrService, Toast} from "ngx-toastr";

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

  private endpoint: string = "http://localhost:1337/auth/login";

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private readonly http: HttpClient, private readonly toastr: ToastrService) {}
  public async login(): Promise<void> {
    const emailRegex: RegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!emailRegex.test(this.user.email)) return; //TODO Trigger error toast

    this.http.post(this.endpoint, this.user, {
      headers: this.httpHeaders
    }).subscribe({
      next: (data: any) => {
        if (data.status == "Login failed") this.showToast("Error", "Login failed", "error");
        if (data.status == "Logged in") this.showToast("Success", "You have been logged in", "success");
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log("Login process finalized");
      }
    })
  }

  public showToast(title: string, message: string, status: string) {
    switch(status) {
      case "success":
        this.toastr.info(message, title, {
          easing: 'ease-in',
          easeTime: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          timeOut: 3000,
          closeButton: true,
          positionClass: 'toast-top-center',
        });
        break;
    }
  }
}
