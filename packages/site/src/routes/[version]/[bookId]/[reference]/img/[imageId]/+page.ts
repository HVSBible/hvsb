import { getDocument } from 'sveltefirets';
import type { IImage } from '@hvsb/types';
import type { PageLoad } from './$types';
export const load = (async ({ params }) => {
  const image = await getDocument<IImage>(`media/${params.imageId}`);
  return { image };
}) satisfies PageLoad;;
