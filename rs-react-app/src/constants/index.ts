import type { ThemeMode } from '../types/theme';

export const QUERY_PARAMS = {
  page: 'page',
  details: 'details',
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

export const THEME_TOGGLE = {
  groupLabel: 'Theme',
  lightLabel: 'Light',
  darkLabel: 'Dark',
};

export const RS_SCHOOL_REACT_COURSE_URL =
  'https://rs.school/courses/reactjs';
export const AUTHOR_NAME = 'Kiryl Lukashchuk';
export const AUTHOR_BIO =
  'I run a construction company and am the father of a large family, where patience and multitasking skills are cultivated—ideal qualities for development. In this project, I tried to prove that I can work equally confidently with both building architecture and application architecture.';
export const AUTHOR_GITHUB = 'https://github.com/KirrBrest';
export const AUTHOR_EMAIL = 'Lukashchuk.Kiryl@gmail.com';

export const SELECTED_ITEMS_CSV = {
  header: 'Name,Description,Details URL,SWAPI URL,Person ID',
  filenameSuffix: '_items.csv',
  mimeType: 'text/csv;charset=utf-8;',
};

export const SELECTED_ITEMS_FLYOUT = {
  regionLabel: 'Selected items',
  unselectAllLabel: 'Unselect all',
  downloadLabel: 'Download',
  singleItemCountLabel: '1 item selected',
  pluralCountSuffix: 'items selected',
};
