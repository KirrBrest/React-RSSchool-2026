import type { ThemeMode } from '../types/theme';

export const QUERY_PARAMS = {
  page: 'page',
  details: 'details',
  search: 'search',
};

export const SWAPI_API_BASE = 'https://swapi.py4e.com/api';
export const SWAPI_DEV_PROXY_BASE = '/swapi';
export const SWAPI_LOCAL_DEV_HOSTNAMES = ['localhost', '127.0.0.1'];
export const SWAPI_PAGE_SIZE = 10;

export const SEARCH_TERM_STORAGE_KEY = 'swapi-explorer-search-term';
export const THEME_STORAGE_KEY = 'swapi-explorer-theme';

export const THEME_MODE_LIGHT: ThemeMode = 'light';
export const THEME_MODE_DARK: ThemeMode = 'dark';

export const THEME_MODES: { light: ThemeMode; dark: ThemeMode } = {
  light: THEME_MODE_LIGHT,
  dark: THEME_MODE_DARK,
};

export const RS_SCHOOL_REACT_COURSE_URL =
  'https://rs.school/courses/reactjs';
export const AUTHOR_NAME = 'Kiryl Lukashchuk';
export const AUTHOR_GITHUB = 'https://github.com/KirrBrest';
export const AUTHOR_EMAIL = 'Lukashchuk.Kiryl@gmail.com';
export const AUTHOR_AVATAR_URL = 'https://avatars.githubusercontent.com/KirrBrest';
export const RS_SCHOOL_LOGO_PATH = '/images/rs-school-logo.svg';

export const SELECTED_ITEMS_CSV = {
  header: 'Name,Description,Details URL,SWAPI URL,Person ID',
  filenameSuffix: '_items.csv',
  mimeType: 'text/csv;charset=utf-8;',
};
