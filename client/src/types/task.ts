export type TaskStatus = "pending" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string; 
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};