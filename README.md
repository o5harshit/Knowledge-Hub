# AI-Powered Collaborative Knowledge Hub (MERN + Gemini)

An AI-powered collaborative knowledge management platform built using the **MERN stack** and **Gemini AI**. Teams can create, manage, search, and collaborate on knowledge documents, while AI automatically generates summaries, tags, and provides semantic search & Q&A capabilities.

---

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

- **Video Demo:** [Add Link to Demo Video]

---

## Features

### Authentication & Roles
- Email/password authentication with JWT.
- User roles: `user` and `admin`.
  - **Admin:** Can view, edit, and delete any document.
  - **User:** Can view and manage only their own documents.

### Document Management
- Create, read, update, delete (CRUD) documents.
- Document fields: `title`, `content`, `tags`, `summary`, `createdBy`, `createdAt`, `updatedAt`.

### Gemini AI Integration
- Automatic document summarization.
- Intelligent tag generation.
- Semantic search across all documents.
- Q&A: Ask questions with Gemini providing answers using stored documents as context.

### Frontend Pages
- Login / Register
- Dashboard (list of documents)
- Add/Edit Document
- Search Page with AI semantic results
- Team Q&A tab for collaborative questions

### Document Card Features
- Shows title, summary, tags, and author.
- Buttons:
  - `Summarize with Gemini`
  - `Generate Tags with Gemini`
- Tag-based filtering (chip-style filters).

### Extra Features (Optional)
- **Versioning:** Track edits and show document history.
- **Collaboration Feed:** Last 5 edited documents and editors on dashboard sidebar.

---

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Framer Motion, Redux
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **AI Integration:** Gemini AI for summaries, tags, semantic search, and Q&A
- **Authentication:** JWT + HTTP-only cookies

---

## Project Structure
```
root
├── client/ # React frontend
│ ├── src/
│ └── package.json
├── server/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── .env.example # Required environment variables
├── README.md
└── package.json
```

---

## Installation

### Clone the repo

```bash
git clone https://github.com/o5harshit/Knowledge-Hub.git
```

1) Server Setup
 - cd server
 - npm install
3) Client Setup
 - cd client
 - npm install
4) Environment Variables
 - MONGO_URI=<Your MongoDB connection string>
 - JWT_SECRET=<Your JWT secret>
 - GEMINI_API_KEY=<Your Gemini API key>
 - PORT=5000
5) Run Backend
 - cd server
 - npm run start
6)Run Frontend
 - cd client
 - npm run dev

License

MIT License

---

If you want, I can also **create a shorter “Student Assignment Ready” version** that highlights the demo steps and core features in a concise way for submission. 
