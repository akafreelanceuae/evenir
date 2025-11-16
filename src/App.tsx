import React from 'react';
import { BrowserRouter, Route, Routes } from './lib/router';
import HomePage from './pages/HomePage';
import FindVendorPage from './pages/FindVendorPage';
import JoinVendorPage from './pages/JoinVendorPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<FindVendorPage />} path="/find-vendor" />
      <Route element={<JoinVendorPage />} path="/join-vendor" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  </BrowserRouter>
);

export default App;
