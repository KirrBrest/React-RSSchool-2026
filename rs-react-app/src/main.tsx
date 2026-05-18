import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppErrorBoundary>
        <AppRoutes />
      </AppErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
