import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { Dashboard } from './components/dashboard/dashboard';
import { Footer } from './components/footer/footer';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing';
import { Login } from './components/auth/login/login';

@NgModule({
  declarations: [
    App,
    Header,
    Dashboard,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LandingComponent,
    Login
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
