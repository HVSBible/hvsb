import { getDocument } from 'sveltefirets';
import type { IImage } from '@hvsb/types';
import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
  const image = await getDocument<IImage>(`media/${params.imageId}`);
  return { image };
};
