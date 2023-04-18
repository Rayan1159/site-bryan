import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './landing.component.html',
  styleUrls: [
    './css/landing.component.less',
    './css/responsive.less',
    './css/responsive-main-2.less',
    './css/header.less',
  ]
})
export class LandingComponent {

  public scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
