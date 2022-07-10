<script lang="ts">
  import type { Hit, InstantSearch } from 'instantsearch.js';
  import type { IDocument, IImage, IVideo } from '@hvsb/types';
  // import { connectHits } from 'instantsearch.js/es/connectors';
  import { connectHits } from 'instantsearch.js/cjs/connectors/index.js';
  import { onMount } from 'svelte';

  export let search: InstantSearch;
  let hits: Partial<Hit & (IImage | IDocument | IVideo)>[] = [];

  onMount(() => {
    const customHits = connectHits((params) => {
      hits = params.hits.map((hit) => {
        return { ...hit, id: hit.objectID };
      });
    });

    search.addWidgets([customHits({})]);
  });
</script>

<slot {hits}>Loading...</slot>
