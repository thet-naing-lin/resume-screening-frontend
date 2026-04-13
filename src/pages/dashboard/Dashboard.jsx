import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useAuthStore from "../../store/authStore";

// Stat card component
function StatCard({ label, value, icon, color, sub }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6
                    hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
        </div>
        <div
          className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center shrink-0`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// Activity item component
function ActivityItem({ action, entity, time, role }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
      <div
        className="w-8 h-8 bg-blue-50 rounded-full flex items-center
                      justify-center shrink-0 mt-0.5"
      >
        <svg
          className="w-4 h-4 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-700">
          <span className="font-medium capitalize">{action}</span>
          {" — "}
          <span className="text-slate-500">{entity}</span>
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{time}</p>
      </div>
      <span
        className="text-xs bg-slate-100 text-slate-600 px-2 py-1
                       rounded-full capitalize shrink-0"
      >
        {role}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Placeholder stats — will be replaced with real API data in Sprint 2
  const stats = [
    {
      label: "Active Job Posts",
      value: "0",
      sub: "No jobs posted yet",
      color: "bg-blue-50",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: "Total Resumes",
      value: "0",
      sub: "No resumes uploaded yet",
      color: "bg-violet-50",
      icon: (
        <svg
          className="w-6 h-6 text-violet-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      label: "Candidates Screened",
      value: "0",
      sub: "No candidates yet",
      color: "bg-emerald-50",
      icon: (
        <svg
          className="w-6 h-6 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      label: "Avg Match Score",
      value: "—",
      sub: "Score after AI screening",
      color: "bg-amber-50",
      icon: (
        <svg
          className="w-6 h-6 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Welcome banner */}
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6
                        text-white shadow-lg shadow-blue-200"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold">
                {greeting}, {user?.name?.split(" ")[0]}! 👋
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Here's what's happening with your recruitment today.
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <p className="text-xs text-blue-100">Role</p>
              <p className="text-sm font-semibold capitalize">
                {user?.roles?.[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Bottom two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-semibold text-slate-800 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Post a New Job",
                  desc: "Create a job description for screening",
                  to: "/jobs",
                  color: "bg-blue-50 text-blue-700",
                  icon: "💼",
                },
                {
                  label: "Upload Resumes",
                  desc: "Bulk upload resumes for a job",
                  to: "/resumes",
                  color: "bg-violet-50 text-violet-700",
                  icon: "📄",
                },
                {
                  label: "View Candidates",
                  desc: "See ranked and scored candidates",
                  to: "/candidates",
                  color: "bg-emerald-50 text-emerald-700",
                  icon: "👥",
                },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.to}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50
                             border border-transparent hover:border-slate-100 transition group"
                >
                  <span
                    className={`text-xl w-10 h-10 ${action.color} rounded-xl
                                    flex items-center justify-center shrink-0`}
                  >
                    {action.icon}
                  </span>
                  <div>
                    <p
                      className="text-sm font-semibold text-slate-700
                                  group-hover:text-blue-600 transition"
                    >
                      {action.label}
                    </p>
                    <p className="text-xs text-slate-400">{action.desc}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-300 group-hover:text-blue-400
                                  ml-auto transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-semibold text-slate-800 mb-4">
              Recent Activity
            </h3>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div
                className="w-12 h-12 bg-slate-100 rounded-full flex items-center
                              justify-center mb-3"
              >
                <svg
                  className="w-6 h-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-slate-500">
                No activity yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Actions will appear here as you use the system
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
