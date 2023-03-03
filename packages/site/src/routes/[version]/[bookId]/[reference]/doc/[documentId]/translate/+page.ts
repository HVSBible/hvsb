import type { PageLoad } from './$types';
export const load = (async ({ params }) => {
  return { documentId: params.documentId };
}) satisfies PageLoad;
