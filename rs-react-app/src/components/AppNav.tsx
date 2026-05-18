import { NavLink } from 'react-router-dom';
import './AppNav.css';

export function AppNav() {
  return (
    <nav className="app-nav" aria-label="Main navigation">
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
    </nav>
  );
}
