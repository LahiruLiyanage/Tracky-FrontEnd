import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
})
export class LandingComponent {
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
