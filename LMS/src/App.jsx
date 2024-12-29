import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';

import Login from './pages/auth/Login.jsx';

const App = () => {
  return (
    <>
      <Routes>

        <Route path="/:name" element={<Login />} />
        <Route path="*" element={<Login />} />

      </Routes>
    </>
  );
};

export default App;

