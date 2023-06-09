import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {lastValueFrom, Observable, take, tap} from "rxjs";
import {IUserCount} from "../../interfaces/IUserAuthInterface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoint: string = "http://localhost:1337/services/user";
  private userData?: any

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  })

  constructor(private readonly request: HttpClient,
              private toastr: ToastrService) {
    this.userData = JSON.parse(localStorage.getItem("user") || "{}");
  }

  public isAuthenticated(): boolean {
    return this.userData.authenticated;
  }

  public getUsername(): Promise<Object> | null {
    const task: {
      task: string,
      sessionId: any
    }  = {
      task: "resolveName",
      sessionId: this.userData.id
    }

    if (this.isAuthenticated()){
      return lastValueFrom(
        this.request.post(this.endpoint, task, {
          headers: this.httpHeaders
        }).pipe(
          tap({
            error: (err: any) => {
              this.showToast("Error", "Check console");
            }
          })
        )
      )
    }
    return null;
  }

  public async getRole(): Promise<string | null> {
    const task: {task: string}  = {
      task: "getRole"
    }

    if (await this.isAuthenticated()){
      this.request.post(this.endpoint, task, {
        headers: this.httpHeaders
      }).subscribe({
        next: (data: any) => {
          if (data) {
            return data.data;
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

  public count(): Promise<IUserCount> {
    const task: {task: string} = {
      task: "count"
    }

    return lastValueFrom(
      this.request.post<IUserCount>(this.endpoint, {
        task
      }, {
        headers: this.httpHeaders
      }).pipe(
        take(1),
        tap({
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    ));
  }

}
