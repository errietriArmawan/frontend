import apiClient from './axiosConfig';

// Ambil semua proyek
export const getAllProjects = async () => {
  const res = await apiClient.get('/projects');
  return res.data;
};

// Ambil proyek berdasarkan slug
export const getProjectBySlug = async (slug) => {
  const res = await apiClient.get(`/projects/slug/${slug}`);
  return res.data;
};

// Tambah proyek
export const createProject = async (formData) => {
  const res = await apiClient.post('/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Edit proyek
export const updateProject = async (id, formData) => {
  const res = await apiClient.put(`/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Hapus proyek
export const deleteProject = async (id) => {
  const res = await apiClient.delete(`/projects/${id}`);
  return res.data;
};
