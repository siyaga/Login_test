# Backend Technical Test - User & Career API

This repository contains the solution for the Backend Developer Technical Test. It is a RESTful API built with **Node.js**, **Express**, and **PostgreSQL** that handles user authentication, CRUD operations, and integrates with an external legacy system to search for career data.

## 🚀 Features

-   **Authentication**: Secure Register & Login using **JWT (JSON Web Tokens)** and **Bcrypt** for password hashing.
-   **User Management**: Complete CRUD (Create, Read, Update, Delete) for user profiles.
-   **External Integration**: Fetches and parses raw data (pipe-delimited format `|`) from an external legacy API.
-   **Smart Search**: Case-insensitive search functionality for Name, NIM, and Date (YMD).
-   **Architecture**: Built using the **MVC (Model-View-Controller)** pattern with a dedicated **Service Layer** for business logic.

## 🛠 Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: PostgreSQL
-   **ORM**: Sequelize
-   **Authentication**: JSON Web Token (JWT)
-   **HTTP Client**: Axios

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Prerequisites
Make sure you have the following installed:
-   Node.js (v14 or higher)
-   PostgreSQL
-   npm or yarn

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME

### 4. Environment Variables
Create a `.env` file in the root directory. You can copy the structure below into your `.env` file:

```env
PORT=3000

# Database Configuration
DB_NAME=your_database_name
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_HOST=localhost
DB_DIALECT=postgres

# JWT Configuration
JWT_SECRET=your_secure_random_secret_key

# External API Configuration (Required for Career Search)
CAREER_API_URL=
