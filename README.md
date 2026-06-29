# 🚀 Postman Clone

A full-stack Postman-inspired API testing application developed as a Software Development Engineer (SDE) Internship Assignment. The application enables users to create and organize API collections, send HTTP requests, inspect responses, and maintain request history through an intuitive and modern interface.

---

# 📌 Overview

This project replicates the core functionality of Postman by providing a complete API development and testing environment. It consists of a Next.js frontend and a FastAPI backend that communicate through REST APIs.

The application allows developers to:

- Create and organize API collections
- Save reusable API requests
- Execute HTTP requests
- Inspect responses
- View response metadata
- Maintain request history
- Test REST APIs efficiently

---

# ✨ Features

## Request Builder

- GET
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS

Supports:

- URL
- Query Parameters
- Headers
- Authorization
- Raw JSON Body

---

## Response Viewer

Displays:

- Response Body
- Pretty JSON Formatting
- Raw Response
- Response Headers
- Status Code
- Response Time
- Response Size

---

## Collections

- Create Collections
- View Collections
- Rename Collections
- Delete Collections
- Expand / Collapse Collections
- Save Requests inside Collections

---

## Saved Requests

- Save API requests
- Organize requests inside collections
- Load saved requests
- Preserve request configuration

---

## History

Automatically stores every executed request.

History includes:

- Method
- URL
- Status Code
- Response Time
- Response Size
- Request Body
- Response Body
- Timestamp

Users can:

- Reload requests from history
- Delete individual entries
- Clear entire history

---

## Modern UI

Inspired by Postman with:

- Dark Theme
- Sidebar Navigation
- Collection Explorer
- History Panel
- Request Editor
- Response Viewer
- Responsive Layout

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Axios
- Lucide React Icons

---

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- HTTPX

---

# 📂 Project Structure

```
postman-clone
│
├── backend
│   ├── app
│   │   ├── routers
│   │   ├── services
│   │   ├── utils
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── services
│   ├── store
│   ├── types
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/postman-clone.git

cd postman-clone
```

---

# Backend Setup

Navigate to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs at

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

# Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# API Modules

The backend exposes REST APIs for:

- Collections
- Requests
- Request Runner
- History
- Environments
- Variables

---

# Database

The application uses SQLite for persistence.

Stored data includes:

- Collections
- Saved Requests
- Request History
- Environments
- Variables

---

# Application Workflow

```
User

↓

Frontend (Next.js)

↓

FastAPI Backend

↓

SQLite Database

↓

HTTP Request Runner

↓

Target REST API

↓

Response

↓

Frontend Response Viewer
```

---

# Screens

The application contains:

- Collections Sidebar
- History Sidebar
- Request Builder
- URL Bar
- Authorization
- Headers
- Query Parameters
- Raw Body Editor
- Response Viewer
- Response Headers
- Pretty JSON Viewer

---

# Future Improvements

- Environment Variable Switching
- Import Collections
- Export Collections
- Authentication
- Workspace Support
- Multiple Request Tabs
- Themes
- GraphQL Support
- WebSocket Requests
- Cookie Manager
- Request Testing Scripts
- Mock Servers

---

# Learning Outcomes

This project demonstrates understanding of:

- REST APIs
- FastAPI
- SQLAlchemy ORM
- State Management using Zustand
- React Component Architecture
- CRUD Operations
- API Integration
- Full Stack Development
- HTTP Protocol
- Request/Response Lifecycle
- Modern UI Development

---

# Author

**Nithyaveni Ramesh**

MCA (Artificial Intelligence & Machine Learning)

---

# License

This project was developed as part of a Software Development Engineer Internship Assignment and is intended for educational and portfolio purposes.
