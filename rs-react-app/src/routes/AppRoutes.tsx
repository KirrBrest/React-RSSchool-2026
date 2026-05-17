import { Route, Routes } from 'react-router-dom';
import App from '../App';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="details" element={<PersonDetailsPanel />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
