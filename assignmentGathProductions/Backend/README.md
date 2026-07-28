# JWT Authentication Backend

A production-inspired authentication backend built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **JWT**.  
Designed to demonstrate scalable backend architecture, secure auth flows, and clean code practices suitable for production environment.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Security Features](#security-features)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Design Decisions](#design-decisions)
- [Future Improvements](#future-improvements)
- [Learning Outcomes](#learning-outcomes)

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Language | TypeScript |
| Database | MongoDB |
| ODM | Mongoose |
| Auth | JWT (Access + Refresh Tokens) |
| Hashing | bcrypt |
| Validation | Zod |
| Utilities | dotenv, cors, cookie-parser |

---

## Architecture

```
Request
  ↓
Routes
  ↓
Controllers
  ↓
Services
  ↓
Utilities / Models
  ↓
MongoDB
```

- **Routes** — define endpoints and apply middleware
- **Controllers** — thin HTTP adapters; no business logic
- **Services** — contain all business logic
- **Utilities** — reusable helpers (hashing, tokens, errors)
- **Middleware** — auth validation, request validation, error handling

---

## Folder Structure

```
src/
├── config/
│   ├── config.ts
│   └── database.ts
├── controllers/
│   └── Auth.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
├── models/
│   └── user.model.ts
├── routes/
│   └── Auth.routes.ts
├── services/
│   └── Auth.service.ts
├── types/
│   ├── auth.types.ts
│   └── express.d.ts
├── utils/
│   ├── ApiError.ts
│   ├── asyncHandler.ts
│   ├── password.ts
│   └── token.ts
├── validators/
│   └── auth.validator.ts
├── app.ts
└── server.ts
```

---

## API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/auth/signup` | Register a new user | No |
| `POST` | `/api/v1/auth/login` | Login and receive tokens | No |
| `POST` | `/api/v1/auth/logout` | Invalidate refresh token | Yes |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token | No |
| `GET` | `/api/v1/auth/me` | Get current user profile | Yes |

---

## Authentication Flow

### Signup

```
Client sends name, email, password
  ↓
Validate input (Zod)
  ↓
Check for duplicate email
  ↓
Hash password (bcrypt)
  ↓
Create user in MongoDB
  ↓
Generate access token (15m) and refresh token (7d)
  ↓
Store refresh token hash in user document
  ↓
Return tokens + user data
```

### Login

```
Client sends email, password
  ↓
Validate input (Zod)
  ↓
Find user by email
  ↓
Compare password (bcrypt)
  ↓
Generate new access + refresh tokens
  ↓
Store new refresh token in MongoDB
  ↓
Return tokens + user data
```

### Refresh Token Rotation

```
Client sends refresh token
  ↓
Verify JWT signature using JWT_REFRESH_SECRET
  ↓
Find user in MongoDB
  ↓
Compare stored refresh token with provided token
  ↓
Generate new access + refresh tokens
  ↓
Replace stored refresh token with new one
  ↓
Return new tokens
```

### Logout

```
Client sends access token (Bearer)
  ↓
authenticateUser middleware verifies access token
  ↓
Service sets user.refreshToken = null in MongoDB
  ↓
Return success response
```

### Protected Route (`GET /me`)

```
Client sends access token (Bearer)
  ↓
authenticateUser middleware verifies token
  ↓
req.user is attached to request
  ↓
Controller returns req.user data
```

---

## Security Features

### Password Hashing
- Uses **bcrypt** with configurable salt rounds (default: 10).
- Plaintext passwords are never stored or logged.
- Hashing happens in the service layer before database writes.

### JWT Authentication
- **Short-lived access tokens** (15 minutes) limit exposure if leaked.
- **Refresh token rotation** ensures old refresh tokens cannot be reused.
- Tokens are signed with separate secrets (`JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`).

### Refresh Token Rotation
- Each refresh request invalidates the previous refresh token and issues a new one.
- Stored in MongoDB and validated on every use.
- Prevents replay attacks and reduces the impact of token theft.

### Protected Routes
- `authenticateUser` middleware verifies Bearer tokens on protected routes.
- Attaches decoded user payload to `req.user` for downstream use.

### Centralized Error Handling
- Custom `ApiError` class carries HTTP status codes.
- Global error middleware formats all errors consistently.
- Prevents stack traces and internal details from reaching clients.

### Environment Variables
- All secrets and configuration loaded from `.env`.
- Required variables are validated at startup.
- `dotenv` ensures local development does not require manual config.

---

## Error Handling

### ApiError Class
A custom error class that extends `Error` and carries:
- `statusCode` — HTTP status to return
- `message` — client-safe error description
- `isOperational` — flag distinguishing expected errors from bugs

```typescript
throw new ApiError(409, 'User with this email already exists');
```

### Global Error Middleware
Registered after all routes. It inspects the error:
- If `instanceof ApiError` → returns the stored status code and message
- Otherwise → returns `500 Internal Server Error` with no details

```typescript
// error.middleware.ts
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
```

### Why services throw, controllers catch
- Services define business rules and throw on failure.
- Controllers forward errors to `next(error)`.
- The global middleware decides the final HTTP response.
- This keeps services testable without Express and controllers free of response logic.

---

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/auth-db` |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens | `supersecretkey` |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens | `anothersecretkey` |
| `NODE_ENV` | Environment mode | `development` |
| `CLIENT_URL` | Frontend origin for CORS | `http://localhost:5173` |

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

```bash
git clone <repo-url>
cd assignmentGathProductions/Backend
npm install
```

### Configuration

```bash
cp .env.example .env
```

Update `.env` with your values.

### Run

```bash
npm run dev
```

Server starts at `http://localhost:5000`.

Health check:
```bash
curl http://localhost:5000/
```

---

## Deployment

### Backend — Render

1. Create a new **Web Service** on Render
2. Connect your GitHub repository
3. Configure:
   - **Root Directory:** `Backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start` (or configure for tsx: `npx tsx server.ts`)
   - **Environment:** Node
4. Add environment variables in Render dashboard:
   - `PORT` — Render sets this automatically
   - `MONGODB_URI` — your MongoDB Atlas connection string
   - `JWT_ACCESS_SECRET` — generate a secure random string
   - `JWT_REFRESH_SECRET` — generate a secure random string
   - `NODE_ENV` — `production`
   - `CLIENT_URL` — your Vercel frontend URL (for CORS)
5. Deploy. Render will provide a public URL like `https://your-app.onrender.com`

### Frontend — Vercel

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Configure:
   - **Root Directory:** `Frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add environment variable:
   - `VITE_API_URL` — your Render backend URL (e.g., `https://your-app.onrender.com/api/v1`)
5. Deploy. Vercel will provide a public URL like `https://your-app.vercel.app`

### Post-Deployment Checklist

- [ ] Backend health check returns `{ success: true }`
- [ ] Frontend loads without console errors
- [ ] CORS allows frontend origin
- [ ] Signup creates a new user in MongoDB
- [ ] Login returns access and refresh tokens
- [ ] Dashboard loads user data
- [ ] Logout invalidates refresh token
- [ ] Protected routes redirect unauthenticated users

---

## Design Decisions

### Layered Architecture
Separating routes, controllers, services, and utilities makes the codebase easy to navigate, test, and extend. Each layer has a single responsibility.

### Services Over Controller Logic
Keeping business logic in services makes it framework-agnostic. Controllers become thin HTTP adapters that can be unit tested or swapped without touching core logic.

### TypeScript
Strong typing prevents entire classes of runtime bugs. Interfaces for DTOs and responses create clear contracts between layers.

### Zod Validation
Runtime validation at the middleware layer rejects malformed requests before they reach services. This is the first line of defense after the network boundary.

### JWT Over Sessions
JWT is stateless and scales horizontally without shared session stores. Refresh tokens stored in MongoDB add a revocation layer without losing the stateless benefits.

### Refresh Token Rotation
Issuing a new refresh token on every use limits the blast radius of a stolen token. The old token becomes useless immediately.

---

## Future Improvements

- [ ] Email verification on signup
- [ ] Forgot / reset password flow
- [ ] Role-based access control (RBAC)
- [ ] OAuth2 / social login
- [ ] Rate limiting and brute-force protection
- [ ] Redis-backed token blacklisting
- [ ] Docker and docker-compose setup
- [ ] CI/CD pipeline
- [ ] Unit and integration tests
- [ ] API documentation (Swagger / OpenAPI)

---

## Learning Outcomes

This project demonstrates practical experience with:

- RESTful API design
- Authentication and authorization flows
- JWT lifecycle management
- Express middleware patterns
- TypeScript in a Node.js backend
- MongoDB and Mongoose schema design
- Clean architecture and separation of concerns
- Security best practices for production backends

---

## License

MIT

---

*Built as part of an internship assignment. Designed for clarity, correctness, and production-readiness.*
