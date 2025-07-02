import { useState } from 'react';
import { postMessage } from '../api/messageApi'; // gunakan service yang kamu buat

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: '' });

    try {
      const res = await postMessage(form); // POST ke /api/messages
      setStatus({ success: true, message: res.message });
      setForm({ name: '', email: '', subject: '', phone: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.error || 'Gagal mengirim pesan.';
      setStatus({ success: false, message: msg });
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '720px' }}>
      <h2 className="text-center mb-4">Hubungi Saya</h2>

      {status.message && (
        <div className={`alert ${status.success ? 'alert-success' : 'alert-danger'}`} role="alert">
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama*</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email*</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
        <label className="form-label">Subjek*</label>
        <select
            name="subject"
            className="form-control"
            value={form.subject}
            onChange={handleChange}
            required
        >
            <option value="">-- Pilih Subjek --</option>
            <option value="Pertanyaan">Pertanyaan</option>
            <option value="Kerjasama">Kerjasama</option>
            <option value="Laporan Bug">Laporan Bug</option>
            <option value="Lainnya">Lainnya</option>
        </select>
        </div>

        <div className="mb-3">
          <label className="form-label">No. Telepon</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Pesan*</label>
          <textarea name="message" rows="5" value={form.message} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Kirim Pesan</button>
      </form>

      <hr className="my-5" />

      <div className="text-center">
        <p>Ikuti saya di media sosial:</p>
        <div className="d-flex justify-content-center gap-3 fs-4">
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
