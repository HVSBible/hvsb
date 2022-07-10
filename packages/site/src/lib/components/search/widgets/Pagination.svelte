<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js';
  // import { connectPagination } from 'instantsearch.js/es/connectors';
  import { connectPagination } from 'instantsearch.js/cjs/connectors/index.js';
  import { onMount } from 'svelte';

  export let search: InstantSearch;
  let pages: number[] = [];
  let currentRefinement: number;
  let nbPages: number;
  let isFirstPage: boolean;
  let isLastPage: boolean;
  let refine: (page: number) => void;

  onMount(() => {
    const customPagination = connectPagination((params) => {
      ({ pages, currentRefinement, nbPages, isFirstPage, isLastPage, refine } = params);
    });

    search.addWidgets([customPagination({})]);
  });
</script>

<nav class="my-2 flex items-center">
  {#if !isFirstPage}
    <button
      type="button"
      on:click={() => refine(0)}
      class="hidden sm:block rounded py-2 px-3 mr-1 text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:text-gray-800 focus:outline-none ">
      <i class="fas fa-angle-double-left" /></button>
    <button
      type="button"
      on:click={() => refine(currentRefinement - 1)}
      class="rounded py-2 px-3 mr-1 sm:text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:text-gray-800 focus:outline-none ">
      <i class="fas fa-angle-left">
        <span class="sm:hidden ml-1">Previous</span>
      </i></button>
  {/if}

  <div class="hidden md:flex">
    {#each pages as page}
      <button
        type="button"
        on:click={() => refine(page)}
        class="{currentRefinement === page
          ? 'bg-primary-100 text-primary-700 focus:bg-primary-200 focus:text-primary-800'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:text-gray-800'} rounded py-2 px-3 mr-1 inline-flex items-center text-sm leading-5 font-medium focus:outline-none  ">
        {page + 1}
      </button>
    {/each}
  </div>

  {#if !isLastPage}
    <button
      type="button"
      on:click={() => refine(currentRefinement + 1)}
      class="rounded py-2 px-3 mr-1 sm:text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:text-gray-800 focus:outline-none ">
      <span class="sm:hidden mr-1">Next</span>
      <i class="fas fa-angle-right" /></button>
    <button
      type="button"
      on:click={() => refine(nbPages - 1)}
      class="hidden sm:block rounded py-2 px-3 mr-1 text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:text-gray-800 focus:outline-none ">
      <i class="fas fa-angle-double-right" /></button>
  {/if}
</nav>
