<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js';
  // import { connectSearchBox } from 'instantsearch.js/es/connectors';
  import { connectSearchBox } from 'instantsearch.js/cjs/connectors/index.js';
  import { onMount } from 'svelte';

  export let search: InstantSearch,
    placeholder = 'Search';

  let query = null;
  let isSearchStalled = false;

  let refine: (arg0: string) => any = (query?) => {}; // stub function until received from instantsearch;

  onMount(() => {
    const customSearchBox = connectSearchBox((params) => {
      ({ refine, isSearchStalled } = params);
      const { query: currentQuery } = params;
      if (query === null) {
        query = currentQuery;
      }
    });

    search.addWidgets([customSearchBox({})]);
  });

  function autofocus(node: HTMLInputElement) {
    setTimeout(() => node.focus(), 15);
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-grow rounded-md shadow-sm">
  <div class="relative flex-grow focus-within:z-10">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center
        pointer-events-none">
      <i class="fas {isSearchStalled ? 'fa-spinner fa-spin' : 'fa-search'} text-gray-500" />
    </div>
    <input
      type="search"
      bind:value={query}
      on:input={(e) => refine(e.target.value)}
      use:autofocus
      {placeholder}
      class="appearance-none rounded-none block w-full pl-10 pr-3 py-2 border
        border-gray-300 rounded-l-md md:rounded-r-md text-gray-900 placeholder-gray-500
        focus:outline-none focus:ring-primary-300 focus:border-primary-300
        sm:text-sm sm:leading-5 " />
  </div>
  <button
    on:click={() => dispatch('showFilterMenu')}
    class="-ml-px relative flex items-center px-3 py-2 rounded-r-md border
      border-gray-300 text-sm leading-5 bg-gray-50 text-gray-900
      focus:outline-none focus:ring-primary-300 focus:border-primary-300
       md:hidden">
    <!-- <i class="fas fa-filter text-gray-400" /> -->
    <!-- <span class="ml-2 hidden sm:inline"> Filter </span> -->
    Filters
  </button>
</div>
