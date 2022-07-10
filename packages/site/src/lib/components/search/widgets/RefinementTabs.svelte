<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js';
  // import { connectRefinementList, connectClearRefinements } from 'instantsearch.js/es/connectors';
  import {
    connectRefinementList,
    connectClearRefinements,
  } from 'instantsearch.js/cjs/connectors/index.js';
  import type { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
  import { onMount } from 'svelte';

  export let search: InstantSearch,
    attribute = '';

  let items: RefinementListItem[] = [];
  let refine: (arg0: any) => any;
  let clearTabRefinements: () => void;

  onMount(async () => {
    const customRefinementList = connectRefinementList((params) => {
      ({ items, refine } = params);
    });

    const customClearRefinements = connectClearRefinements((params) => {
      ({ refine: clearTabRefinements } = params);
    });

    search.addWidgets([
      customRefinementList({
        attribute,
        limit: 6,
      }),
      customClearRefinements({ includedAttributes: [attribute] }),
    ]);
  });

  $: refined = items.find((item) => item.isRefined);

  function show(value?: string) {
    clearTabRefinements();
    value && refine(value);
  }
</script>

<button
  type="button"
  on:click={() => show()}
  class="{!refined
    ? 'text-primary-700 bg-primary-100 focus:text-primary-800 focus:bg-primary-200'
    : 'text-gray-500 hover:text-gray-700 focus:text-primary-600 focus:bg-primary-50'} py-2 px-3 font-medium text-sm leading-5 focus:outline-none rounded-md">
  All
</button>
{#each ['document', 'image', 'video'] as buttonValue}
  <button
    type="button"
    on:click={() => show(buttonValue)}
    class="{items.find((item) => item.value === buttonValue) &&
    items.find((item) => item.value === buttonValue).isRefined
      ? 'text-primary-700 bg-primary-100 focus:text-primary-800 focus:bg-primary-200'
      : 'text-gray-500 hover:text-gray-700 focus:text-primary-600 focus:bg-primary-50'} py-2 px-3 font-medium text-sm leading-5 focus:outline-none rounded-md">
    {#if buttonValue === 'document'}
      <i class="far fa-file-alt mt-0.5 hidden sm:inline mr-1" />
      <span class="">Articles</span>
    {:else if buttonValue === 'image'}
      <i class="far fa-image mt-0.5 hidden sm:inline mr-1" />
      <span class="">Images</span>
    {:else if buttonValue === 'video'}
      <i class="fab fa-youtube mt-0.5 hidden sm:inline mr-1" />
      <span class="">Videos</span>
    {/if}
    {#if items.find((item) => item.value === buttonValue) && items.find((item) => item.value === buttonValue).count}
      <span class="hidden sm:inline text-xs text-gray-600">
        ({items.find((item) => item.value === buttonValue).count})
      </span>
    {/if}
  </button>
{/each}
<!-- <button
    type="button"
    class="ml-8 group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300">
    <i class="fas fa-bible mt-0.5" />
    <span class="hidden sm:inline ml-2">Reference</span>
  </button> -->
