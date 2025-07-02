import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/adminPanel.css'; // pastikan path ini benar
import apiClient from '../api/axiosConfig';

function AdminPanel() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('portfolio');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);

  // Cek login
  useEffect(() => {
  const fetchData = async () => {
    try {
      const [projectRes, messageRes] = await Promise.all([
        apiClient.get('/projects'),
        apiClient.get('/messages')
      ]);

      setProjects(projectRes.data.data);
      setMessages(messageRes.data.data);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
      navigate('/login');
    }
  };

  fetchData();
}, [navigate]);
  // Logout
  function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-menu">
        <button
          className={activePage === 'portfolio' ? 'active' : ''}
          onClick={() => setActivePage('portfolio')}
        >
          Portofolio
        </button>
        <button
          className={activePage === 'messages' ? 'active' : ''}
          onClick={() => setActivePage('messages')}
        >
          Pesan Masuk
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="section-box">
        {activePage === 'portfolio' && (
          <>
            <div className="portfolio-header">
              <h4>Daftar Proyek</h4>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/admin/projects/create')}
              >
                + Tambah Proyek
              </button>
            </div>
            {projects.length === 0 ? (
              <p>Belum ada proyek.</p>
            ) : (
              projects.map((project) => (
                <div
                  className="project-card"
                  key={project._id}
                  onClick={() => navigate(`/admin/projects/${project.slug}`)}
                >
                  <h5>{project.title}</h5>
                  <p>{project.description}</p>
                </div>
              ))
            )}
          </>
        )}

        {activePage === 'messages' && (
          <>
            <h4>Pesan Masuk</h4>
            {messages.length === 0 ? (
              <p>Belum ada pesan masuk.</p>
            ) : (
              messages.map((msg) => (
                <div className="message-card" key={msg._id}>
                  <div className="message-header">
                    <span className="message-name">{msg.name}</span>
                    <span className="message-email">&lt;{msg.email}&gt;</span>
                    <span className="message-date">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="message-subject"><strong>{msg.subject}</strong></div>
                  <div className="message-body">{msg.message}</div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
