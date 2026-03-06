# CLI Task Manager

This project is a command-line task management application written in **TypeScript** and executed with **Node.js**. The program allows users to create, edit, complete, delete, and organize tasks directly from the terminal.

Tasks are stored locally in a **JSON file**, allowing them to persist between sessions. The application provides helpful features such as filtering tasks by status, sorting tasks by priority, and saving task data.

This project demonstrates core programming concepts such as modular code organization, file persistence, command-line interaction, and TypeScript type safety.

---

# Instructions for Build and Use

## Software Demo

[Software Demo](https://youtu.be/JAne2gkG5zA)

---

## Steps to build and/or run the software

1. Install **Node.js (version 24 or later)**.

2. Clone the repository:

```
git clone https://github.com/ewmoss42/cli-task-manager.git
cd cli-task-manager
```

3. Install project dependencies:

```
npm install
```

4. Run the application:

```
npm run dev
```

---

## Instructions for using the software

1. Run the program using `npm run dev`.

2. Select a menu option by entering the number shown in the CLI menu.

3. Available actions include:

- List tasks
- Add a task
- Mark a task as completed
- Edit task titles
- Delete tasks
- Filter tasks by status
- Sort tasks by priority
- Save tasks
- Exit the program

4. Tasks are saved in a local JSON file so they can be loaded again when the program runs.

---

# Development Environment

To recreate the development environment, you need the following software and libraries:

* Node.js v24
* TypeScript
* ts-node
* ESLint
* Git
* Visual Studio Code

Libraries installed with npm:

* typescript
* ts-node
* eslint
* @typescript-eslint/parser
* @typescript-eslint/eslint-plugin

---

# Useful Websites to Learn More

I found these websites useful in developing this software:

* [Node.js Documentation](https://nodejs.org/en/docs)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/)
* [ESLint Documentation](https://eslint.org/docs/latest/)
* [MDN Web Docs](https://developer.mozilla.org/)
* [Stack Overflow](https://stackoverflow.com/)

---

# Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Add task due dates and deadlines
* [ ] Add colored CLI output for better readability
* [ ] Add task categories or tags
* [ ] Implement automatic saving when tasks change
* [ ] Create a graphical or web interface version of the application