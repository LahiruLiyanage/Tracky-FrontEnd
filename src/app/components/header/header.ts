import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private router: Router) {}

  onLoginClick(): void {
    this.router.navigate(['dashboard/login']);
  }

  onSignupClick(): void {
    this.router.navigate(['dashboard/signup']);
  }
}
