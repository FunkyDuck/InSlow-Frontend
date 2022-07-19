import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/home/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { LogOutComponent } from './components/home/log-out/log-out.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterComponent } from './components/home/register/register.component';
import { SettingsComponent } from './components/user/settings/settings.component';
import { UserComponent } from './components/user/user.component';
import { WallComponent } from './components/user/wall/wall.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'logout', component: LogOutComponent }
    ]
  },
  {
    path: 'user', component: UserComponent, children: [
      { path: '', component: WallComponent },
      { path: 'settings', component: SettingsComponent }
    ], canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
