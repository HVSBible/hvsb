import type { IVideo } from '@hvsb/types';
import { getDocument } from 'sveltefirets';
import { fetchVideoData } from '$lib/parts';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  const [videoDoc, vimeoData] = await Promise.all([
    getDocument<IVideo>(`media/${params.videoId}`),
    fetchVideoData(params.videoId),
  ]);

  const video = Object.assign(videoDoc, vimeoData);
  video.description = video.description
    ? video.description.replace(/Subscribe[\S\s]*/, '').trim()
    : '';

  return { video };
}) satisfies PageLoad;
