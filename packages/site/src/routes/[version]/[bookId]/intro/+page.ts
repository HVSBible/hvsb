import { getDocument } from 'sveltefirets';
import type { IIntro } from '@hvsb/types';

import type { PageLoad } from './$types';
export const load = (async ({ params }) => {
  const {version} = params;
  const {bookId} = params;
  const intro = await getDocument<IIntro>(`intros/${bookId}`);

  return {
    version,
    bookId,
    intro,
  };
}) satisfies PageLoad;
