declare module 'virtual:pwa-register' {
  interface RegisterSWOptions {
    immediate?: boolean;
    onRegistered?(registration: ServiceWorkerRegistration | undefined): void;
    onRegisterError?(error: any): void;
    onNeedRefresh?(): void;
    onOfflineReady?(): void;
  }

  export function registerSW(options?: RegisterSWOptions): () => void;
}
