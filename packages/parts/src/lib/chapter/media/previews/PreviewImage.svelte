<script lang="ts">
  import type { Hit } from 'instantsearch.js';
  import { ImageGenres, type IImage } from '@hvsb/types';
  import { bookAbbrev } from '../../../index';
  export let href: string = undefined,
    image: Partial<Hit & IImage>,
    adminPanel = false,
    admin: number | boolean = false;
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
</script>

<a
  href={href ||
    `WEB/${image.chapterIds[0].split('.')[0]}/${image.chapterIds[0].split('.')[1]}/img/${image.id}`}
  sveltekit:prefetch
  sveltekit:noscroll
  class:ml-4={!image.published}
  class:sm:ml-6={!image.published}
  class="hover:bg-gray-200 shadow overflow-hidden rounded-sm flex
  items-stretch text-left min-h-75px">
  <div class="media-block bg-gray-500">
    <img
      alt=""
      style="height: 100%; width: 100%; object-fit: cover;"
      src="https://lh3.googleusercontent.com/{image.gcs}=s150-p" />
  </div>

  <div class="p-2 flex flex-grow flex-col justify-between">
    <div class="text-sm font-semibold text-gray-900">
      <slot name="title">
        {image.title || (image.description && image.description.replace(/<[^>]*>/g, '')) || ''}
      </slot>
      <slot name="admin" />
    </div>
    <div class="flex items-center">
      <div class="text-xs text-gray-600">
        {ImageGenres[image.genre] || ''}
        {#if !image.published}
          <span
            class="px-2 py-1 leading-tight bg-orange-200 rounded text-orange-600 text-xs font-medium"
            >Unpublished</span>
        {/if}
      </div>
      <div class="mr-auto" />
      {#if admin && !image.objectID}
        <ShowHide let:show let:toggle>
          <button
            type="button"
            on:click|preventDefault={toggle}
            class="px-2 py-1 mr-1 rounded hover:bg-white text-gray-700 hover:text-gray-900">
            <i class="fas fa-sitemap" />
          </button>
          {#if show}
            {#await import('../../../modals/PlaceIntoDocument.svelte') then { default: PlaceIntoDocument }}
              <PlaceIntoDocument on:assignParent imageId={image.id} on:close={toggle} />
            {/await}
          {/if}
        </ShowHide>
      {/if}
      {#if !adminPanel && image.currentVerses}
        <span class="px-2 py-1 leading-tight text-sm font-medium bg-gray-200 rounded">
          {image.currentVerses.length > 1 ? 'vv' : 'v'}
          {#each image.currentVerses as verse, i}
            {#if i === image.currentVerses.length - 1}
              {verse}
            {:else}{verse},&nbsp;{/if}
          {/each}
        </span>
      {:else}
        {#each image.verseIds as verseId}
          <a
            href={href || `WEB/${verseId.split('.')[0]}/${verseId.split('.')[1]}/img/${image.id}`}
            sveltekit:prefetch
            sveltekit:noscroll
            class="ml-1 mt-1 px-2 py-1 leading-tight text-sm font-medium bg-gray-100 hover:bg-white rounded">
            {bookAbbrev(verseId.split('.')[0])}
            {verseId.split('.')[1]}:{verseId.split('.')[2]}
          </a>
        {/each}
      {/if}
    </div>
  </div>
</a>

<style>
  .media-block {
    flex: 0 0 75px;
    width: 75px;
  }
</style>
