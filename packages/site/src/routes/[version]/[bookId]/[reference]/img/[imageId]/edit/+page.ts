
import type { PageLoad } from './$types';
export const load = (async ({ params }) => {
  return { imageId: params.imageId };
}) satisfies PageLoad;
