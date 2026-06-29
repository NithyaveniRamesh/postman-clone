# Postman Clone

A full-stack Postman-inspired API testing application built as an SDE Internship assignment.

## Features

- Send HTTP requests (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)
- Request history
- Create and manage collections
- Save API requests inside collections
- View formatted JSON responses
- Headers, Parameters, Authorization, and Body support
- FastAPI REST API backend
- Modern Next.js frontend

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- Axios

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

## Project Structure

```
postman-clone/
│
├── frontend/
│   └── Next.js Application
│
└── backend/
    └── FastAPI Application
```

## Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Runs at:

```
http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at:

```
http://localhost:3000
```

## API Features

- Collections
- Saved Requests
- Request History
- Request Runner
- Response Viewer

## Future Improvements

- Environment Variables
- Import/Export Collections
- Dark/Light Theme
- Authentication
- Request Tabs Persistence

## Author

Nithyaveni Ramesh
