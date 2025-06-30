import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Landing } from './components/landing/landing';
import { Login } from './components/auth/login/login';

const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    children: [
      { path: '', component: Landing }, // default: landing page
      { path: 'login', component: Login }        // /login: login form
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
