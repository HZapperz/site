import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookPage from './pages/BookPage';
// import EnterprisePage from './pages/EnterprisePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book" element={<BookPage />} />
      {/* <Route path="/enterprise" element={<EnterprisePage />} /> */}
    </Routes>
  );
};

export default App;