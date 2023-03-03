<script lang="ts">
  import Medium from '$lib/components/content/Medium.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<Medium
  data={data.video}
  title={data.video.name}
  description={data.video.description}
  shareImage={data.video.pictures.sizes[4].link_with_play_button.replace('?r=pad', '')}>
  <div style="padding-top: 56.25%" class="bg-black shadow overflow-hidden md:rounded-lg relative">
    <iframe
      class="absolute top-0 w-full left-0 h-full"
      title="Video"
      src="https://player.vimeo.com/video/{data.video.id}"
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
    {data.video.description}
  </div>

  <div slot="author">
    <a
      class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
      border border-primary-700 my-2 mx-2 md:mx-0 btn inline-block"
      target="_blank"
      rel="noreferrer"
      href="https://vimeo.com/manage/{data.video.id}/general">
      Edit in Vimeo
      <i class="fas fa-key" />
    </a>

    <div class="text-gray-600 text-xs hidden md:block mb-2">
      At the moment, to move this video to a new verse, just paste it's ID,
      <b>{data.video.id}</b>
      , into the new location and it will be removed from this verse.
    </div>
  </div>
</Medium>
