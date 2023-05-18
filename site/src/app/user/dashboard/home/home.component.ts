import {Component, OnInit} from '@angular/core';
import { UserService } from "../../../services/user/user.service";
import { NewsService } from "../../../services/news/news.service";
import {count, tap} from "rxjs";
import {INewsData} from "../../../interfaces/NewsInterface";
import {IUserCount} from "../../../interfaces/IUserAuthInterface";

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],

})
export class HomeComponent implements OnInit {
  protected readonly Object: ObjectConstructor = Object;
  protected readonly console = console;

  public newsPosts?: INewsData | null
  public userCount?: IUserCount;

  constructor(private readonly user: UserService,
              private news: NewsService) {}

  async ngOnInit() {
    this.newsPosts = await this.getNewsData();
    this.userCount = await this.countRegisteredUsers()
  }

  async getNewsData(): Promise<INewsData | null> {
    const news: INewsData = await this.news.getNews();
    return news;
  }

  async countRegisteredUsers(): Promise<IUserCount> {
    return await this.user.count();
  }

  async resolveUsername() {
    const user: any = await this.user.getUsername();
    if (user == null) return;
    return user.username;
  }
}
