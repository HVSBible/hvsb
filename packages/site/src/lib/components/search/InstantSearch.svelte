<script lang="ts">
  // https://github.com/algolia/instantsearch.js/issues/4144
  // import algoliasearch from 'algoliasearch/lite'; /// <reference types="algoliasearch" /> TODO
  import algoliasearch from 'algoliasearch';
  import instantsearch from 'instantsearch.js';
  // import { configure } from 'instantsearch.js/es/widgets/index.js';
  import { configure } from 'instantsearch.js/cjs/widgets/index.js';
  // import {
  //   connectSearchBox,
  //   connectInfiniteHits,
  //   connectToggleRefinement,
  // } from 'instantsearch.js/es/connectors';
  import {
    connectSearchBox,
    connectInfiniteHits,
    connectToggleRefinement,
  } from 'instantsearch.js/cjs/connectors/index.js';

  const searchClient = algoliasearch(
    'ZZG6DI40DK', // App ID
    '870da80837195f06653d8a068a75a551' // Search-Only public API key
  );

  const search = instantsearch({
    searchClient,
    // indexName: process.env.PROJECT === 'production' ? 'media_prod' : 'media_dev',
    indexName: 'media_prod',
    routing: true, // customize routing https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/js/
  });

  // For resuming from routed state, mount "virtual widgets" that don't render anything until actual widgets are mounted:
  const virtualSearchBox = connectSearchBox(() => null);
  const virtualToggleRefinement = connectToggleRefinement(() => null);
  const virtualInfiniteHits = connectInfiniteHits(() => null);

  import { admin } from '$lib/stores';

  import { get } from 'svelte/store';
  const isAdmin = !!get(admin);

  search.addWidgets([
    configure({
      hitsPerPage: 15, // adjust lower for mobile
      filters: isAdmin ? '' : `published:true`,
    }),
    virtualSearchBox({}),
    virtualToggleRefinement({ attribute: 'placeholder' }),
    virtualInfiniteHits({}),
  ]);

  search.start();

  import { setContext } from 'svelte';
  setContext('search', search);
</script>

<slot {search}>Loading...</slot>
