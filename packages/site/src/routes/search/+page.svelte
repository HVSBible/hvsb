<script context="module" lang="ts">
  import { browser } from '$app/env';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    if (browser && window.location.href.indexOf('search') < 0) {
      return { props: { previousUrl: window.location.href } };
    } else {
      return { props: { previousUrl: '' } };
    }
  };
</script>

<script lang="ts">
  import SearchWrapper from '$lib/components/search/SearchWrapper.svelte';
  import View from '$lib/components/ui/View.svelte';
  import Mounted from '$lib/components/utilities/Mounted.svelte';
  export let previousUrl: string;
</script>

<svelte:head>
  <title>Search: House Visual Study Bible</title>
</svelte:head>

<View padding>
  <Mounted>
    <SearchWrapper {previousUrl} />
  </Mounted>
  <!-- {#await import('$lib/components/search/SearchWrapper.svelte') then { default: SearchWrapper }}
  {/await} -->
</View>
