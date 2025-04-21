# 📝 Task Manager

A simple and secure **MERN + MySQL** full-stack application that allows users to manage their daily tasks with ease. Featuring **JWT-based authentication**, this app offers a clean UI and intuitive experience for task creation, updating, deletion, and status management.

[![Made by Subi Pokhrel](https://img.shields.io/badge/Made%20by-Subi%20Pokhrel-blueviolet)](https://github.com/subipokhrel) 
---

## 🚀 Features

- 🔐 **JWT Authentication** (Login, Register, Logout)
- ✅ **Add, View, Update, Delete Tasks**
- 🔄 Mark Tasks as:

    🕒 Not Started

    🔧 In Progress

    ✅ Done

    ⏸️ Deferred
- 📦 Organized codebase for scalability
- 🌐 Axios integration with `withCredentials`
- 📁 MySQL + Sequelize ORM

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React.js
- Context API
- Axios
- CSS

### 🔸 Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT, bcrypt

### 🔸 Database
- MySQL

---

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Handles login, register, logout logic
│   │   └── taskController.js       # Handles task CRUD operations
│   │
│   ├── models/
│   │   ├── index.js                # Initializes Sequelize & sets up DB connection
│   │   ├── User.js                 # User model
│   │   └── Task.js                 # Task model with status support
│   │
│   ├── routes/
│   │   ├── authRoutes.js           # Routes for /login, /register, /logout
│   │   ├── userRoutes.js           # (Optional) User-related routes
│   │   └── taskRoutes.js           # Routes for /tasks CRUD
│   │
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT auth verification
│   │
│   ├── .env                        # Environment variables (DB, JWT secret, etc.)
│   └── index.js                    # Express app entry point

├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Login.js            # Login form UI
│       │   ├── Register.js         # Registration form UI
│       │   └── Dashboard.js        # Task dashboard with status updates
│       │
│       ├── context/
│       │   └── AuthContext.js      # Handles auth state globally
│       │
│       ├── styles/
│       │   ├── Auth.css            # Styling for auth forms
│       │   └── Dashboard.css       # Styling for dashboard
│       │
│       ├── App.js                  # Main component with routing
│       └── index.js                # React entry point

```

---

## ⚙️ Environment Setup

### 1. Clone the Repo

```bash
git clone https://github.com/subipokhrel/task-manager.git
cd task-manager
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

#### 📄 Create `.env` file

```env
PORT=5000
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=database
JWT_SECRET=jwt_secret
```

#### ✅ Run Server

```bash
node index.js
```
---

### 3. Frontend Setup

```bash
npm start
```
> Make sure frontend runs on port different than backend and uses Axios with `withCredentials: true`.

---

## 🔗 API Endpoints

### 🔐 Auth
- `POST /api/register` – Registers a new user
- `POST /api/login` – Logs in a user and issues a JWT token
- `GET /api/verify` – Verifies if the user is authenticated using the JWT token
- `POST /api/logout` – Logs out the user by clearing the token cookie

### 📋 Tasks
- `GET /api/tasks` – Fetch user tasks
- `POST /api/tasks` – Create new task
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task by ID for the authenticated user

---
## 📸 Screenshots

### 🔐 Login Page
![image](https://github.com/user-attachments/assets/e7d8f23f-d011-491f-bce8-54f6392ac0ee)

### 📝 Register Page
![image](https://github.com/user-attachments/assets/450c68b1-74dc-4f1c-a26a-73e3010e405a)

### ➕ Dashboard
![image](https://github.com/user-attachments/assets/e705cf75-44ab-4a18-b23a-e517dbef127a)

---

## 👤 Author

**Subi Pokhrel**  
GitHub: [@subipokhrel](https://github.com/subipokhrel)

---
