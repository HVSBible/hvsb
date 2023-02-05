import type { IVideo, IVimeoVideo } from '@hvsb/types';
// was this before svelte-migrate export let video: IVideo & IVimeoVideo;

import { getDocument } from 'sveltefirets';
import { fetchVideoData } from '$lib/parts';
import type { PageLoad } from '@sveltejs/kit';
export const load: PageLoad = async ({ params }) => {
  const [videoDoc, vimeoData] = await Promise.all([
    getDocument<IVideo>(`media/${params.videoId}`),
    fetchVideoData(params.videoId),
  ]);

  const video = Object.assign(videoDoc, vimeoData);
  video.description = video.description
    ? video.description.replace(/Subscribe[\S\s]*/, '').trim()
    : '';

  return { video };
};
