interface ImportMetaEnv {
  readonly VITE_QUERY_CACHE_TTL_SECONDS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
