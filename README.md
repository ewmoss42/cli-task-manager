# CLI Task Manager

## Overview

The CLI Task Manager is a TypeScript command-line application designed to help users manage tasks directly from the terminal. The program allows users to create, edit, delete, complete, filter, and sort tasks while storing all task data in a local JSON file for persistence between sessions.

This project demonstrates the use of TypeScript classes, functions, arrays, tuples, and file storage using Node.js. The goal of this project was to practice building a structured TypeScript application while managing data and user interaction through a command-line interface.

---

## Features

The CLI Task Manager allows users to:

* Add new tasks with title, description, priority, and optional due date
* List all tasks
* Mark tasks as completed
* Edit existing tasks
* Delete tasks
* Filter tasks by status (todo or done)
* Sort tasks by priority, due date, or creation date
* Automatically save tasks to a JSON file
* Load tasks from storage when the program starts

Tasks are stored locally in `tasks.json`, allowing the program to remember tasks across sessions.

---

## Software Demo Video

📹 Demo Video:
https://youtu.be/JAne2gkG5zA

The video demonstrates:

* Running the CLI program
* Creating tasks
* Editing tasks
* Marking tasks complete
* Filtering and sorting tasks
* JSON persistence between program runs

---

## Development Environment

Tools used to develop this software:

* Visual Studio Code
* Node.js
* TypeScript
* ESLint
* Git and GitHub
* macOS Terminal

---

## Programming Language

This project was written using:

* **TypeScript**
* **Node.js**

Key TypeScript features used include:

* Classes
* Functions
* Arrays
* Tuples
* Typed objects
* Async/await functions
* File system interaction using Node.js

---

## How to Build and Run the Program

### Install dependencies

```bash
npm install
```

### Run the program

```bash
npm run dev
```

This will start the CLI interface where users can interact with the task manager.

---

## Project Structure

```
cli-task-manager
│
├── src
│   ├── models
│   │   └── Task.ts
│   ├── services
│   │   ├── TaskManager.ts
│   │   └── StorageService.ts
│   └── index.ts
│
├── package.json
├── eslint.config.js
└── README.md
```

---

## Future Work

Possible improvements for the project include:

* Adding colored CLI output
* Implementing search functionality for tasks
* Adding unit tests using Jest
* Exporting tasks to other formats (CSV or database)
* Adding a graphical user interface version

---

## Reflection

This project helped reinforce the structure of a TypeScript application using multiple files, services, and models. I learned how to manage application state using arrays and classes while also persisting data through JSON storage.

Working with Node.js file operations and command-line input helped deepen my understanding of how backend applications process user interaction and maintain data.

Overall, this project improved my understanding of TypeScript project organization and strengthened my experience using Git, ESLint, and Node.js in a real software project.
