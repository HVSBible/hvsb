<script lang="ts">
  import { fetchVideoData } from '@hvsb/parts';
  import { page } from '$app/stores';
  import { setOnline } from 'sveltefirets';
  export let verseNumber: number;

  let videoId: string;
  let w: number;
  $: h = (w * 360) / 640;

  let saving;

  async function saveVideo() {
    if (saving) {
      return;
    }
    saving = true;

    try {
      const video = {
        id: videoId,
        bookIds: [$page.params.bookId],
        chapterIds: [`${$page.params.bookId}.${$page.params.reference}`],
        verseIds: [`${$page.params.bookId}.${$page.params.reference}.${verseNumber}`],
        type: 'video',
        published: true,
      };
      await setOnline(`media/${videoId}`, video);
      window.location.replace(
        `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/vid/${videoId}` // TODO: refresh media for chapter so that we can route directly without a page reload
      );
      // goto(`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}`);
    } catch (err) {
      alert(`Error saving video: ${err}`);
    }
    saving = false;
  }
</script>

<div class="flex-grow">
  <!-- <label for="video" class="block text-sm leading-5 font-medium text-gray-700">
    Add a Video ID
  </label> -->
  <div class="relative rounded-md shadow-sm overflow-hidden">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center
      pointer-events-none">
      <span class="text-gray-500 sm:text-sm sm:leading-5">Video ID</span>
    </div>
    <input
      type="text"
      id="video"
      bind:value={videoId}
      class="form-input block w-full pl-18 pr-12 sm:text-sm sm:leading-5"
      placeholder="Paste from VIMEO" />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <button
        class="{(!videoId || saving) && 'opacity-50 cursor-not-allowed'} h-full
        py-0 px-3 border-transparent bg-black text-white text-sm leading-5
        font-semibold"
        disabled={!videoId || saving}
        on:click={saveVideo}>
        {saving ? 'SAVING' : 'SAVE'}
      </button>
    </div>
  </div>
</div>

{#if videoId}
  <div class="mt-2">Preview:</div>
  <div bind:clientWidth={w} class="bg-black shadow rounded-lg overflow-hidden mt-1">
    <iframe
      title="Preview video to add"
      src="https://player.vimeo.com/video/{videoId}"
      width={w}
      height={h}
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen />
  </div>

  {#await fetchVideoData(videoId) then data}
    <div class="mt-2">Thumbnail:</div>
    <img src={data.pictures.sizes[1].link.replace('?r=pad', '')} alt="thumbnail" />
  {:catch error}
    <div class="p-2">Error loading video preview: {error}</div>
    <div class="text-sm text-gray-500 mt-2">
      <span>Example: https://vimeo.com/</span>
      <b>403334139</b>
    </div>
  {/await}
{/if}
