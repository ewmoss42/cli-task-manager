export type TaskStatus = "todo" | "done";
export type Priority = 1 | 2 | 3;

// Tuple requirement: [success, message]
export type Result = [success: boolean, message: string];

export class Task {
  public readonly id: string;
  public title: string;
  public description: string;
  public status: TaskStatus;
  public priority: Priority;
  public createdAt: string;
  public dueDate?: string;

  constructor(
    id: string,
    title: string,
    description: string,
    priority: Priority = 2,
    dueDate?: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = "todo";
    this.priority = priority;
    this.createdAt = new Date().toISOString();
    this.dueDate = dueDate;
  }

  public markDone(): void {
    this.status = "done";
  }
}