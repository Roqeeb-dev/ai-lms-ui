# Project Title

A brief description of what this project does and who it's for

# Cognify

**A full-stack Learning Management System for students and instructors.**

Cognify is a production-grade LMS that enables instructors to create and deliver structured courses while giving students a clean, focused learning experience — complete with progress tracking, AI-assisted tutoring, quizzes, and rich content delivery.

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
- [License](#license)

---

## Overview

Cognify serves two distinct user roles — students and instructors — each with a dedicated dashboard, navigation, and feature set. The platform is built around:

- **Structured content delivery** — Courses organized into modules and lessons, supporting video, PDF, rich text, and quiz formats
- **Progress tracking** — Per-lesson completion tracking with real-time progress visualization across dashboards and course pages
- **AI Tutoring** — An integrated AI tutor students can query at any time for instant, contextual explanations
- **Instructor tooling** — A full course builder, student management, analytics dashboard, and quiz creation engine
- **Modern architecture** — Service layer, typed hooks, Zustand global state, and strict separation between UI and data logic

---

## Tech Stack

### Frontend

| Technology                                                   | Purpose                                         |
| ------------------------------------------------------------ | ----------------------------------------------- |
| [Next.js 15](https://nextjs.org/)                            | App Router, Server Components, Middleware       |
| [TypeScript](https://www.typescriptlang.org/)                | Type safety across the entire codebase          |
| [Tailwind CSS](https://tailwindcss.com/)                     | Utility-first styling with custom design tokens |
| [Zustand](https://zustand-demo.pmnd.rs/)                     | Lightweight client-side state management        |
| [Lucide React](https://lucide.dev/)                          | Icon library                                    |
| [React Markdown](https://github.com/remarkjs/react-markdown) | Rendering rich text lesson content              |
| [Vercel Analytics](https://vercel.com/analytics)             | Page view and traffic analytics                 |

### Backend

| Technology                                                                | Purpose                             |
| ------------------------------------------------------------------------- | ----------------------------------- |
| [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)     | REST API                            |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Database and ODM                    |
| [Cloudinary](https://cloudinary.com/)                                     | Video and file storage              |
| [JWT](https://jwt.io/)                                                    | Authentication via httpOnly cookies |

> The backend is developed and maintained separately. This repository contains the frontend only.

---

## Features

### Student

- Dashboard with enrollment overview, progress stats, and quick actions
- Course browsing and single-click enrollment
- Per-lesson progress tracking with real-time progress bar
- Video, PDF, and rich text lesson viewing
- Quiz taking — multiple choice with pass/fail results and scoring
- AI Tutor — ask questions and get instant, contextual explanations
- Progress page with per-course analytics
- Public instructor profile pages
- Profile and settings management

### Instructor

- Dashboard with enrollment and course overview
- Full course builder — modules, lessons, ordering
- Four lesson types: video upload, PDF upload, markdown rich text, and quiz
- Quiz builder — multiple choice questions, passing score, shuffle mode
- AI-assisted quiz generation
- Student enrollment overview and progress monitoring
- Analytics dashboard — enrollments, completions, engagement
- Public instructor profile page
- Profile and settings management

---

## Project Structure

cognify/
├── app/
│ ├── (auth)/
│ │ ├── login/
│ │ ├── register/
│ │ ├── forgot-password/
│ │ ├── reset-password/
│ │ └── verify-email/
│ ├── (onboarding)/
│ │ └── onboarding/
│ ├── dashboard/
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── student/
│ │ │ ├── page.tsx
│ │ │ ├── courses/
│ │ │ │ └── [courseId]/
│ │ │ │ └── quiz/
│ │ │ │ └── [quizId]/
│ │ │ ├── browse/
│ │ │ ├── progress/
│ │ │ ├── ai-tutor/
│ │ │ ├── quizzes/
│ │ │ ├── profile/
│ │ │ └── settings/
│ │ └── instructor/
│ │ ├── page.tsx
│ │ ├── courses/
│ │ ├── course-builder/
│ │ │ └── [courseId]/
│ │ ├── lessons/
│ │ │ └── [lessonId]/
│ │ │ └── quiz/
│ │ │ └── create/
│ │ ├── students/
│ │ ├── analytics/
│ │ ├── quizzes/
│ │ ├── profile/
│ │ └── settings/
│ ├── favicon.ico
│ ├── apple-icon.png
│ ├── sitemap.ts
│ ├── robots.ts
│ ├── layout.tsx
│ └── page.tsx
│
├── components/
│ ├── landing/
│ │ ├── Navbar.tsx
│ │ ├── NavDropdown.tsx
│ │ ├── SocialProofBar.tsx
│ │ ├── LandingFeatures.tsx
│ │ ├── HowItWorks.tsx
│ │ ├── LessonTypes.tsx
│ │ ├── InstructorCTA.tsx
│ │ ├── LandingFinalCTA.tsx
│ │ └── LandingFooter.tsx
│ ├── Logo.tsx
│ ├── Button.tsx
│ ├── StatCard.tsx
│ ├── CourseCard.tsx
│ ├── CourseProgress.tsx
│ ├── CourseOutline.tsx
│ ├── CourseContentHeader.tsx
│ ├── LessonViewer.tsx
│ ├── LessonEditor.tsx
│ ├── QuizIntro.tsx
│ ├── QuizActiveSection.tsx
│ ├── QuizResult.tsx
│ ├── QuizPreviewModal.tsx
│ ├── DashboardHeader.tsx
│ ├── Dialog.tsx
│ ├── Skeleton.tsx
│ ├── LoadingScreen.tsx
│ └── sidebars/
│ ├── SidebarLink.tsx
│ ├── StudentSidebar.tsx
│ └── InstructorSidebar.tsx
│
├── hooks/
│ ├── useForm.ts
│ ├── useCourse.ts
│ ├── useEnrollment.ts
│ ├── useInstructorCourses.ts
│ ├── useLesson.ts
│ ├── useModule.ts
│ ├── useQuiz.ts
│ └── useAi.ts
│
├── services/
│ ├── courseService.ts
│ ├── enrollmentService.ts
│ ├── lessonService.ts
│ ├── moduleService.ts
│ ├── quizService.ts
│ └── aiService.ts
│
├── store/
│ ├── useUserStore.ts
│ ├── useToastStore.ts
│ └── useThemeStore.ts
│
├── types/
│ ├── user.ts
│ ├── course.ts
│ ├── lesson.ts
│ ├── module.ts
│ └── quiz.ts
│
├── lib/
│ ├── apiClient.ts
│ └── cloudinary.ts
│
├── middleware.ts
├── globals.css
└── README.md

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A running instance of the Cognify Express backend

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cognify-frontend.git
cd cognify-frontend

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

Create a `.env.local` file in the root of the project:

```env
# Backend API base URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Public site URL (used for sitemap and robots)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
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

Cognify uses JWT-based authentication stored in httpOnly cookies.
Register → Verify Email → Onboarding → Dashboard
Login → Dashboard (role-based redirect via middleware)
Forgot Password → Reset Password → Login

Role-based routing is enforced in `middleware.ts`. On every request to `/dashboard/*`, the middleware reads the JWT cookie, decodes the user's role, and redirects accordingly:

| Request path       | Role            | Redirect                |
| ------------------ | --------------- | ----------------------- |
| `/dashboard`       | `student`       | `/dashboard/student`    |
| `/dashboard`       | `instructor`    | `/dashboard/instructor` |
| Any `/dashboard/*` | unauthenticated | `/login`                |

---

## User Roles

| Role         | Access                                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `student`    | Dashboard, course browsing, enrollment, lesson viewing, progress tracking, quiz taking, AI tutor, profile, settings |
| `instructor` | Dashboard, course builder, lesson and quiz management, student tracking, analytics, profile, settings               |

Role is assigned at registration and stored in the JWT payload.

---

## Design System

Cognify uses the **Terracotta Intelligence** design system — a warm, distinctive palette built for academic authority and visual clarity. Full dark mode support is included via a Zustand-powered theme store.

### Core Tokens

| Token          | Light     | Dark      | Usage                          |
| -------------- | --------- | --------- | ------------------------------ |
| `--background` | `#F2E8DC` | `#0F0A07` | Page background                |
| `--card`       | `#F8F2EA` | `#1A120E` | Card surfaces                  |
| `--foreground` | `#1A0F0A` | `#F5EDE6` | Primary text                   |
| `--primary`    | `#C0522A` | `#E76F3C` | Buttons, links, active states  |
| `--accent`     | `#F5A623` | `#FFB347` | Highlights, AI elements        |
| `--secondary`  | `#2D4A3E` | `#3F6B5A` | Focus states, calm UI elements |
| `--border`     | `#D4B99A` | `#3A2A20` | Card and input borders         |

All tokens are defined in `globals.css` and consumed via Tailwind's `@theme` directive.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with care by <a href="https://github.com/Roqeeb-dev">Roqeeb</a> (Frontend) in collaboration with a backend developer.</p>
