# CodeCanvas — Code Snippet Manager

> A full-stack MERN application for saving, organizing, and searching reusable code snippets — built with production-grade auth, a Monaco-powered code editor, and a responsive developer-first UI.

**[Live Demo](#)** · **[Backend API](#)**

---

## About the Project

CodeCanvas is a personal developer notebook that lets you store, tag, search, and manage code snippets across projects. Instead of digging through old files or browser tabs, snippets live in one place — filterable by language, tag, or keyword in real time.

The project was built end-to-end as a learning exercise in full-stack architecture, with deliberate focus on **security**, **clean API design**, and **responsive UI** — decisions documented below.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, DaisyUI, React Router v7 |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Backend** | Node.js, Express 5, REST API |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, httpOnly cookies, token blacklisting |
| **Other** | Axios, React Hot Toast, Lucide React, express-rate-limit |

---

## Features

- **JWT Authentication** — httpOnly cookie-based auth with a `rememberMe` option; logout invalidates the token via a blacklist collection
- **Token Blacklisting with TTL** — invalidated tokens are stored in MongoDB with a 7-day TTL index; expired entries are deleted automatically, no cron job needed
- **Rate Limiting** — `express-rate-limit` scoped to auth routes (10 requests / 15 min per IP) to prevent brute-force attacks
- **Monaco Editor** — VS Code's editor renders on `lg+` screens; gracefully falls back to a plain `<textarea>` on mobile, avoiding layout issues from Monaco's fixed-size rendering model
- **Debounced Search** — 300ms debounce on the search input prevents redundant API calls on every keystroke
- **Filter Modal** — filter snippets by language, tags, or favourites using DaisyUI components
- **Pin / Favourite Snippets** — toggle-pin with optimistic UI update; pinned snippets sort to the top of the dashboard
- **Protected Routes** — auth middleware verifies the token and checks the blacklist on every protected request; public routes (login/register) redirect authenticated users away
- **Full CRUD** — create, view, edit, delete snippets; each snippet scoped to the authenticated user via `user: req.user.id`

---

## Architecture

```
CodeCanvas/
├── Backend/
│   ├── server.js                   # Entry point, DB connection
│   └── src/
│       ├── app.js                  # Express app, CORS, middleware setup
│       ├── config/database.js
│       ├── controllers/
│       │   ├── auth.controller.js  # register, login, logout, getMe
│       │   └── snippet.controller.js # CRUD + search + pin
│       ├── middlewares/
│       │   ├── auth.middleware.js  # JWT verify + blacklist check
│       │   └── error.middleware.js
│       ├── models/
│       │   ├── user.model.js
│       │   ├── snippet.model.js
│       │   └── blacklist.model.js  # TTL index: auto-expires in 7 days
│       └── routes/
│           ├── auth.routes.js      # Rate-limited auth endpoints
│           └── snippet.routes.js
└── Frontend/
    └── src/
        ├── components/
        │   ├── SnippetForm.jsx     # Monaco (lg+) / textarea (mobile) editor
        │   ├── SnippetsGrid.jsx    # Debounced search + filter + pin
        │   ├── FilterModal.jsx
        │   └── ...
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── ProfilePage.jsx     # GitHub-dark aesthetic profile card
        │   └── ...
        ├── context/AuthContext.jsx
        └── services/
            ├── api.js              # Axios instance (withCredentials)
            ├── authService.js
            └── snippetService.js
```

---

## API Reference

### Auth — `/api/auth` *(rate-limited: 10 req / 15 min)*

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/register` | Register new user | Public |
| `POST` | `/login` | Login, sets httpOnly cookie | Public |
| `POST` | `/logout` | Clears cookie, blacklists token | Public |
| `GET` | `/me` | Get current user details | Private |

### Snippets — `/api/snippets`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/` | Get all snippets (supports `?language=`, `?tags=`, `?favouritesOnly=true`) | Private |
| `GET` | `/search?q=` | Full-text search across title, language, description, code | Private |
| `POST` | `/` | Create snippet | Private |
| `GET` | `/:id` | Get snippet by ID | Private |
| `PATCH` | `/:id` | Update snippet | Private |
| `DELETE` | `/:id` | Delete snippet | Private |
| `PATCH` | `/:id/pin` | Toggle pin/favourite | Private |

> **Note:** `/search` is registered *before* `/:id` in the route file to prevent Express from mismatching the literal `"search"` as a dynamic `:id` parameter.

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

```bash
npm run dev
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Design Decisions

**Why httpOnly cookies instead of localStorage for JWT?**  
Tokens in localStorage are accessible to JavaScript, making them vulnerable to XSS. httpOnly cookies cannot be read by client-side scripts. Combined with `SameSite: None; Secure` in production, this significantly reduces the attack surface.

**Why token blacklisting on logout?**  
JWTs are stateless by design — once issued, they're valid until expiry. Without a blacklist, a logged-out user's token could still be used if intercepted. The blacklist collection with a MongoDB TTL index handles cleanup automatically without any external scheduler.

**Why a Monaco fallback on mobile?**  
Monaco Editor requires a known height container and doesn't reflow naturally on small screens. Rather than fighting the layout, the component detects viewport width (`window.innerWidth >= 1024`) and renders a styled `<textarea>` on mobile — same data model, no broken editor.

**Why debounce on search instead of firing on every keystroke?**  
Without debounce, each character typed triggers an API call. A 300ms debounce means the request fires only after the user pauses, reducing unnecessary load on both the server and the database.

---

## Author

**Panchadarla V Sai Niteesha Yadav**  
B.Tech Information Technology — Andhra University College of Engineering  
[LinkedIn](#) · [GitHub](#)

