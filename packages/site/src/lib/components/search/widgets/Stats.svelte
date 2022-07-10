<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js';
  // import { connectStats } from 'instantsearch.js/es/connectors';
  import { connectStats } from 'instantsearch.js/cjs/connectors/index.js';
  import { onMount } from 'svelte';

  export let search: InstantSearch;
  let processingTimeMS: number;
  let nbHits = 0;

  onMount(() => {
    const customStats = connectStats((params) => {
      ({ processingTimeMS, nbHits } = params);
    });

    search.addWidgets([customStats({})]);
  });
</script>

Results: {nbHits}
{#if nbHits}found in {processingTimeMS}ms{/if}
