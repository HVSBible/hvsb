import { getDocument } from 'sveltefirets';

import type { PageLoad } from './$types';
export const load = (async () => {
  const aboutId = 'dr-house';
  const bio = await getDocument<{ text: string }>(`about/${aboutId}`);
  return { bio };
}) satisfies PageLoad;
