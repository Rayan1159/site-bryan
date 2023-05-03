import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string = "http://localhost:1337/service/user";

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  })

  constructor(private readonly request: HttpClient,
              private userData: any,
              private toastr: ToastrService) {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  public async isAuthenticated(): Promise<boolean> {
    return this.userData.authenticated;
  }

  public async getUsername(): Promise<string | null> {
    const task: {task: string}  = {
      task: "resolveName"
    }

    if (await this.isAuthenticated()){
      this.request.post(this.endpoint, task, {
        headers: this.httpHeaders
      }).subscribe({
        next: (data: any) => {
          if (data) {
            return data.user.username;
          }
        },
        error: (err: any) => {
          this.showToast("Error", "Check console");
        },
        complete: () => {
          return;
        }
      })
    }
    return null;
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
