import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { INewsData } from "../../interfaces/NewsInterface";
import {lastValueFrom, Observable, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private endpoint: string = "http://localhost:1337/general/news"

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  });

  constructor(private readonly request: HttpClient) { }

  public getNews(): Promise<INewsData> {
    const task: {task: string} = {
      task: "getNews"
    }
    return lastValueFrom(
      this.request.post<INewsData>(this.endpoint, task, {
        headers: this.httpHeaders
      }).pipe(
        take(1),
        tap({
          next: (data: INewsData) => {
            return data;
          },
          error: (err: any) => {
            console.error(err)
          },
          complete: () => {
            return;
          }
        }
    )));
  }
}
