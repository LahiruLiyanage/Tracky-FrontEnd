import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Landing } from './components/landing/landing';
import { Login } from './components/auth/login/login';
import { Tasks } from './components/tasks/tasks';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { Signup } from './components/auth/signup/signup';

@NgModule({
  declarations: [App, Header, Footer],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Landing,
    Login,
    Tasks,
    Signup
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
