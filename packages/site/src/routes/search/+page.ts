import { browser } from '$app/environment';
import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async () => {
  if (browser && window.location.href.indexOf('search') < 0) {
    return { previousUrl: window.location.href };
  } else {
    return { previousUrl: '' };
  }
};
