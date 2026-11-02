# 🎓 Student CRUD REST API (Node.js, Express, MongoDB Atlas)

A beginner-friendly backend CRUD REST API built with **Node.js**, **Express.js**, and **MongoDB Atlas** using **Mongoose ODM**. This project provides complete create, read, update, and delete functionality for student records.

---

## 📁 Project Structure

The project follows a clean Model-View-Controller (MVC) architecture pattern:

```text
webdev-assignment/
├── config/
│   └── db.js                 # MongoDB Atlas connection logic
├── controllers/
│   └── studentController.js  # CRUD business logic and request handlers
├── models/
│   └── Student.js            # Mongoose Schema & Model definition
├── routes/
│   └── studentRoutes.js      # Express router mapping HTTP routes to controllers
├── screenshots/              # Postman API testing screenshots
├── .env                      # Secret environment variables (ignored by Git)
├── .env.example              # Template for environment variables
├── .gitignore                # Prevents node_modules and .env from being tracked
├── package.json              # Project dependencies and npm scripts
├── postman_collection.json   # Ready-to-import Postman test collection
├── server.js                 # Main server entry point
└── README.md                 # Setup and testing documentation
```

---

## 🛠️ Tech Stack & Dependencies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, minimalist web framework for building REST APIs.
- **MongoDB Atlas**: Fully managed cloud NoSQL database.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **dotenv**: Loads environment variables from `.env` into `process.env`.
- **nodemon**: Developer tool that automatically restarts the server when file changes are detected.

---

## 📋 Prerequisites

Before starting, make sure you have:
1. **Node.js** (v16 or higher) installed on your system. Verify by running:
   ```bash
   node -v
   npm -v
   ```
2. A free **MongoDB Atlas** account: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
3. **Postman** desktop application or Postman web client: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Set Up MongoDB Atlas
1. Sign in to your [MongoDB Atlas account](https://cloud.mongodb.com).
2. Create a **New Cluster** (select the **Shared M0 Free Tier**).
3. Under **Security** > **Database Access**:
   - Click **Add New Database User**.
   - Choose **Password** authentication.
   - Enter a username and strong password (remember these!).
   - Set user privileges to **Read and write to any database**.
4. Under **Security** > **Network Access**:
   - Click **Add IP Address**.
   - Select **Allow Access From Anywhere** (`0.0.0.0/0`) for development.
5. In **Clusters**, click **Connect**:
   - Choose **Drivers** (Node.js).
   - Copy the connection string. It will look like this:
     ```
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
     ```

### Step 2: Configure Environment Variables
Open the `.env` file in the root directory and update it with your actual MongoDB Atlas connection string and chosen port:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/studentDB?retryWrites=true&w=majority
```
> ⚠️ **Important:**
> - Replace `<username>` with your database username.
> - Replace `<password>` with your database user password.
> - Replace `cluster0.abcde.mongodb.net` with your actual cluster host.
> - Notice `/studentDB` in the URI: this will automatically create a database named `studentDB`.
> - Never commit your `.env` file to Git!

### Step 3: Install Dependencies
Open your terminal in the project root folder and run:
```bash
npm install
```

### Step 4: Run the Server

- **For Development (Auto-reload on code change):**
  ```bash
  npm run dev
  ```

- **For Production:**
  ```bash
  npm start
  ```

> 💡 **Windows PowerShell Tip:** If you see `running scripts is disabled on this system`, use `npm.cmd run dev` or `npm.cmd start`.

When the server starts successfully, you will see output like:
```text
🚀 Server running on http://localhost:5000
✅ MongoDB Connected: cluster0-shard-00-00.abcde.mongodb.net
```

---

## 📌 API Endpoints Summary

| HTTP Method | Endpoint | Description | Success Status | Error Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | API Welcome & Endpoint index | `200 OK` | `500 Internal Server Error` |
| **POST** | `/api/students` | Create a new student record | `201 Created` | `400 Bad Request` |
| **GET** | `/api/students` | Get all students | `200 OK` | `500 Internal Server Error` |
| **GET** | `/api/students/:id` | Get a single student by ID | `200 OK` | `400 Bad Request`, `404 Not Found` |
| **PUT** | `/api/students/:id` | Update complete student details | `200 OK` | `400 Bad Request`, `404 Not Found` |
| **PATCH** | `/api/students/:id` | Partially update student fields | `200 OK` | `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/api/students/:id` | Delete a student by ID | `200 OK` | `400 Bad Request`, `404 Not Found` |

---

## 📮 How to Test Using Postman

### Option A: One-Click Import (Recommended)
1. Open Postman.
2. Click the **Import** button in the top left corner.
3. Select the file **`postman_collection.json`** located in the root of this project.
4. All 7 pre-configured requests will appear in your Postman sidebar ready to test!
5. **Auto-capture feature**: When you send Request 2 (*Create Student*), Postman automatically captures the generated `_id` into the collection variable `{{studentId}}`. Subsequent requests (Get by ID, Update, Partial Update, and Delete) will automatically use this ID!

---

### Option B: Step-by-Step Manual Testing

#### 1. Test Root / Health Check
- **Method:** `GET`
- **URL:** `http://localhost:5000/`
- **Click:** **Send**
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "message": "Welcome to the Student CRUD REST API!",
    "status": "Running",
    "endpoints": { ... }
  }
  ```

---

#### 2. CREATE: Add a New Student
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/students`
- **Headers:**
  - Key: `Content-Type` | Value: `application/json`
- **Body:** Select **raw** > **JSON** format, then paste:
  ```json
  {
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "course": "Computer Science",
    "age": 21
  }
  ```
- **Click:** **Send**
- **Expected Status:** `201 Created`
- **Expected Response:**
  ```json
  {
    "success": true,
    "message": "Student created successfully",
    "data": {
      "_id": "6724a1b2c3d4e5f678901234",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "course": "Computer Science",
      "age": 21,
      "createdAt": "2026-11-02T15:45:00.000Z",
      "updatedAt": "2026-11-02T15:45:00.000Z",
      "__v": 0
    }
  }
  ```
> 💡 **Tip:** Copy the generated `_id` value (`6724a1b2c3d4e5f678901234`). You will need it for the next requests!

---

#### 3. READ: Get All Students
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`
- **Click:** **Send**
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "6724a1b2c3d4e5f678901234",
        "name": "Alice Johnson",
        "email": "alice.johnson@example.com",
        "course": "Computer Science",
        "age": 21,
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
  ```

---

#### 4. READ: Get Single Student by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/6724a1b2c3d4e5f678901234` *(replace with your actual `_id`)*
- **Click:** **Send**
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "6724a1b2c3d4e5f678901234",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "course": "Computer Science",
      "age": 21
    }
  }
  ```

---

#### 5. UPDATE: Update Student Details
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/students/6724a1b2c3d4e5f678901234` *(replace with your actual `_id`)*
- **Headers:**
  - Key: `Content-Type` | Value: `application/json`
- **Body:** Select **raw** > **JSON**, then paste:
  ```json
  {
    "name": "Alice J. Walker",
    "course": "Data Science & Artificial Intelligence",
    "age": 22
  }
  ```
- **Click:** **Send**
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "data": {
      "_id": "6724a1b2c3d4e5f678901234",
      "name": "Alice J. Walker",
      "email": "alice.johnson@example.com",
      "course": "Data Science & Artificial Intelligence",
      "age": 22,
      "updatedAt": "..."
    }
  }
  ```

---

#### 6. PARTIAL UPDATE: Update Specific Fields (PATCH)
- **Method:** `PATCH`
- **URL:** `http://localhost:5000/api/students/6724a1b2c3d4e5f678901234` *(replace with your actual `_id`)*
- **Headers:**
  - Key: `Content-Type` | Value: `application/json`
- **Body:** Select **raw** > **JSON**, then paste:
  ```json
  {
    "age": 23
  }
  ```
- **Click:** **Send**
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "data": {
      "_id": "6724a1b2c3d4e5f678901234",
      "name": "Alice J. Walker",
      "email": "alice.johnson@example.com",
      "course": "Data Science & Artificial Intelligence",
      "age": 23,
      "updatedAt": "..."
    }
  }
  ```

---

#### 7. DELETE: Delete a Student
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/students/6724a1b2c3d4e5f678901234` *(replace with your actual `_id`)*
- **Click:** **Send**
- **Expected Status:** `200 OK`
- **Expected Response:**
  ```json
  {
    "success": true,
    "message": "Student 'Alice J. Walker' with ID 6724a1b2c3d4e5f678901234 was deleted successfully"
  }
  ```

---

#### 8. Testing Error Handling & Edge Cases

1. **Validation Error (Missing Fields):**
   - `POST /api/students` with body `{ "name": "Bob" }`
   - Response: `400 Bad Request` with message: `"Please provide all required fields: name, email, course, and age"`.

2. **Duplicate Email Error:**
   - Attempting to create a second student with the same email.
   - Response: `400 Bad Request` with message: `"A student with this email already exists"`.

3. **Invalid MongoDB ObjectId format:**
   - `GET /api/students/123invalidId`
   - Response: `400 Bad Request` with message: `"Invalid ID format: '123invalidId'. Must be a 24-character hexadecimal ID."`.

4. **Non-Existent Student ID:**
   - `GET /api/students/6724a1b2c3d4e5f678900000` (valid 24-hex string, but doesn't exist)
   - Response: `404 Not Found` with message: `"No student found with ID: 6724a1b2c3d4e5f678900000"`.

---

## 🛡️ Best Practices Implemented

1. **Security**:
   - Sensitive database credentials stored in `.env`.
   - `.env` and `node_modules` are ignored in `.gitignore`.
2. **Proper HTTP Status Codes**:
   - `200` for successful retrieval/update/delete.
   - `201` for successfully created resources.
   - `400` for invalid client input / malformed IDs.
   - `404` for non-existent records.
   - `500` for unhandled internal server errors.
3. **Robust Input Validation**:
   - Mongoose schema enforcement (required fields, regex email validation, positive number age).
   - Duplicate email detection before database insert.
   - MongoDB ObjectId validation via `mongoose.Types.ObjectId.isValid()`.
4. **Clean Code & Modularity**:
   - Organized into `config/`, `models/`, `controllers/`, and `routes/`.
   - Meaningful comments explaining every function for beginners.
