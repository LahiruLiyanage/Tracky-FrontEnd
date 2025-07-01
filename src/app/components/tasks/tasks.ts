import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  imports: [CommonModule],
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error = '';

  constructor(private taskService: TaskService) {}
  async getData() {
    const userId = await localStorage.getItem('user');
    if (!userId) {
      this.error = 'User not logged in';
      this.loading = false;
      return;
    }
    // console.log('Fetching tasks for user:', userId);
    (await this.taskService.getTasks(userId)).subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Failed to load tasks';
        this.loading = false;
      },
    });
  }
  ngOnInit(): void {
    this.getData();
  }
}
