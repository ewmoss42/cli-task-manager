import { Task, Priority, Result, TaskStatus } from "../models/Task";

export type TaskUpdates = {
  title?: string;
  description?: string;
  priority?: Priority;
  dueDate?: string | undefined;
};

export class TaskManager {
  private tasks: Task[] = [];

  public getAll(): Task[] {
    return this.tasks;
  }

  public getByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  public findById(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  public sortByPriority(): Task[] {
    return [...this.tasks].sort((a, b) => a.priority - b.priority);
  }

  public sortByDueDate(): Task[] {
    return [...this.tasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
  }

  public sortByCreated(): Task[] {
    return [...this.tasks].sort((a, b) =>
      a.createdAt.localeCompare(b.createdAt)
    );
  }

  public addTask(
    title: string,
    description: string,
    priority: Priority = 2,
    dueDate?: string
  ): Result {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length === 0) {
      return [false, "Title cannot be empty."];
    }

    const id: string = crypto.randomUUID();
    const task = new Task(id, trimmedTitle, description.trim(), priority, dueDate);
    this.tasks.push(task);

    return [true, `Added task: ${task.title}`];
  }

  public markDone(id: string): Result {
    const task = this.findById(id);
    if (!task) return [false, `Task not found: ${id}`];

    task.markDone();
    return [true, `Marked done: ${task.title}`];
  }

  public deleteTask(id: string): Result {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);

    if (this.tasks.length === before)
      return [false, `Task not found: ${id}`];

    return [true, `Deleted task: ${id}`];
  }

  public updateTask(id: string, updates: TaskUpdates): Result {
    const task = this.findById(id);
    if (!task) return [false, `Task not found: ${id}`];

    if (updates.title !== undefined) {
      const t = updates.title.trim();
      if (t.length === 0) return [false, "Title cannot be empty."];
      task.title = t;
    }

    if (updates.description !== undefined) {
      task.description = updates.description.trim();
    }

    if (updates.priority !== undefined) {
      task.priority = updates.priority;
    }

    if (updates.dueDate !== undefined) {
      task.dueDate = updates.dueDate;
    }

    return [true, `Updated task: ${task.id}`];
  }

  public setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }
}