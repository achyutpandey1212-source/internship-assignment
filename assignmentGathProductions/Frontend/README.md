# AuthFlow Frontend

A production-inspired React frontend for the AuthFlow authentication system. Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **React Router**.

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Forms | React Hook Form + Zod |
| Notifications | React Hot Toast |

---

## Folder Structure

```
src/
├── api/
│   └── axios.ts
├── assets/
│   ├── fonts/
│   ├── images/
│   ├── icons/
│   └── logos/
├── components/
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   ├── Loader.tsx
│   │   ├── Section.tsx
│   │   └── Input.tsx
│   ├── forms/
│   │   └── Form.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── context/
│   └── AuthContext.tsx
├── layouts/
│   ├── MainLayout.tsx
│   └── AuthLayout.tsx
├── pages/
│   ├── Landing/
│   ├── Login/
│   ├── Signup/
│   ├── Dashboard/
│   └── NotFound/
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── services/
│   └── auth.service.ts
├── styles/
│   └── globals.css
├── types/
│   ├── auth.ts
│   └── routes.ts
├── utils/
│   └── tokenStorage.ts
├── App.tsx
└── main.tsx
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- Backend server running on port 5000

### Installation

```bash
cd Frontend
npm install
```

### Configuration

```bash
cp .env.example .env
```

Update `VITE_API_URL` if your backend runs on a different port.

### Run

```bash
npm run dev
```

Frontend starts at `http://localhost:5173`.

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api/v1` |

---

## Deployment

### Vercel

1. Create a new project on Vercel
2. Import the repository
3. Set **Root Directory** to `Frontend`
4. Add environment variable `VITE_API_URL` pointing to your deployed backend
5. Deploy

---

## Features

- **Authentication Flow:** Signup, Login, Logout, Refresh Token
- **Protected Routes:** Dashboard is protected by auth middleware
- **Session Persistence:** Tokens stored in localStorage, auto-refresh on reload
- **Form Validation:** Zod + React Hook Form
- **Toast Notifications:** React Hot Toast for user feedback
- **Responsive Design:** Mobile-first, works on all screen sizes
- **Accessibility:** Skip-to-content, ARIA labels, keyboard navigation

---

## License

MIT
