# 🚀 Todo Manager API

A robust RESTful backend service for managing Todo items. This microservice handles the creation, retrieval, updates, and deletion of tasks, persisting data to a 🍃 MongoDB database.

## 🛠️ Tech Stack

This project utilizes the following technologies:

| Tech | Description | Badge |
| :--- | :--- | :--- |
| **Node.js** | JavaScript runtime built on Chrome's V8 engine for fast, scalable server-side execution. | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) |
| **Express.js** | Minimal and flexible web application framework for building robust RESTful APIs. | ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) |
| **MongoDB** | Document-oriented NoSQL database for flexible, JSON-like data storage. | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) |
| **Mongoose** | Elegant Object Data Modeling (ODM) library for MongoDB and Node.js. | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white) |
| **Dotenv** | Zero-dependency module for loading environment variables from `.env`. | ![Dotenv](https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=.env&logoColor=black) |
| **Nodemon** | Utility that automatically restarts the server when file changes are detected. | ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) |

## 📋 Prerequisites

Ensure you have the following installed on your local machine:
1.  **Node.js**: v18.0.0 or higher.
2.  **npm**: Comes with Node.js.
3.  **MongoDB**: A local instance running on default port `27017` or access to a cloud instance.

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

**1. Create the file:**

```
touch .env
```

**2. Add the variables:**

| Variable | Description | Example Value |
| :--- | :--- | :--- |
| `PORT` | The port the server listens on. | `8080` |
| `DB_URL` | Connection string for MongoDB. | `mongodb://localhost:27017/project` |

## ⚙️ Installation & Run

1.  **Clone the repository** and navigate to the server directory:
    
    ```
    git clone https://github.com/KollaUpendra/todomanager.git
    cd todomanager/server
    ```

2.  **Install dependencies**:
    
    ```
    npm install
    ```

3.  **Start the server**:

    *   **Development Mode** (with auto-reload):
        
        ```
        npx nodemon server.js
        ```

    *   **Production Mode**:
        
        ```
        node server.js
        ```

    You should see the output:
    
    ```
    Database connection success
    HTTP server listening on port 8080
    ```

## 💾 Database Setup

*   The application uses **Mongoose**, so **no manual migrations** are required.
*   The database and `todos` collection will be created automatically upon the first write operation.
*   ⚠️ **Important**: Ensure your MongoDB instance is running before starting the server.

## 🔌 API Documentation

The API listens at `http://localhost:<PORT>/api`. You can find sample requests in the `req.http` file.

### Endpoints

| Method | Endpoint | Description | Request Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/todos` | Create a new Todo | `{ "title": "...", "description": "...", "completed": false, "priority": "high", "dueDate": "..." }` |
| **GET** | `/api/todos` | Get all Todos | N/A |
| **GET** | `/api/todos/:id` | Get a specific Todo | N/A |
| **PUT** | `/api/todos/:id` | Update a Todo | `{ "title": "...", "completed": true, ... }` |
| **DELETE** | `/api/todos/:id` | Delete a Todo | N/A |
