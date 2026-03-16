# Cognify

**AI-powered personalized learning for students, educators, and institutions.**

Cognify is a full-stack Learning Management System (LMS) that combines proven learning science with AI precision. It adapts to each learner's pace, goals, and style — delivering a personalized curriculum that evolves as they grow.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Authentication Flow](#authentication-flow)
- [User Roles](#user-roles)
- [Design System](#design-system)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Cognify serves three distinct user roles — students, instructors, and administrators — each with a dedicated dashboard, navigation, and feature set. The platform is built with a focus on:

- **Personalization** — AI-generated learning paths tailored to each student's goals, level, and pace
- **Engagement** — Streak tracking, progress visualization, and AI tutor access
- **Institution-readiness** — Classroom management, analytics, and bulk enrollment for educators and admins

---

## Tech Stack

### Frontend

- [Next.js 14](https://nextjs.org/) — App Router, Server Components, Middleware
- [TypeScript](https://www.typescriptlang.org/) — Type safety across the entire codebase
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling with custom design tokens
- [Zustand](https://zustand-demo.pmnd.rs/) — Lightweight client-side state management
- [Lucide React](https://lucide.dev/) — Icon library

### Backend

- [Node.js](https://nodejs.org/) — Runtime
- [Express.js](https://expressjs.com/) — REST API framework
- [JWT](https://jwt.io/) — Authentication via httpOnly cookies

---

## Features

### Student

- Personalized AI learning path
- Course enrollment and progress tracking
- AI Tutor — ask questions and get instant explanations
- Onboarding flow that captures goals, focus area, level, and pace

### Instructor

- Classroom creation and management
- Student progress monitoring
- Course creation and content delivery

### Admin

- User management
- Platform-wide analytics and reports
- Course oversight and billing management

---

## Project Structure

```
cognify/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (onboarding)/
│   │   └── onboarding/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── student/
│   │   │   ├── page.tsx
│   │   │   ├── courses/
│   │   │   ├── ai-tutor/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── instructor/
│   │   │   ├── page.tsx
│   │   │   ├── classrooms/
│   │   │   ├── students/
│   │   │   ├── courses/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── users/
│   │       ├── courses/
│   │       ├── analytics/
│   │       ├── reports/
│   │       ├── billing/
│   │       └── settings/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Logo.tsx
│   ├── Button.tsx
│   ├── Navbar.tsx
│   ├── DashboardShell.tsx
│   ├── DashboardTopbar.tsx
│   ├── SideAnimation.tsx
│   └── sidebars/
│       ├── SidebarLink.tsx
│       ├── StudentSidebar.tsx
│       ├── InstructorSidebar.tsx
│       └── AdminSidebar.tsx
│
├── hooks/
│   └── useForm.ts
│
├── store/
│   └── useUserStore.ts
│
├── types/
│   ├── user.ts
│   └── course.ts
│
├── middleware.ts
├── globals.css
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A running instance of the Cognify Express backend

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cognify.git
cd cognify

# Install dependencies
npm install

# Copy the environment variables file
cp .env.example .env.local

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:5000

# JWT (must match the secret used in your Express backend)
JWT_SECRET=your_jwt_secret_here
```

---

## Available Scripts

| Script          | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run ESLint                   |

---

## Authentication Flow

Cognify uses JWT-based authentication with httpOnly cookies for security.

```
Register → Onboarding → Dashboard (+ verify email banner)
Login → Dashboard (role-based redirect via middleware)
Forgot Password → Reset Password → Login
```

Role-based routing is handled in `middleware.ts`. On every request to `/dashboard/*`, the middleware reads the JWT cookie, decodes the user's role, and redirects accordingly:

- `/dashboard` → `/dashboard/student` for students
- `/dashboard` → `/dashboard/instructor` for instructors
- `/dashboard` → `/dashboard/admin` for admins

Unauthenticated requests to any `/dashboard/*` route are redirected to `/login`.

---

## User Roles

| Role         | Access                                                    |
| ------------ | --------------------------------------------------------- |
| `student`    | Personal dashboard, courses, AI tutor, profile, settings  |
| `instructor` | Classroom management, student tracking, course creation   |
| `admin`      | Full platform access, user management, analytics, billing |

Role is assigned at registration and stored in the JWT payload. The `SessionUser` type (password excluded) is used throughout the frontend. `PublicUser` (name, email, role only) is used when displaying user data to others.

---

## Design System

Cognify uses the **Terracotta Intelligence** design system — a warm, distinctive palette built for academic authority and visual differentiation.

### Core Tokens

| Token          | Value     | Usage                                 |
| -------------- | --------- | ------------------------------------- |
| `--background` | `#F2E8DC` | Page background                       |
| `--card`       | `#F8F2EA` | Card surfaces                         |
| `--foreground` | `#1A0F0A` | Primary text                          |
| `--primary`    | `#C0522A` | Buttons, links, active states         |
| `--accent`     | `#F5A623` | Achievements, highlights, AI elements |
| `--secondary`  | `#2D4A3E` | Focus states, calm UI elements        |
| `--border`     | `#D4B99A` | Card and input borders                |

All tokens are defined in `globals.css` and consumed via Tailwind's `@theme` directive.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

Please follow the existing code style — TypeScript strict mode, Tailwind utility classes, and the component patterns established in the codebase.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built for learners everywhere.</p>
