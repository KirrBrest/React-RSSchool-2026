import { Route, Routes } from 'react-router-dom';
import App from '../App';
import { SelectedItemsFlyout } from '../components/SelectedItemsFlyout';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';
import './AppShell.css';

export function AppRoutes() {
  return (
    <div className="app-shell">
      <div className="app-shell__content">
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="details" element={<PersonDetailsPanel />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <SelectedItemsFlyout />
    </div>
  );
}
