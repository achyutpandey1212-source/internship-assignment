# Frontend Architecture & Development Guidelines

**Project Name:** AuthFlow (Working Title)  
**Version:** 1.0  
**Framework:** React + Vite + TypeScript  
**Architecture:** Component-Based Layered Architecture

---

# 1. Purpose

This document defines the architecture, coding standards, project structure, and development conventions for the frontend.

The primary objective is to create a scalable, maintainable, and production-quality frontend while keeping the project intentionally simple.

Every developer or AI assistant contributing to this project should follow these guidelines.

---

# 2. Guiding Principles

The frontend should prioritize:

- Simplicity
- Readability
- Reusability
- Consistency
- Scalability
- Type Safety
- Separation of Concerns

Avoid clever code.

Prefer explicit, readable implementations.

---

# 3. Technology Stack

## Core

- React
- Vite
- TypeScript

## Routing

- React Router DOM

## HTTP Client

- Axios

## Form Handling

- React Hook Form

## Validation

- Zod
- @hookform/resolvers

## Notifications

- React Hot Toast

## Styling

Follow the Scout Design System.

---

# 4. Folder Structure

```
src
│
├── api
│   └── axios.ts
│
├── assets
│   ├── images
│   ├── icons
│   └── logos
│
├── components
│   ├── ui
│   ├── forms
│   ├── layout
│   └── shared
│
├── context
│   └── AuthContext.tsx
│
├── hooks
│
├── layouts
│   ├── MainLayout.tsx
│   └── AuthLayout.tsx
│
├── pages
│   ├── Landing
│   ├── Login
│   ├── Signup
│   ├── Dashboard
│   └── NotFound
│
├── routes
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
│
├── services
│   └── auth.service.ts
│
├── styles
│
├── types
│
├── utils
│
├── App.tsx
│
└── main.tsx
```

---

# 5. Layered Architecture

The frontend follows a strict layered architecture.

```
Pages

↓

Components

↓

Services

↓

Axios Client

↓

Backend API
```

Pages should never directly communicate with the backend.

---

# 6. Responsibilities

## Pages

Responsible for:

- Page composition
- Calling services
- Managing page-level state

Pages should not contain business logic.

---

## Components

Responsible for UI only.

Components should:

- Receive props
- Render UI
- Emit events

They should not perform API requests.

---

## Services

Responsible for all communication with the backend.

Every API request should live inside the services folder.

Example:

```
login()

signup()

logout()

refreshToken()

getCurrentUser()
```

---

## Axios Client

A single Axios instance should be configured.

Responsibilities:

- Base URL
- Authorization Header
- Request Interceptors
- Response Interceptors
- Error Handling

The application should never create multiple Axios instances.

---

# 7. Routing

Public Routes

```
/

/login

/signup
```

Protected Routes

```
/dashboard
```

Unknown Routes

```
*
```

↓

404 Page

---

# 8. Authentication Flow

## Signup

User fills form

↓

Validation

↓

Signup Service

↓

Backend

↓

Receive Tokens

↓

Store Tokens

↓

Navigate Dashboard

---

## Login

User Login

↓

Backend Verification

↓

Receive Tokens

↓

Store Tokens

↓

Navigate Dashboard

---

## Dashboard

User visits Dashboard

↓

Read Access Token

↓

GET /me

↓

Display User

---

## Logout

User clicks Logout

↓

Logout API

↓

Clear Tokens

↓

Navigate Login

---

# 9. State Management

The project intentionally avoids Redux.

Use:

Local State

↓

React Context

Only authentication-related global state should be stored in Context.

Examples:

- Current User
- Authentication Status
- Loading User

Do not place page-specific state inside Context.

---

# 10. Token Storage

For this assignment:

Store:

```
Access Token

Refresh Token
```

inside localStorage.

Future production implementations can migrate to HttpOnly cookies.

---

# 11. API Layer

Every endpoint should have its own service method.

Example:

```
AuthService.signup()

AuthService.login()

AuthService.logout()

AuthService.refresh()

AuthService.getCurrentUser()
```

Pages should never import Axios directly.

---

# 12. Error Handling

API errors should be converted into user-friendly messages.

Display errors using:

- Inline validation
- Toast notifications
- Error cards

Never expose raw backend stack traces.

---

# 13. Form Architecture

Every form should follow the same pattern.

```
React Hook Form

↓

Zod Validation

↓

Submit Handler

↓

Service

↓

Backend
```

Validation should happen before sending requests.

---

# 14. Reusable Components

Every reusable UI element should live inside the components folder.

Examples:

```
Button

Input

Card

Navbar

Footer

Container

Loader

Badge

Modal

Section
```

Avoid duplicate implementations.

---

# 15. Custom Hooks

Hooks should encapsulate reusable logic.

Examples:

```
useAuth()

useCurrentUser()

useLogout()

useToast()
```

Hooks should never render UI.

---

# 16. Layouts

Create reusable layouts.

MainLayout

Used for:

Landing

Dashboard

AuthLayout

Used for:

Login

Signup

This keeps pages lightweight.

---

# 17. Naming Conventions

Components

```
PascalCase
```

Example

```
LoginForm.tsx
```

Hooks

```
camelCase

useAuth.ts
```

Pages

```
PascalCase

Dashboard.tsx
```

Services

```
auth.service.ts
```

Types

```
auth.types.ts
```

---

# 18. TypeScript Guidelines

Use strict typing everywhere.

Avoid:

```
any
```

Prefer:

- Interfaces
- Type aliases
- Enums where appropriate

Every API response should have a corresponding TypeScript type.

---

# 19. Performance

Keep components small.

Avoid unnecessary renders.

Memoize only when needed.

Do not optimize prematurely.

---

# 20. Responsive Design

Support:

- Mobile
- Tablet
- Laptop
- Desktop

Every page should be fully responsive.

Avoid separate mobile pages.

---

# 21. Accessibility

Every form should support:

- Keyboard navigation
- Focus states
- Labels
- Semantic HTML
- Screen reader compatibility where appropriate

---

# 22. Project Structure Rules

Pages should never exceed reasonable complexity.

If a page becomes too large:

Extract components.

Prefer composition over massive files.

---

# 23. Code Style

Prefer:

Early returns

Small functions

Meaningful variable names

Explicit typing

Readable JSX

Avoid deeply nested logic.

---

# 24. Development Workflow

Every new feature should follow this order.

1. Update PRD if needed

↓

2. Update Design System if required

↓

3. Create UI Components

↓

4. Create Services

↓

5. Build Page

↓

6. Connect Backend

↓

7. Test

---

# 25. Deployment Architecture

```
Frontend (Vercel)

↓

Axios

↓

Backend API (Render)

↓

MongoDB Atlas
```

Environment variables should be used for API URLs.

---

# 26. Future Scalability

The architecture should allow future additions such as:

- Profile Page
- Settings
- Forgot Password
- Email Verification
- User Preferences
- Theme Support
- OAuth
- Role-Based Access Control

without restructuring the application.

---

# 27. Definition of Done

A feature is complete only when:

- Functionality works
- Responsive design is verified
- TypeScript has no errors
- No ESLint warnings
- Components are reusable
- Services are separated
- Error handling exists
- Loading states exist
- Design follows the Scout-inspired Design System
- Code is clean, readable, and maintainable

---

# 28. Final Development Philosophy

This project should feel like a real production frontend built by a small startup team rather than an internship demo.

Every component should have a clear responsibility.

Every page should feel cohesive.

Every interaction should feel intentional.

The codebase should be easy for another developer to understand, extend, and maintain with minimal onboarding.