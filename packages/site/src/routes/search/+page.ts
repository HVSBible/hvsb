import { browser } from '$app/environment';
import type { PageLoad } from './$types';
export const load = (async () => {
  if (browser && window.location.href.indexOf('search') < 0) {
    return { previousUrl: window.location.href };
  } else {
    return { previousUrl: '' };
  }
}) satisfies PageLoad;
