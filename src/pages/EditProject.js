import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

function EditProject() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    coverImage: null
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await apiClient.get(`/projects/slug/${slug}`);
        const data = res.data.data;
        setProjectId(data._id);
        setForm({
          title: data.title,
          description: data.description,
          technologies: data.technologies.join(', '),
          coverImage: null
        });
      } catch (err) {
        console.error('Gagal ambil data proyek:', err);
        navigate('/admin');
      }
    };

    fetchProject();
  }, [slug, navigate]);

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

    const techArray = form.technologies
      .split(',')
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    if (techArray.length === 0) {
      setError('Minimal 1 teknologi harus diisi.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('technologies', JSON.stringify(techArray));
      if (form.coverImage) {
        formData.append('coverImage', form.coverImage);
      }

      const token = localStorage.getItem('token');
      await apiClient.put(`/projects/${projectId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Proyek berhasil diperbarui.');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error || 'Gagal memperbarui proyek. Cek kembali data.';
      setError(msg);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Edit Proyek</h3>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Kembali
        </button>
      </div>

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teknologi (pisahkan dengan koma)</label>
          <input
            type="text"
            name="technologies"
            className="form-control"
            value={form.technologies}
            onChange={handleChange}
            placeholder="Contoh: React, Node.js, MongoDB"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ganti Cover Image (opsional)</label>
          <input
            type="file"
            name="coverImage"
            className="form-control"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-3 mt-4">
          <button type="submit" className="btn btn-primary">
            Simpan Perubahan
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProject;
