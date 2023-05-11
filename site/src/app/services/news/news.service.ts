import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { INewsData } from "../../interfaces/NewsInterface";
import {lastValueFrom, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public news$?: Observable<INewsData>

  private endpoint: string = "http://localhost:1337/general/news"

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  });

  constructor(private readonly request: HttpClient) { }

  public getNews(): Promise<Object> {
    const task: {task: string} = {
      task: "getNews"
    }
    return lastValueFrom(
      this.request.post<INewsData>(this.endpoint, task, {
        headers: this.httpHeaders
      }).pipe(
        tap({
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    ));
  }
}
