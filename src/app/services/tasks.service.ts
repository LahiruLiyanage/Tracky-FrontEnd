import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskRequest, Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/v1/tasks';

  constructor(private http: HttpClient) {}

  // Fixed: Remove async/await and return Observable directly
  getTasks(userId: string | null): Observable<Task[]> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    console.log('Fetching tasks for user:', userId);
    return this.http.get<Task[]>(`${this.apiUrl}/all/${userId}`, { headers });
  }

  getTask(id: string): Observable<Task> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers });
  }

  addTask(task: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    console.log('Adding task:', token);
    return this.http.post<any>(`${this.apiUrl}/create`, task, { headers });
  }

  updateTask(task: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    console.log('Updating task:', task);
    return this.http.put<Task>(`${this.apiUrl}/update/${task._id}`, task, {
      headers,
    });
  }

  deleteTask(taskId: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    return this.http.delete(`${this.apiUrl}/delete/${taskId}`, { headers });
  }
}
