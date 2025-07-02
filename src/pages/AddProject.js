import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

function AddProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    coverImage: null,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setForm({ ...form, coverImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);

      const techArray = form.technologies
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      if (techArray.length === 0) {
        setError('Minimal 1 teknologi harus diisi.');
        return;
      }

      formData.append('technologies', JSON.stringify(techArray));

      if (form.coverImage) {
        formData.append('coverImage', form.coverImage);
      }

      const token = localStorage.getItem('token');
      await apiClient.post('/projects', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Proyek berhasil ditambahkan!');
      navigate('/admin');
    } catch (err) {
      const msg =
        err.response?.data?.error || 'Gagal menambahkan proyek. Pastikan semua data valid.';
      setError(msg);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '720px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Tambah Proyek Baru</h3>
        <button className="btn btn-sm btn-secondary" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
      </div>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label fw-semibold">Judul Proyek</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Contoh: Website Portofolio"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Deskripsi</label>
          <textarea
            className="form-control"
            name="description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Tulis deskripsi proyek minimal 10 karakter"
            minLength={10}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Teknologi yang Digunakan</label>
          <input
            type="text"
            className="form-control"
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="Contoh: React, Node.js, MongoDB"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Cover Image (opsional)</label>
          <input
            type="file"
            className="form-control"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-3 mt-4">
          <button type="submit" className="btn btn-primary px-4">
            Simpan Proyek
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
