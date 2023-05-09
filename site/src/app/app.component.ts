import { Component } from '@angular/core';
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {

  public prepareRouteTransition(outlet: RouterOutlet) {
    const animationState = outlet.activatedRouteData['animationState'];
    return animationState ? animationState : 'home';
  }

}
