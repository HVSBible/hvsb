/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickoutside?: (event: CustomEvent<any> & { target: EventTarget & T }) => any;
  }
}
