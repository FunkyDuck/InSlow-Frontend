import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';
import { Error404Component } from './modules/public/components/error404/error404.component';
import { PublicModule } from './modules/public/public.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/public/public.module').then(m => PublicModule) },
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => AdminModule) },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
