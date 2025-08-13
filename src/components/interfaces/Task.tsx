export interface Task {
  id: number;
  taskName: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}
