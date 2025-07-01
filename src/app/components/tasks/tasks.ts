import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
  imports: [CommonModule, FormsModule],
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error = '';
  showAddTask = false;
  newTaskTitle = '';

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

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    // Call your service to add the task (adjust as per your service)
    this.taskService
      .addTask({ title: this.newTaskTitle, completed: false })
      .subscribe({
        next: () => {
          this.getData();
          this.newTaskTitle = '';
          this.showAddTask = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to add task';
        },
      });
  }

  markComplete(task: Task) {
    this.taskService
      .updateTask({ ...task, completed: !task.completed })
      .subscribe({
        next: () => this.getData(),
        error: (err) => {
          this.error = err.error?.message || 'Failed to update task';
        },
      });
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => this.getData(),
        error: (err) => {
          this.error = err.error?.message || 'Failed to delete task';
        },
      });
    }
  }
}
