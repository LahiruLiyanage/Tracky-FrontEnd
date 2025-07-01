import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './components/landing/landing';
import { Login } from './components/auth/login/login';
import { Tasks } from './components/tasks/tasks';

const routes: Routes = [
  {
      path: '',
      component: Landing
  },
  {
      path: 'login',
      component: Login
  },
  {
      path: 'tasks',
      component: Tasks
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
