import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private endpoint: string = "http://localhost:1337/service/news"

  private httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  });

  constructor(private readonly request: HttpClient) { }

  public async getNews(): Promise<any> {
    const task: {task: string} = {
      task: "getNews"
    }

    return this.request.post(this.endpoint, task, {
      headers: this.httpHeaders
    }).subscribe({
      next: (data: any) => {
        if (data) {
          return data.news;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        return;
      }
    })
  }
}
