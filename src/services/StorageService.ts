import * as fs from "fs";
import * as path from "path";
import { Task } from "../models/Task";

export class StorageService {
  private filePath: string;

  constructor(filename: string = "tasks.json") {
    this.filePath = path.join(process.cwd(), filename);
  }

  public save(tasks: Task[]): void {
    const json = JSON.stringify(tasks, null, 2);
    fs.writeFileSync(this.filePath, json, "utf-8");
  }

  // Exception handling (stretch-ready)
  public load(): Task[] {
    try {
      if (!fs.existsSync(this.filePath)) return [];
      const raw = fs.readFileSync(this.filePath, "utf-8");
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed as Task[];
    } catch {
      return [];
    }
  }
}