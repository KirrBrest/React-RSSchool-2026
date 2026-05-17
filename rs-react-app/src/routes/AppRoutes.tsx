import { Route, Routes } from 'react-router-dom';
import App from '../App';
import { AboutPage } from '../pages/AboutPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
