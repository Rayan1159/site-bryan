import {Component, OnInit} from '@angular/core';
import { RouterModule } from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {NewsService} from "../../../services/news/news.service";

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],

})
export class HomeComponent implements OnInit {

  public username?: Promise<string | null>;
  public posts?: any[];

  constructor(private readonly user: UserService,
              private news: NewsService) {}

  async ngOnInit(): Promise<void> {
    this.username = this.user.getUsername();
  }

}
