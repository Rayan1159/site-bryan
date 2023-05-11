import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { INewsResponse } from "../../interfaces/NewsInterface";

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

  public async getNews(): Promise<any> {
    const task: {task: string} = {
      task: "getNews"
    }

    return this.request.post(this.endpoint, task, {
      headers: this.httpHeaders
    }).subscribe({
      next: (data: any) => {
        console.log(data.news);
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
