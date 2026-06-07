🚀 CodeCanvas

Full-Stack MERN Platform for Saving, Organizing & Searching Reusable Code Snippets

CodeCanvas is a production-oriented MERN stack application that enables users to securely create, organize, search, edit, and manage reusable code snippets through a modern and responsive interface.

Built using React.js, Node.js, Express.js, and MongoDB, the platform focuses on security, search efficiency, performance optimization, and scalable architecture.

---

🌐 Live Demo

🔗 Live Site: https://codecanvas-dev.vercel.app

---

📖 About

CodeCanvas is a full-stack MERN platform designed for saving, organizing, and searching reusable code snippets through a secure and intuitive workspace.

The platform enables users to create, edit, search, filter, and manage code snippets efficiently while maintaining personalized and secure access to their data. With support for language-based categorization, tag-based organization, advanced search capabilities, and favorite snippets management, CodeCanvas helps users quickly retrieve and reuse frequently used code.

The application implements secure JWT authentication, protected routes, HTTP-only cookies, rate limiting, token blacklisting, and optimized search functionality to deliver both security and performance.

---

✨ Features

🔐 Authentication & Security

- JWT Authentication
- HTTP-only Cookies
- Protected Routes
- bcrypt Password Hashing
- Secure Logout Mechanism
- Token Blacklisting
- Authentication Rate Limiting

📝 Snippet Management

- Create, Edit, and Delete Snippets
- User-Specific Snippet Storage
- Detailed Snippet View
- Pin-to-Favourites Functionality
- Secure CRUD Operations

🔍 Search & Organization

- Real-Time Search
- Multi-Field Regex Search
- Language-Based Filtering
- Tag-Based Filtering
- Debounced API Requests
- Instant Snippet Retrieval

💻 Code Editing Experience

- Monaco Editor Integration
- Multi-Language Syntax Highlighting
- Responsive UI
- Reusable Component Architecture

---

📸 Screenshots

Login Page

"Login" (./screenshots/login.png)

Dashboard

"Dashboard" (./screenshots/dashboard.png)

Create Snippet

"Create Snippet" (./screenshots/create-snippet.png)

Search & Filter

"Search" (./screenshots/search.png)

Favorites

"Favorites" (./screenshots/favorites.png)

---

🛠️ Tech Stack

Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- DaisyUI
- Monaco Editor
- React Hot Toast

Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Cookie Parser
- Express Rate Limit

Database

- MongoDB Atlas
- Mongoose

Deployment

- Vercel
- Render

---

🏗️ Architecture

Frontend (React + Vite)
        │
        ▼
REST API Layer
(Node.js + Express.js)
        │
        ▼
Authentication Layer
(JWT + HTTP-Only Cookies)
        │
        ▼
MongoDB Database

---

⚡ Performance Optimizations

Debounced Search

Implemented conditional debounced API requests (300ms) to minimize unnecessary network requests while maintaining real-time responsiveness.

Impact

- Reduced redundant API calls by up to 90%
- Improved frontend responsiveness
- Reduced backend workload

MongoDB TTL Index

Implemented TTL indexes for automatic expiration and cleanup of blacklisted JWT tokens.

Benefits

- Automatic token cleanup
- Reduced database maintenance
- Improved authentication efficiency

---

🚧 Engineering Challenges

Real-Time Search Optimization

Implemented conditional debounced API requests (300ms) to reduce redundant network requests while maintaining a responsive search experience.

Secure JWT Logout

Built a token blacklist mechanism using MongoDB TTL indexes to immediately invalidate logged-out tokens while automatically cleaning expired entries.

Authentication Security

Protected authentication routes using rate limiting to mitigate brute-force attacks and unauthorized access attempts.

User-Specific Data Isolation

Implemented authorization middleware and ownership validation to ensure users can only access and manage their own snippets.

Efficient Snippet Discovery

Designed multi-field regex search combined with language and tag-based filtering for fast and accurate snippet retrieval.

---

🚀 API Endpoints

Authentication Routes

Method| Endpoint| Description
POST| /api/auth/register| Register User
POST| /api/auth/login| Login User
POST| /api/auth/logout| Logout User
GET| /api/auth/me| Get Current User

Snippet Routes

Method| Endpoint| Description
GET| /api/snippets| Get All Snippets
GET| /api/snippets/:id| Get Single Snippet
POST| /api/snippets| Create Snippet
PUT| /api/snippets/:id| Update Snippet
DELETE| /api/snippets/:id| Delete Snippet

---

⚙️ Installation

Clone Repository

git clone https://github.com/your-username/codecanvas.git

cd codecanvas

Backend Setup

cd backend

npm install

Create a ".env" file:

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

Run Backend

npm run dev

Frontend Setup

cd frontend

npm install

npm run dev

---

🔮 Future Enhancements

- AI-Powered Snippet Recommendations
- Folder & Collection Management
- Public Snippet Sharing
- Team Collaboration
- Version History
- Import / Export Functionality

---

👨‍💻 Author

Panchadarla V Sai Niteesha Yadav

B.Tech Information Technology
Andhra University College of Engineering

📧 niteeshayadav66@gmail.com

🔗 LinkedIn: https://linkedin.com/in/niteeshayadav

💻 GitHub: https://github.com/niteeshayadav

⭐ If you found this project useful, consider giving it a star.

