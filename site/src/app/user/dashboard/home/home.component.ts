import { Component } from '@angular/core';
import { UserService } from "../../../services/user/user.service";
import { NewsService } from "../../../services/news/news.service";

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],

})
export class HomeComponent {
  protected readonly Object: ObjectConstructor = Object;

  constructor(private readonly user: UserService,
              private news: NewsService) {}

  async resolveUsername() {
    const user: any = await this.user.getUsername();
    if (user == null) return;
    return user.username;
  }

  async getNews() {
    const news: any = await this.news.getNews();
    if (news == null) return;
    return news;
  }
}
