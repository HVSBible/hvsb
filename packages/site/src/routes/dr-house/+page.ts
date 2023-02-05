import { getDocument } from 'sveltefirets';

import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async () => {
  const aboutId = 'dr-house';
  const bio = await getDocument(`about/${aboutId}`);
  return { bio };
};
