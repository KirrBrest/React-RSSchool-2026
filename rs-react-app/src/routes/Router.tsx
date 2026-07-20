import { Route, Routes } from 'react-router-dom';
import { AppNav } from '../components/AppNav';
import { SelectedItemsFlyout } from '../components/SelectedItemsFlyout';
import { AboutPage } from '../pages/AboutPage';
import { MainPage } from '../pages/MainPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PersonDetailsPanel } from '../pages/PersonDetailsPanel';
import './Router.css';

export function Router() {
  return (
    <div className="router">
      <AppNav />
      <div className="router__content">
        <Routes>
          <Route path="/" element={<MainPage />}>
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
