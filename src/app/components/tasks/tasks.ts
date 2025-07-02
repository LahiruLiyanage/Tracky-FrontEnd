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
  error: string | null = null;
  showAddTask = false;
  newTaskTitle = '';
  newTaskDescription = '';
  userId: string = '';

  constructor(private taskService: TaskService) {}

  async getData() {
    try {
      this.loading = true;
      this.error = null;

      const userId = localStorage.getItem('user');
      if (!userId) {
        this.error = 'User not logged in';
        this.loading = false;
        return;
      }

      this.userId = userId;
      console.log('Fetching tasks for user:', userId);

      // Remove the await here since getTasks now returns Observable directly
      this.taskService.getTasks(userId).subscribe({
        next: (tasks: Task[]) => {
          console.log('Received tasks:', tasks);
          if (tasks.length > 0) {
            console.log('First task properties:', Object.keys(tasks[0]));
            console.log('First task:', tasks[0]);
          }
          this.tasks = tasks;
          this.loading = false;
        },
        error: (err: any) => {
          console.error('Error fetching tasks:', err);
          this.error = err.error?.message || 'Failed to load tasks';
          this.loading = false;
        },
      });
    } catch (error) {
      console.error('Exception in getData:', error);
      this.error = 'Failed to load tasks';
      this.loading = false;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      console.log('Task title is empty');
      return;
    }

    if (!this.userId) {
      this.userId = localStorage.getItem('user') || '';
      if (!this.userId) {
        this.error = 'User not logged in';
        return;
      }
    }

    console.log('Adding task for user:', this.userId);

    // Try Option 1: Minimal fields only
    const newTaskData = {
      title: this.newTaskTitle.trim(),
      description: this.newTaskDescription.trim(),
    };

    console.log('New task data:', newTaskData);

    this.taskService.addTask(newTaskData).subscribe({
      next: (response) => {
        console.log('Task added successfully:', response);
        // Refresh the task list
        this.getData();
        // Clear the form
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.showAddTask = false;
      },
      error: (err) => {
        console.error('Error adding task:', err);
        this.error = err.error?.message || 'Failed to add task';
      },
    });
  }

  markComplete(task: Task) {
    console.log('Marking task complete:', task);

    // Validate task object
    if (!task || typeof task !== 'object') {
      console.error('Invalid task object:', task);
      this.error = 'Invalid task data';
      return;
    }

    if (!task.id) {
      console.error('Task missing ID:', task);
      this.error = 'Task ID is missing';
      return;
    }

    // Create updated task object with all required fields
    const updatedTask = {
      id: task.id,
      completed: true,
    };

    console.log('Updating task:', updatedTask);

    this.taskService.updateTask(updatedTask).subscribe({
      next: (response) => {
        console.log('Task updated successfully:', response);
        // Update the task in the local array instead of refetching all tasks
        // const taskIndex = this.tasks.findIndex((t) => t.id === task.id);
        // if (taskIndex !== -1) {
        //   this.tasks[taskIndex] = response;
        // }
        // Or refresh all tasks if you prefer:
        // this.getData();
      },
      error: (err) => {
        console.error('Error updating task:', err);
        this.error = err.error?.message || 'Failed to update task';
      },
    });
  }

  deleteTask(task: Task) {
    console.log('Deleting task:', task);

    if (!task || !task.id) {
      console.error('Task or task ID is missing:', task);
      this.error = 'Task ID is missing';
      return;
    }

    if (confirm('Are you sure you want to delete this task?')) {
      console.log('Deleting task with ID:', task.id);

      this.taskService.deleteTask(task.id).subscribe({
        next: (response) => {
          console.log('Task deleted successfully:', response);
          this.getData();
        },
        error: (err) => {
          console.error('Error deleting task:', err);
          this.error = err.error?.message || 'Failed to delete task';
        },
      });
    }
  }

  // Helper methods for the updated template
  get completedTasksCount(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  get pendingTasksCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  clearError() {
    this.error = null;
  }

  refreshTasks() {
    this.getData();
  }
}
