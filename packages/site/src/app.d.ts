/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  interface Locals {
    user: import('@hvsb/types').IUser;
  }
  // interface Platform {}
  interface Session {
    user: import('@hvsb/types').IUser;
  }
  // interface Stuff {}
}

interface ImportMetaEnv {
  VITE_bibleApi: string; // prod added to Vercel env variables
  VITE_stripePublishable: string; // prod added to Vercel env variables
  VITE_vimeoUnauthenticatedAccessToken: string;
  // VITE_vimeoAuthenticatedAccessToken: string;
  VITE_ProcessImageUrl: string; // added to Vercel env variables
  VITE_FIREBASE_CONFIG: string; // prod added to Vercel env variables
}

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickoutside?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
  }
}
