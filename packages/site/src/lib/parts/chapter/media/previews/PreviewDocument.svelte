<script lang="ts">
  import type { Hit } from 'instantsearch.js';
  import { DocumentGenres, type IDocument } from '@hvsb/types';
  export let href: string = undefined,
    document: Partial<Hit & IDocument>,
    adminPanel = false;
  import { bookAbbrev } from '../../../data/books';
  import DocGenreThumb from '../thumbs/DocGenreThumb.svelte';
</script>

<a
  href={href ||
    `WEB/${document.chapterIds[0].split('.')[0]}/${document.chapterIds[0].split('.')[1]}/doc/${
      document.id
    }`}
  
  data-sveltekit-noscroll
  class:ml-4={!document.published}
  class:sm:ml-6={!document.published}
  class="hover:bg-gray-200 shadow overflow-hidden rounded-sm flex
  items-stretch text-left min-h-75px">
  <div class="media-block">
    <DocGenreThumb fillBackground genre={document.genre} />
  </div>

  <div class="p-2 flex flex-grow flex-col justify-between">
    <div class="text-sm font-semibold text-gray-900">
      <slot name="title">
        {document.title || document.description || ''}
      </slot>
      <slot name="admin" />
    </div>
    <div class="flex flex-wrap items-center">
      <div class="text-xs text-gray-600 mr-auto">
        {DocumentGenres[document.genre] || ''}
        {#if !document.published}
          <span
            class="px-2 py-1 leading-tight bg-orange-200 rounded text-orange-600 text-xs font-medium"
            >Unpublished</span>
        {/if}
      </div>
      {#if !adminPanel && document.currentVerses}
        <span class="px-2 py-1 leading-tight text-sm font-medium bg-gray-200 rounded">
          {document.currentVerses.length > 1 ? 'vv' : 'v'}
          {#each document.currentVerses as verse, i}
            {#if i === document.currentVerses.length - 1}
              {verse}
            {:else}{verse},&nbsp;{/if}
          {/each}
        </span>
      {:else}
        {#each document.verseIds as verseId}
          <a
            href={href ||
              `WEB/${verseId.split('.')[0]}/${verseId.split('.')[1]}/doc/${document.id}`}
            
            data-sveltekit-noscroll
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
