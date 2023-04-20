import {Component, HostListener} from '@angular/core';

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

  @HostListener('window:scroll', ['$event'])
  private onWindowScroll(e: Event) {
    let element: HTMLElement | null = document.getElementById("to-top");
    const atBottom: boolean = false;

    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    )
    if (element === null) return;

    const scrollPosition = window.scrollY + document.documentElement.clientHeight;
    const windowHeight = window.innerHeight;

    if ((scrollPosition + windowHeight) >= documentHeight){
      element.setAttribute('style', 'display: none');
    }

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      element.setAttribute('style', 'display: inline-block');
    }

    console.log('scrolling');
  }

  public scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
