<script lang="ts">
  import type { Hits, InstantSearch } from 'instantsearch.js';
  // import { connectInfiniteHits } from 'instantsearch.js/es/connectors';
  import { connectInfiniteHits } from 'instantsearch.js/cjs/connectors/index.js';
  import { onMount } from 'svelte';

  // import instantsearch from 'instantsearch.js';
  // const sessionStorageCache =
  // instantsearch.createInfiniteHitsSessionStorageCache();

  export let search: InstantSearch;
  let hits: Hits = [];
  let showMore: () => void;
  let isLastPage = false;

  onMount(async () => {
    const customInfiniteHits = connectInfiniteHits((params) => {
      ({ hits, showMore, isLastPage } = params);
      // showPrevious, // function
      // isFirstPage, // boolean
    });

    search.addWidgets([
      customInfiniteHits({
        // showPrevious: true,
        // cache: sessionStorageCache,
      }),
    ]);
  });
</script>

<slot {hits} {showMore} {isLastPage}>Loading...</slot>
