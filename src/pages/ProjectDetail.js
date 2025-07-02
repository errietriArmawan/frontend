import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../api/axiosConfig'; // ✅ gunakan axios global

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await apiClient.get(`/projects/slug/${slug}`);
        setProject(res.data.data);
      } catch (err) {
        console.error('Gagal ambil data proyek:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <p className="text-center mt-5">Memuat data proyek...</p>;
  if (!project) return <p className="text-center mt-5">Proyek tidak ditemukan.</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <h2 className="mb-3">{project.title}</h2>
      <p><strong>Tanggal Dibuat:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>

      {project.coverImage && (
      <img
          src={
                project.coverImage.startsWith('http')
                  ? project.coverImage
                  : `https://myserver-production-5f38.up.railway.app${project.coverImage}`
              }
              alt={project.title}
              className="img-fluid rounded shadow-sm mb-4"
              style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
            />
          )}

      <p className="lead">{project.description}</p>

      {project.screenshots && project.screenshots.length > 0 && (
        <>
          <h5 className="mt-4">Tangkapan Layar:</h5>
          <div className="row">
            {project.screenshots.map((shot, i) => (
              <div className="col-md-4 mb-3" key={i}>
                <img
                  src={`http://localhost:5000${shot}`}
                  alt={`Screenshot ${i + 1}`}
                  className="img-fluid rounded border"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectDetail;
