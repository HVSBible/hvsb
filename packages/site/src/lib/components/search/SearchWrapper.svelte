<script lang="ts">
  import instantsearch from 'instantsearch.js';
  import InstantSearch from './InstantSearch.svelte';
  import SearchBox from './widgets/SearchBox.svelte';
  import Hits from './widgets/Hits.svelte';
  import Stats from './widgets/Stats.svelte';
  import RefinementList from './widgets/RefinementList.svelte';
  import RefinementTabs from './widgets/RefinementTabs.svelte';
  import ToggleRefinement from './widgets/ToggleRefinement.svelte';
  import ClearRefinements from './widgets/ClearRefinements.svelte';
  import Pagination from './widgets/Pagination.svelte';
  import { PreviewVideo, PreviewImage, PreviewDocument } from '$lib/parts';

  import { fade } from 'svelte/transition';
  import { admin } from '$lib/stores';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { deleteVideo } from '$lib/helpers/video';

  export let previousUrl: string;
</script>

<ShowHide let:show={showMobileFilters} let:toggle>
  <InstantSearch let:search>
    <div class="sticky top-0 -mt-3 pt-3 bg-white pb-1 z-10">
      <nav class="flex pb-1">
        <RefinementTabs {search} attribute="type" />
        <a
          href={previousUrl || '.'}
          
          class="px-3 py-2 text-lg text-gray-600 hover:text-gray-900 ml-auto"
          ><i class="fas fa-times" /></a>
      </nav>
      <SearchBox placeholder="Search Media" {search} on:showFilterMenu={toggle} />
    </div>
    <div class="flex mt-1">
      <div class="w-full">
        <div class="flex justify-between">
          <div class="italic text-xs text-gray-500 mb-1">
            <Stats {search} />
          </div>
        </div>
        <Hits {search} let:hits>
          {#each hits as medium}
            <div class="mb-2">
              {#if medium.type === 'document'}
                <PreviewDocument document={medium}>
                  <span slot="title">
                    {@html instantsearch.highlight({
                      attribute: 'title',
                      hit: medium,
                    })}</span>
                </PreviewDocument>
              {/if}
              {#if medium.type === 'image'}
                <PreviewImage image={medium} admin={$admin}>
                  <span slot="title">
                    {@html instantsearch.highlight({
                      attribute: 'title',
                      hit: medium,
                    })}</span>
                </PreviewImage>
              {/if}
              {#if medium.type === 'video'}
                <PreviewVideo
                  video={medium}
                  admin={$admin}
                  on:deleteVideo={(e) => deleteVideo(e.detail)}>
                  <span slot="title">
                    {@html instantsearch.highlight({
                      attribute: 'title',
                      hit: medium,
                    })}</span
                  ></PreviewVideo>
              {/if}
            </div>
          {:else}No results{/each}
        </Hits>
        <Pagination {search} />
      </div>

      {#if showMobileFilters}
        <div
          transition:fade={{ duration: 300 }}
          class="fixed inset-0 bg-gray-900 bg-opacity-25 z-10"
          on:click={toggle} />
      {/if}
      <section
        class="flex flex-shrink-0 flex-col self-start 
      transform translate-x-full transition-transform ease-in-out duration-300
      fixed inset-y-0 right-0 p-4 z-20 overflow-y-auto w-64 
      bg-white shadow-xl
      md:w-52 md:ml-3 md:sticky md:z-auto md:p-0 md:shadow-none md:transform-none md:top-[106px] md:max-h-[calc(100vh-118px)]"
        class:translate-x-0={showMobileFilters}>
        <div class="flex items-center justify-between space-x-3 md:pl-1">
          <h2 class="text-lg leading-7 font-medium text-gray-900 mb-2">Filters</h2>
          <ClearRefinements {search} />
          <div class="md:hidden">
            <Button size="sm" form="filled" onclick={toggle}>View Results</Button>
            <!-- aria-label="Close panel" -->
          </div>
        </div>
        <div class="relative flex-1 overflow-y-auto md:pl-1">
          {#if $admin}
            <h4 class="text-xs font-semibold uppercase text-gray-700">Admin</h4>
            <ToggleRefinement {search} attribute="published" label="Published" />
            <ToggleRefinement {search} attribute="published" on={false} label="Not Published" />
            <div class="mb-4" />
            <hr class="mb-2" />
          {/if}

          <RefinementList {search} attribute="genre" label="Genres" />
          <RefinementList {search} attribute="location" label="Locations" />
          <RefinementList {search} attribute="subject" label="Subjects" />

          {#if $admin}
            <hr class="mb-2" />
            <h4 class="text-xs font-semibold uppercase text-gray-700">Admin</h4>
            <RefinementList {search} attribute="author" label="Authors" />
            <RefinementList {search} attribute="credit" label="Image Credit" />
            <RefinementList {search} attribute="bookIds" label="Books" />
            <RefinementList {search} attribute="chapterIds" label="Chapters" />
            <RefinementList {search} attribute="createdBy" label="Created by" />
          {/if}
        </div>
      </section>
    </div>
  </InstantSearch>
</ShowHide>

<svelte:head>
  <link type="text/css" rel="stylesheet" href="/minimal-scrollbar.css" />
</svelte:head>
