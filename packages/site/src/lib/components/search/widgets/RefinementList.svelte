<script lang="ts">
  import { DocumentGenres, ImageGenres, type DocumentGenre, type ImageGenre } from '@hvsb/types';

  import type { InstantSearch } from 'instantsearch.js';
  // import { connectRefinementList } from 'instantsearch.js/es/connectors';
  import { connectRefinementList } from 'instantsearch.js/cjs/connectors/index.js';
  import type { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
  import { onMount } from 'svelte';
  const Genres = Object.keys({ ...DocumentGenres, ...ImageGenres }) as (DocumentGenre | ImageGenre)[];

  export let search: InstantSearch,
    attribute:
      | 'genre'
      | 'author'
      | 'bookIds'
      | 'chapterIds'
      | 'createdBy'
      | 'credit'
      | 'location'
      | 'subject'
      | '' = '',
    label = '';

  let value = '';
  let maxInitialItems = 5;

  let items: RefinementListItem[] = [];
  let refine: (arg0: any) => any;
  let searchForItems: (query: string) => void;
  let isShowingMore = false;
  let canToggleShowMore: boolean;
  let toggleShowMore: () => void;

  onMount(async () => {
    const customRefinementList = connectRefinementList((params) => {
      ({ items, refine, searchForItems, isShowingMore, canToggleShowMore, toggleShowMore } =
        params);
      if (!params.isFromSearch && value) {
        value = ''; // not sure why this was in docs
      }
    });

    search.addWidgets([
      customRefinementList({
        attribute,
        limit: maxInitialItems,
        showMore: true,
        showMoreLimit: 20,
      }),
    ]);
  });
</script>

{#if items.length > 0 && items.length < maxInitialItems && !value}
  <h4 class="text-xs font-semibold uppercase text-gray-700">{label}</h4>
{/if}

<div
  class="{items.length >= maxInitialItems || value
    ? ''
    : 'hidden'} mt-1 mb-2 relative rounded-md shadow-sm">
  <input
    type="search"
    placeholder="Search {label}"
    class="form-input block border w-full text-sm md:text-xs md:leading-5  py-1 px-3"
    bind:value
    on:input={() => {
      searchForItems(value);
    }} />
</div>

<ul>
  {#each items as item, i (item)}
    <li>
      <div class="flex my-1">
        <input
          id="{attribute.replace('.', '')}_{i}"
          type="checkbox"
          checked={item.isRefined}
          on:click={refine(item.value)}
          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
        <label
          for="{attribute.replace('.', '')}_{i}"
          class="ml-2 block text-sm leading-5 text-gray-900">
          {#if attribute === 'genre'}
            <!-- TODO: add genre thumbnail -->
            <!-- {Genres[item.label]} -->
            {item.label}
          {:else}
            {item.label}
          {/if}
          <span class="text-xs text-gray-600"> ({item.count}) </span>
        </label>
      </div>
    </li>
  {/each}
</ul>

{#if canToggleShowMore}
  <button
    type="button"
    class="p-1 mb-1 ml-1 text-xs text-gray-600"
    on:click={() => toggleShowMore()}
    ><i class="fas {isShowingMore ? 'fa-chevron-up' : 'fa-chevron-down'}" />
    {isShowingMore ? 'Show less' : 'Show more'}</button>
{/if}

<div class="mb-3" />
