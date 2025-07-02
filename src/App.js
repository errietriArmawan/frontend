import { BrowserRouter, Routes, Route, useLocation,} from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import AdminProjectDetail from './pages/AdminProjectDetail';
import ProjectDetail from './pages/ProjectDetail';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import HomePage from './pages/HomePage'; // jika kamu punya halaman home
import { testBackendConnection } from './api/testConnection';
import AboutMe from './pages/AboutMe';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

// Komponen pembungkus untuk logika routing dan kontrol navbar
function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await testBackendConnection();
        console.log("✅ Backend Connected:", data);
      } catch (error) {
        console.error("❌ Gagal terhubung ke backend:", error);
      }
    };

    testConnection();
  }, []);

  // Deteksi lokasi untuk sembunyikan navbar
  const hideNavbar = location.pathname === '/login' || location.pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* === Halaman Publik === */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} /> 
        <Route path="/experience" element={<Experience />} />
        <Route path='/contact' element={<Contact/>} />


        {/* === Login Page === */}
        <Route path="/login" element={<Login />} />

        {/* === Admin Pages === */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/projects/:slug" element={<AdminProjectDetail />} />
        <Route path="/admin/projects/create" element={<AddProject />} />
        <Route path="/admin/edit/:slug" element={<EditProject />} />
        {/* === Catch-all 404 === */}
        <Route path="*" element={<h1 style={{ padding: '2rem' }}>404 - Halaman Tidak Ditemukan</h1>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
