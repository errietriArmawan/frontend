import React from 'react';
import '../styles/homePages.css';

function HomePage() {
  return (
    <div className="home-hero">
      <div className="overlay d-flex flex-column justify-content-center align-items-center text-white text-center">
        <img
          src="/images/my_avatar.png" // ganti path sesuai foto kamu
          alt="Foto Profil"
          className="rounded-circle mb-3 shadow"
          style={{ width: '250px', height: '250px', objectFit: 'cover', border: '4px solid white' }}
        />
        <h1 className="fw-bold">Halo, Saya Errie Tri Armawan</h1>
        <button
          className="btn btn-light mt-3 px-4 py-2"
          onClick={() => window.location.href = '/about'}
        >
          About More
        </button>
      </div>
    </div>
  );
}

export default HomePage;
