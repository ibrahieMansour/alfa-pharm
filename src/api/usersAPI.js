import api from "./api";

export const getUsersList = (page = 1, limit = 10) =>
  api.get(`/users/list?page=${page}&limit=${limit}`);

export const searchUsers = (search, searchPhone) =>
  api.get(`/users/search?search=${search}&searchPhone=${searchPhone}`);

export const getUserById = (id) => api.get(`/users/${id}`);

export const createUser = (data) => api.post(`/users/create`, data);

export const updateUser = (id, data) => api.put(`/users/${id}/edit`, data);

export const deleteUser = (id) => api.delete(`/users/${id}/delete`);
