import React from 'react';
import '../styles/about.css'; // optional kalau pakai styling khusus

function AboutMe() {
  return (
    <div className="container my-5 about-page">
      <h2 className="text-center mb-4">Tentang Saya</h2>
      <div className="row align-items-center">
        <div className="col-md-4 text-center mb-4">
          <img
            src="/images/profile.jpg"
            alt="Foto Profil"
            className="img-fluid rounded-circle shadow"
            style={{ maxWidth: '250px' }}
          />
        </div>
        <div className="col-md-8">
          <p>
            Halo! Saya <strong>Errie Tri Armawan</strong>, seorang mahasiswa dengan ketertarikan besar dalam pengembangan web dan teknologi digital. Saya memiliki pengalaman dalam membangun aplikasi web menggunakan React.js, Node.js, dan MongoDB.
          </p>
          <p>
            Selain itu, saya juga memiliki pengalaman kerja di bidang produksi dan pelayanan, yang mengajarkan saya tentang kerja tim, tanggung jawab, dan efisiensi kerja.
          </p>
          <p>
            Saya sangat antusias untuk terus belajar dan berkembang, serta ingin memberikan kontribusi terbaik melalui proyek-proyek digital yang bermanfaat.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
