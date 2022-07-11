<script context="module" lang="ts">
  import { getDocument } from 'sveltefirets';
  import { fetchVideoData } from '@hvsb/parts';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    const [videoDoc, vimeoData] = await Promise.all([
      getDocument<IVideo>(`media/${params.videoId}`),
      fetchVideoData(params.videoId),
    ]);

    const video = Object.assign(videoDoc, vimeoData);
    video.description = video.description
      ? video.description.replace(/Subscribe[\S\s]*/, '').trim()
      : '';

    return { props: { video } };
  };
</script>

<script lang="ts">
  import type { IVideo, IVimeoVideo } from '@hvsb/types';
  export let video: IVideo & IVimeoVideo;
  import Medium from '$lib/components/content/Medium.svelte';
</script>

<Medium
  data={video}
  title={video.name}
  description={video.description}
  shareImage={video.pictures.sizes[4].link_with_play_button.replace('?r=pad', '')}>
  <div style="padding-top: 56.25%" class="bg-black shadow overflow-hidden md:rounded-lg relative">
    <iframe
      class="absolute top-0 w-full left-0 h-full"
      title="Video"
      src="https://player.vimeo.com/video/{video.id}"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen />
    <!-- <img
        alt="Play Video"
        style="height: 100%; width: 100%; object-fit: cover;"
        src={video.data.pictures.sizes[3].link_with_play_button.replace('?r=pad', '')} /> -->
    <!-- Or sizes[4].link -->
  </div>

  <div class="py-2 px-2 md:px-0">
    <!-- {video.verseIds}  -->
    {video.description}
  </div>

  <div slot="author">
    <a
      class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
      border border-primary-700 my-2 mx-2 md:mx-0 btn inline-block"
      target="_blank"
      href="https://vimeo.com/manage/{video.id}/general">
      Edit in Vimeo
      <i class="fas fa-key" />
    </a>

    <div class="text-gray-600 text-xs hidden md:block mb-2">
      At the moment, to move this video to a new verse, just paste it's ID,
      <b>{video.id}</b>
      , into the new location and it will be removed from this verse.
    </div>
  </div>
</Medium>
