import api from "./api";

export const getUsers = () => api.get("/admin/users");
export const assignRole = (userId, role) =>
  api.patch(`/admin/users/${userId}/role`, { role });
export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);
