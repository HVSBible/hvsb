<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js';
  // import { connectClearRefinements } from 'instantsearch.js/es/connectors';
  import { connectClearRefinements } from 'instantsearch.js/cjs/connectors/index.js';
  import { onMount } from 'svelte';

  export let search: InstantSearch;
  let refine: () => void;
  let hasRefinements = false;

  onMount(() => {
    const customClearRefinements = connectClearRefinements((params) => {
      ({ refine, hasRefinements } = params);
    });

    search.addWidgets([customClearRefinements({})]);
  });
</script>

{#if hasRefinements}
  <button type="button" class="text-xs text-gray-600 p-1" on:click={refine}
  ><i class="fas fa-undo" />
    Clear</button>
{/if}
