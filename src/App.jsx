import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import UserManagement from "./pages/admin/UserManagement";
import JobList from "./pages/jobs/JobList";
import CreateJob from "./pages/jobs/CreateJob";
import EditJob from "./pages/jobs/EditJob";
import ViewJob from "./pages/jobs/ViewJob";
import UploadResume from "./pages/candidates/UploadResume";

const PlaceholderPage = ({ title }) => {
  const DashboardLayout =
    require("./components/layout/DashboardLayout").default;
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-700">{title}</h2>
          <p className="text-sm text-slate-400 mt-1">
            Coming in the next sprint
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* Jobs — US-003, US-004, US-005 */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/create"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <ViewJob />
            </ProtectedRoute>
          }
        />

        {/* Resumes */}
        <Route
          path="/resumes/upload"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />

        {/* Placeholders */}
        <Route
          path="/candidates"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Candidates" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Reports & Export" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/audit-logs"
          element={
            <ProtectedRoute>
              <PlaceholderPage title="Audit Logs" />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
