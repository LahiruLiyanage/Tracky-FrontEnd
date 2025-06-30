export interface Task {
  id: string;
  title: string;
  description: string;
  deleted?: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
}
