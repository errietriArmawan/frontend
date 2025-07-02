import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig';
import '../styles/adminPanel.css'; // opsional styling

function AdminProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await apiClient.get(`/projects/slug/${slug}`);
        setProject(res.data.data);
      } catch (err) {
        console.error('Gagal mengambil proyek:', err);
        navigate('/admin');
      }
    };

    fetchProject();
  }, [slug, navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Yakin ingin menghapus proyek ini?')) return;

    try {
      await apiClient.delete(`/projects/${project._id}`);
      alert('Proyek berhasil dihapus.');
      navigate('/admin');
    } catch (err) {
      console.error('Gagal menghapus proyek:', err);
      alert('Terjadi kesalahan saat menghapus.');
    }
  };

  if (!project) return <p className="text-center mt-5">Memuat data proyek...</p>;

  return (
    <div className="admin-container">

        {/* Tombol kembali */}
        <div className="mb-4">
            <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
            ← Kembali ke Dashboard
            </button>
        </div>

        {/* Gambar cover */}
        {project.coverImage && (
        <div className="mb-4 text-center">
            <img
            src={`${process.env.REACT_APP_BACKEND_URL}${project.coverImage}`}
            alt={project.title}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }}
            />
        </div>
        )}

        {/* Judul & Deskripsi */}
        <h3 className="mb-2">{project.title}</h3>
        <p>{project.description}</p>

        {/* Info lainnya */}
        <ul className="list-group mt-3 mb-4">
            <li className="list-group-item"><strong>Slug:</strong> {project.slug}</li>
            <li className="list-group-item"><strong>Dibuat:</strong> {new Date(project.createdAt).toLocaleString()}</li>
            <li className="list-group-item"><strong>Diperbarui:</strong> {new Date(project.updatedAt).toLocaleString()}</li>
        </ul>

        {/* Tombol Edit dan Hapus */}
        <div className="d-flex gap-3">
            <button
            className="btn btn-primary"
            onClick={() => navigate(`/admin/edit/${project.slug}`)}
            >
            ✏️ Edit Proyek
            </button>
            <button
            className="btn btn-danger"
            onClick={handleDelete}
            >
            🗑️ Hapus Proyek
            </button>
        </div>
    </div>
 );
}

export default AdminProjectDetail;
