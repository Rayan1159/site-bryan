import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./user/landing/landing.component";

const routes: Routes = [
  {
    path: '', component: LandingComponent
  }
];

routes.push({
  path: '',
  redirectTo: '/landing',
  pathMatch: 'full'
});

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
