import React from 'react';

function Experience() {
  const learningExperiences = [
    {
      title: 'Program Kampus Merdeka MSIB - Bangkit Academy',
      description: 'Studi Independen bidang teknologi dan pengembangan aplikasi mobile.',
      year: '2023',
    },
    {
      title: 'Microsoft Learn - Kurikulum Dasar React',
      description: 'Menyelesaikan kursus dasar React resmi dari Microsoft.',
      year: '2024',
    },
    {
      title: 'OpenLearn - Computational Thinking',
      description: 'Mengikuti course gratis tentang Computational Thinking dari OpenLearn.',
      year: '2024',
    }
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sertifikasi & Pengalaman Belajar</h2>
      {learningExperiences.map((course, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">{course.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{course.year}</h6>
            <p className="card-text">{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Experience;
