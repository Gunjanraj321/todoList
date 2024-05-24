# To-Do List Application

This is a simple To-Do List application built with React and Express.js. It features user authentication, task management with mark as done functionality, and the ability to share tasks with other users. The application demonstrates basic CRUD operations, user session handling, and notification mechanisms.

## Features

- User Authentication
- Add, Edit, and Delete To-Do Tasks
- Mark Tasks as Done
- Share Tasks with Other Users
- Notification System for Shared Tasks
- nodemailer authentication message to email id

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mayankpandey1099/todo_list.git
    cd todo-app
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Install Axios:

    ```bash
    npm install axios
    ```

4. (Optional) Install additional dependencies if needed:

    ```bash
    npm install express cors body-parser
    ```

### Running the Application

1. Start the backend server:

    ```bash
    node server.js
    ```

2. Start the React application:

    ```bash
    npm start
    ```

## Environment Variables

The application uses the following environment variables for configuration:

- `PORT`: Port number for the backend server
- `DB_HOST`: Database host
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `EMAIL_ID`: Email ID for sending notifications
- `EMAIL_PASS`: Email password
- `jwtSecret`: Secret key for JWT


## Running the Application

To run the full application (both backend and frontend), follow these steps:

1. Start the backend server as described in the [Backend Setup](#backend-setup) section.
2. Start the frontend server as described in the [Frontend Setup](#frontend-setup) section.

## Dependencies

### Backend Dependencies
- **bcrypt**: Library for hashing passwords
- **cors**: Middleware for enabling Cross-Origin Resource Sharing
- **dotenv**: Module for loading environment variables from a `.env` file
- **express**: Fast, unopinionated, minimalist web framework for Node.js
- **jsonwebtoken**: Library to work with JSON Web Tokens
- **mysql2**: MySQL client for Node.js
- **nodemailer**: Easy as cake email sending from Node.js
- **sequelize**: Promise-based ORM for Node.js

### Frontend Dependencies
- **@reduxjs/toolkit**: Efficient toolkit for Redux
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes
- **axios**: Promise based HTTP client for the browser and Node.js
- **webpack**: Blazing fast, zero configuration web application bundler
- **postcss-cli**: CLI for PostCSS
- **react**: A JavaScript library for building user interfaces
- **react-dom**: Serves as the entry point to the DOM and server renderers for React
- **react-redux**: Official React bindings for Redux
- **react-router-dom**: DOM bindings for React Router
- **tailwindcss**: A utility-first CSS framework for rapidly building custom designs




