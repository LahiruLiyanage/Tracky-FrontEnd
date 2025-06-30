import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { LandingComponent } from './components/landing/landing';

const routes: Routes = [
  { path: '', component: LandingComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
