import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { UserComponent } from './components/user/user.component';
import { WallComponent } from './components/user/wall/wall.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { ProfilComponent } from './components/user/profil/profil.component';
import { PostComponent } from './components/user/post/post.component';
import { NewPostComponent } from './components/user/new-post/new-post.component';
import { SearchComponent } from './components/user/search/search.component';
import { Error404Component } from './components/error404/error404.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/home/auth/auth.component';
import { LogOutComponent } from './components/home/log-out/log-out.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    WallComponent,
    SettingsComponent,
    ProfilComponent,
    PostComponent,
    NewPostComponent,
    SearchComponent,
    Error404Component,
    NavBarComponent,
    AuthComponent,
    LogOutComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    NavBarComponent,
    MatIconModule
  ]
})
export class PublicModule { }
