import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./user/landing/landing.component";
import {HomeComponent} from "./user/dashboard/home/home.component";

const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'dashboard/home', component: HomeComponent
  }
];

routes.push({
  path: 'dashboard',
  redirectTo: '/dashboard/home',
  pathMatch: 'full',
});

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
