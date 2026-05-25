import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import './AppNav.css';

export function AppNav() {
  return (
    <nav className="app-nav" aria-label="Main navigation">
      <div className="app-nav__links">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link'
          }
          to="/"
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link'
          }
          to="/about"
        >
          About
        </NavLink>
      </div>
      <ThemeToggle />
    </nav>
  );
}
