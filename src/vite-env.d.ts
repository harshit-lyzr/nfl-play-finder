/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AGENT_API_URL: string;
  readonly VITE_AGENT_API_KEY: string;
  readonly VITE_AGENT_USER_ID: string;
  readonly VITE_AGENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
