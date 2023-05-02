import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./user/landing/landing.component";
import {HomeComponent} from "./user/dashboard/home/home.component";
import {LoginComponent} from "./user/auth/login/login.component";
import {RegisterComponent} from "./user/auth/register/register.component";
<<<<<<< HEAD
import { ServersComponent } from './user/servers/servers.component';
=======
import {AuthGuard} from "./auth.guard";
import {ServersComponent} from "./user/servers/servers.component";
>>>>>>> 275be1c5d2ebde29ea8d4bc951f71b617f56aaed

const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'dashboard/home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: "dashboard/servers", component: ServersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/servers', component: ServersComponent
  },
  {
    path: 'auth/login', component: LoginComponent
  },
  {
    path: 'auth/register', component: RegisterComponent
  }
];

routes.push({
  path: 'auth',
  redirectTo: '/auth/login',
  pathMatch: 'full',
})

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
