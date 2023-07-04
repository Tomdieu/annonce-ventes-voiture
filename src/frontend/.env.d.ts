interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string
  VITE_GEOAPIFY_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}