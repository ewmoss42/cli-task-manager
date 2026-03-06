import * as readline from "readline";
import { TaskManager } from "./services/TaskManager";
import { StorageService } from "./services/StorageService";
import { Priority } from "./models/Task";

const manager = new TaskManager();
const storage = new StorageService("tasks.json");

manager.setTasks(storage.load());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

function printMenu(): void {
  console.log("\n=== CLI Task Manager ===");
  console.log("1) List tasks");
  console.log("2) Add task");
  console.log("3) Mark done");
  console.log("4) Delete task");
  console.log("5) Save");
  console.log("6) Edit task");
  console.log("7) Filter tasks");
  console.log("8) Sort tasks");
  console.log("9) Exit");
}

function printTasks(tasks: ReturnType<TaskManager["getAll"]>): void {
  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  for (const t of tasks) {
    const due = t.dueDate ? ` due:${t.dueDate}` : "";
    console.log(`[${t.status}] (p${t.priority}) ${t.id} - ${t.title}${due}`);
  }
}

function parsePriority(input: string): Priority | undefined {
  if (input === "1" || input === "2" || input === "3") {
    return Number(input) as Priority;
  }
  return undefined;
}

async function handleAdd(): Promise<void> {
  const title = await ask("Title: ");
  const desc = await ask("Description: ");
  const pRaw = await ask("Priority (1-3 default 2): ");
  const due = await ask("Due date (optional): ");

  const priority = parsePriority(pRaw) ?? 2;

  const [ok, msg] = manager.addTask(
    title,
    desc,
    priority,
    due.trim() === "" ? undefined : due
  );

  console.log(ok ? "✅" : "❌", msg);

  if (ok) storage.save(manager.getAll());
}

async function handleMarkDone(): Promise<void> {
  const id = await ask("Task id: ");
  const [ok, msg] = manager.markDone(id.trim());

  console.log(ok ? "✅" : "❌", msg);

  if (ok) storage.save(manager.getAll());
}

async function handleDelete(): Promise<void> {
  const id = await ask("Task id: ");
  const [ok, msg] = manager.deleteTask(id.trim());

  console.log(ok ? "✅" : "❌", msg);

  if (ok) storage.save(manager.getAll());
}

async function handleEdit(): Promise<void> {
  const id = await ask("Task id to edit: ");
  const task = manager.findById(id.trim());

  if (!task) {
    console.log("❌ Task not found.");
    return;
  }

  console.log("Leave blank to keep existing value.");

  const title = await ask(`Title (${task.title}): `);
  const desc = await ask(`Description (${task.description}): `);
  const priorityRaw = await ask(`Priority (${task.priority}): `);
  const dueRaw = await ask(`Due date (${task.dueDate ?? "none"}): `);

  const updates: any = {};

  if (title.trim() !== "") updates.title = title;
  if (desc.trim() !== "") updates.description = desc;

  const p = parsePriority(priorityRaw);
  if (priorityRaw.trim() !== "" && !p) {
    console.log("❌ Invalid priority.");
    return;
  }

  if (p) updates.priority = p;

  if (dueRaw.trim() === "-") updates.dueDate = undefined;
  else if (dueRaw.trim() !== "") updates.dueDate = dueRaw;

  const [ok, msg] = manager.updateTask(id.trim(), updates);

  console.log(ok ? "✅" : "❌", msg);

  if (ok) storage.save(manager.getAll());
}

async function handleFilter(): Promise<void> {
  const choice = await ask("Filter (todo/done/all): ");

  if (choice === "todo") printTasks(manager.getByStatus("todo"));
  else if (choice === "done") printTasks(manager.getByStatus("done"));
  else if (choice === "all") printTasks(manager.getAll());
  else console.log("Invalid filter.");
}

async function handleSort(): Promise<void> {
  console.log("\nSort by:");
  console.log("1) Priority");
  console.log("2) Due date");
  console.log("3) Created date");

  const choice = await ask("Choose: ");

  if (choice === "1") printTasks(manager.sortByPriority());
  else if (choice === "2") printTasks(manager.sortByDueDate());
  else if (choice === "3") printTasks(manager.sortByCreated());
  else console.log("Invalid option.");
}

async function main(): Promise<void> {
  while (true) {
    printMenu();

    const choice = await ask("Choose an option: ");

    if (choice === "1") {
      printTasks(manager.getAll());
    } else if (choice === "2") {
      await handleAdd();
    } else if (choice === "3") {
      await handleMarkDone();
    } else if (choice === "4") {
      await handleDelete();
    } else if (choice === "5") {
      storage.save(manager.getAll());
      console.log("Saved.");
    } else if (choice === "6") {
      await handleEdit();
    } else if (choice === "7") {
      await handleFilter();
    } else if (choice === "8") {
      await handleSort();
    } else if (choice === "9") {
      storage.save(manager.getAll());
      console.log("Goodbye!");
      rl.close();
      return;
    } else {
      console.log("Invalid option.");
    }
  }
}

main();