import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainApp } from './components/MainApp';
import { InventoryPage } from './components/InventoryPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}