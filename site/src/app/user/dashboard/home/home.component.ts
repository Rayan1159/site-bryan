import {Component, OnInit} from '@angular/core';
import { RouterModule } from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {NewsService} from "../../../services/news/news.service";
import {INewsResponse} from "../../../interfaces/NewsInterface";

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],

})
export class HomeComponent implements OnInit {
  protected readonly Object: ObjectConstructor = Object;

  public username?: string | null;

  public posts?: INewsResponse;
  public postsArray?: any[]

  constructor(private readonly user: UserService,
              private news: NewsService) {}

  async ngOnInit(): Promise<void> {
    this.username = await this.user.getUsername();
    this.posts = await this.news.getNews();

    console.log(this.posts);
  }
}
