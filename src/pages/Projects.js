import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiClient.get('/projects');
        setProjects(res.data.data);
      } catch (err) {
        console.error('Gagal mengambil proyek:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center mt-5">Memuat proyek...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Proyek Saya</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {projects.map((project) => (
          <div className="col" key={project._id}>
            <div
              className="card h-100 shadow-sm"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/projects/${project.slug}`)}
            >
              <img
                src={`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}${project.coverImage}`}
                className="card-img-top"
                alt={project.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">
                  {project.description.length > 100
                    ? project.description.substring(0, 100) + '...'
                    : project.description}
                </p>
              </div>
              <div className="card-footer text-muted">
                {project.technologies?.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
