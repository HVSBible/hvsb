import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
  return { documentId: params.documentId };
};
