import { getDocument } from 'sveltefirets';
import type { IDocument } from '@hvsb/types';

import type { PageLoad } from './$types';
export const load = (async ({ params }) => {
  const document = await getDocument<IDocument>(`media/${params.documentId}`);
  return { document };
}) satisfies PageLoad;
