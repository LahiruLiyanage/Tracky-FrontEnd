export interface Task {
  id: string;
  title: string;
  description: string;
  deleted?: boolean;
  userId: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
}
