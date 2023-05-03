import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { LandingComponent } from "./user/landing/landing.component";
import {HomeComponent} from "./user/dashboard/home/home.component";
import {LoginComponent} from "./user/auth/login/login.component";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {RegisterComponent} from "./user/auth/register/register.component";
import {TOAST_CONFIG, ToastrModule, ToastrService} from "ngx-toastr";
import { ServersComponent } from './user/servers/servers.component';
import { RecaptchaModule } from 'ng-recaptcha';
import {UserService} from "./services/user/user.service";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ServersComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    NgOptimizedImage,
    NoopAnimationsModule,
    RecaptchaModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    HttpClient,
    ToastrService,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
