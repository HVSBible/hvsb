
import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
  return { imageId: params.imageId };
};
