import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DeleteModal from "../../components/admin/DeleteModal";
import { getUsers, assignRole, deleteUser } from "../../api/userApi";

// ── Helpers ──
const ROLE_BADGE = {
  admin: "bg-purple-100 text-purple-700",
  hr_recruiter: "bg-blue-100   text-blue-700",
  no_role: "bg-gray-100   text-gray-500",
};

const ROLE_LABEL = {
  admin: "Admin",
  hr_recruiter: "HR Recruiter",
  no_role: "No Role",
};

function RoleBadge({ role }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_BADGE[role] ?? ROLE_BADGE.no_role}`}
    >
      {ROLE_LABEL[role] ?? role}
    </span>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

// ── Main ──
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data.users);
      setRoles(res.data.roles);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  function showFlash(msg) {
    setFlash(msg);
    setTimeout(() => setFlash(""), 3000);
  }

  async function handleRoleChange(user, newRole) {
    if (newRole === user.role) return;
    setRoleLoading(user.id);
    try {
      const res = await assignRole(user.id, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u)),
      );
      showFlash(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to update role.");
    } finally {
      setRoleLoading(null);
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    try {
      const res = await deleteUser(deleteTarget.id);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      showFlash(res.data.message);
      setDeleteTarget(null);
    } catch (err) {
      setError(err.response?.data?.message ?? "Failed to delete user.");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage accounts and assign roles.
            </p>
          </div>

          {/* Flash */}
          {flash && (
            <div className="mb-4 flex items-center justify-between p-4 bg-green-50 border border-green-200 text-green-800 text-sm rounded-xl">
              <span>✅ {flash}</span>
              <button onClick={() => setFlash("")} className="font-bold ml-4">
                ✕
              </button>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-center justify-between p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              <span>❌ {error}</span>
              <button onClick={() => setError("")} className="font-bold ml-4">
                ✕
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard
              label="Total Users"
              value={users.length}
              color="text-gray-800"
            />
            <StatCard
              label="Admins"
              value={users.filter((u) => u.role === "admin").length}
              color="text-purple-600"
            />
            <StatCard
              label="HR Recruiters"
              value={users.filter((u) => u.role === "HR").length}
              color="text-blue-600"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">All Users</h2>
              <span className="text-sm text-gray-400">
                {users.length} total
              </span>
            </div>

            {loading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 animate-pulse"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <p className="text-4xl mb-3">👥</p>
                <p className="font-medium">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Current Role</th>
                      <th className="px-6 py-3 text-left">Change Role</th>
                      <th className="px-6 py-3 text-left">Joined</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-900">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <RoleBadge role={user.role} />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={user.role}
                            disabled={roleLoading === user.id}
                            onChange={(e) =>
                              handleRoleChange(user, e.target.value)
                            }
                            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
                          >
                            {roles.map((role) => (
                              <option key={role} value={role}>
                                {ROLE_LABEL[role] ?? role}
                              </option>
                            ))}
                          </select>
                          {roleLoading === user.id && (
                            <span className="ml-2 text-xs text-gray-400">
                              Saving...
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-400">
                          {user.created_at}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setDeleteTarget(user)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          user={deleteTarget}
          loading={deleteLoading}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </DashboardLayout>
  );
}
