
# To-do List Application

This is a simple To-do List application built with React and TypeScript. The application includes features for adding, deleting, and managing tasks, along with a basic authentication system.

## Features
- Add tasks
- Delete tasks
- Delete all tasks
- Sections for Current Tasks, All Tasks, Completed Tasks, and Trash
- User Authentication (Login: `admin`, Password: `admin`)
- Persistence of tasks even after page reloads

## Technologies Used
- React
- TypeScript
- Redux Toolkit
- Material-UI
- Styled-Components

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MarkZhebelev/TodoList.git
   cd TodoList
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   
3. **Run the application**:
   ```bash
   npm i && npm run start
   ```
Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

4. **Use the following login and password** 
   ```bash
   login: admin
   password: admin
   ```

## Routing
- `/auth` - Authentication page
- `/todolist` - Main To-do List page (Protected Route)

## Note
This project is designed for demonstration purposes. Please do not hardcode sensitive information in production.

## License
This project is open source and available under the MIT License.
