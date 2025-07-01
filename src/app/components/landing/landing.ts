import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Tasks } from "../tasks/tasks";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  standalone: true,
  imports: [CommonModule, Tasks],
})
export class Landing {
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  features = [
    {
      icon: '📋',
      title: 'Task Management',
      description: 'Organize and track your tasks efficiently',
    },
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'See changes instantly across all devices',
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is protected with industry-standard security',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description: 'Works perfectly on desktop, tablet, and mobile',
    },
  ];

  getStarted() {
    // You can add logic here to scroll to features or navigate
    console.log('Get Started clicked');
  }
}
