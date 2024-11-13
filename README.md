# PDFUploader

## Overview

TaskManager is a web application that allows users to create,update and deletes tasks. The application supports features like user authentication, task creation,live task updates and task statistics. It uses Node.js, Express, and TypeScript for the backend, and Vite with React for the frontend.

## Live Demo

Visit the live application: [https://taskmanager-ashy-mu.vercel.app](https://taskmanager-ashy-mu.vercel.app)

## Repository

The source code is available on GitHub: [https://github.com/HishamPH/taskmanager](https://github.com/HishamPH/taskmanager)

## Features

### 1. User Authentication

- Register with email and password
- Login functionality
- Password reset option

### 2. Task Management

- Create new tasks
- Update tasks.
- Delete tasks.

### 3. Real Time Updates

- All task operations are updated real time.
- Task statistics are also shown

## Technologies Used

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** React, Vite
- **Database:** MongoDB
- **Deployment:** Vercel, AWS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud instance)

### Installation and Configuration

To set up the application, follow these commands:

1. Clone the Repository

```
git clone https://github.com/HishamPH/taskmanager.git
cd pdf-uploader/backend
npm i
```

2. Set Up the Backend Environment Variables

```
mv .env.example .env
echo "PORT=3000" >> .env
echo "MONGO_URL=<your-mongodb-uri>" >> .env
echo "ACCESS_TOKEN_SECRET=<your-access-token-secret>" >> .env
echo "REFRESH_TOKEN_SECRET=<your-refresh-token-secret>" >> .env
echo "BACKEND_URL=http://localhost:3000" >> .env
echo "ORIGIN=http://localhost:5000" >> .env
```

3. Frontend Setup

```
cd ../frontend
npm install
```

4. Set Up the Frontend Environment Variables

```
mv .env.example .env
echo "VITE_BACKEND=http://localhost:3000" >> .env
```
