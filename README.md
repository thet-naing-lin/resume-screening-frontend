# Resume Screening Tool — Frontend

React-based frontend for the Automated Resume Screening Tool. Built as part of a BSc Computing Final Year Project at the University of Roehampton.

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **Axios** for API communication
- **Zustand** for auth state management
- **React Router v6** for navigation
- **Spatie Laravel Permission** roles reflected in UI (admin / hr_recruiter)

## Features

- JWT authentication with protected routes
- Job description management (create, edit, delete)
- Bulk resume upload (PDF / DOCX, max 5MB)
- Candidate ranking table with filtering and pagination
- AI insights modal (candidate summary + interview questions)
- CSV export of ranked candidates
- Audit logs viewer (admin only)
- User management (admin only)
- Reports & Export page
- Responsive dashboard with live stats

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see backend README)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/resume-screening-frontend.git
cd resume-screening-frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build
```

App runs at `http://localhost:5173` by default.

## Available Pages

| Route                 | Description           | Access |
| --------------------- | --------------------- | ------ |
| `/login`              | Login page            | Public |
| `/dashboard`          | Stats overview        | All    |
| `/jobs`               | Job descriptions list | All    |
| `/resumes`            | Resume upload & list  | All    |
| `/candidate-rankings` | Ranked candidates     | All    |
| `/reports`            | CSV export            | All    |
| `/admin/users`        | User management       | Admin  |
| `/admin/audit-logs`   | Audit logs            | Admin  |

## Role-Based Access

| Feature              | HR Recruiter | Admin |
| -------------------- | ------------ | ----- |
| Upload resumes       | ✅           | ✅    |
| View rankings        | ✅           | ✅    |
| Generate AI insights | ✅           | ✅    |
| Export CSV           | ✅           | ✅    |
| Manage users         | ❌           | ✅    |
| View audit logs      | ❌           | ✅    |
