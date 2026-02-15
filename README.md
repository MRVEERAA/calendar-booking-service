# Calendar Booking Service API

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication

---

## Setup Instructions

### 1. Clone the repository

git clone <repo-url>

### 2. Install dependencies

npm install

### 3. Setup PostgreSQL

Create a database named:

meetings_db

---

### 4. Configure environment variables

Copy .env.example to .env

Update DB credentials.

---

### 5. Run migrations

npx sequelize-cli db:migrate

---

### 6. Start server

npm run dev

Server runs at:
http://localhost:3000
