
import { getDocument } from 'sveltefirets';
import { type IDocument } from '@hvsb/types';

import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
  const document = await getDocument<IDocument>(`media/${params.documentId}`);
  return { document };
};
