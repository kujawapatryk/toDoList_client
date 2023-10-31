# ToDoList

## Project Description
ToDoList is an application created as part of a recruitment task for the Fullstack Developer position. Its main goal was to create a simple "To Do List" application using technologies: TypeScript, React, Docker, and NestJS. The application allows users to add, delete, and mark tasks as completed. It was designed according to the task guidelines, focusing on delivering an MVP without additional features.

[See the live version](https://todo.heyweb.pl/)

![ToDoList Application in Action](https://github.com/kujawapatryk/kujawapatryk/blob/main/toDoList.gif)

## Features
- Adding a new task to the list.
- Deleting a task from the list.
- Marking a task as completed (changing the appearance of the task to crossed out).
- Unit tests for key functionalities such as adding, deleting, and updating tasks.
- Backend endpoints for adding, deleting, and updating tasks.
- Using Docker to run the entire application (frontend + backend).

## Technologies
- **Frontend**: TypeScript, React, Cypress, Docker.
- **Backend (Nest.js)**: Nest.js, MariaDB, Jest, Docker. [Repository](https://github.com/kujawapatryk/toDoList_server)
- **Backend (Laravel)**: Laravel, MariaDB, PHPUnit. [Repository](https://github.com/kujawapatryk/toDoList_server_laravel)

## Repository Structure
- The main directory contains the source code for the frontend and the `Dockerfile`.
- The `/api` subdirectory contains the source code for the Nest.js backend and its own `Dockerfile`.

## Running with Docker Compose
The project utilizes `docker-compose` to orchestrate containers for the frontend, the Nest.js backend, and the MariaDB database.

### Running the application:
1. Clone the `toDoList-client` repository.
2. Inside the main directory of the cloned `toDoList-client`, clone the `toDoList-server` repository into the `/api`,
3. Ensure that the `/api` subdirectory with the Nest.js backend source code is now present in the main directory.
4. Create a `.env` file in the main project directory with the appropriate environment variables for MariaDB.
5. Run the command `docker-compose up --build` in the main directory of the project. This command will build and start all services defined in the `docker-compose.yml` file, with the understanding that the Docker environment is specifically configured for the Nest.js backend.
6. Once built, the frontend application will be available at `localhost:3000`, and the Nest.js backend at `localhost:5000`.


## Installation
1. Clone the repository to your local computer.
2. Install dependencies using the appropriate command (e.g., `npm install` for frontend).
3. Configure the database connection in the relevant configuration file.
4. Run database migrations (if applicable).
5. Start the development server.
