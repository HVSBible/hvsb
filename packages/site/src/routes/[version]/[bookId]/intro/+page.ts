import { getDocument } from 'sveltefirets';
import type { IIntro } from '@hvsb/types';

import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
  const version = params.version;
  const bookId = params.bookId;
  const intro = await getDocument<IIntro>(`intros/${bookId}`);

  return {
    version,
    bookId,
    intro,
  };
};
