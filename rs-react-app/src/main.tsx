import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { AppRoutes } from './routes/AppRoutes';
import { ReduxProvider } from './store/ReduxProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <AppErrorBoundary>
          <AppRoutes />
        </AppErrorBoundary>
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
