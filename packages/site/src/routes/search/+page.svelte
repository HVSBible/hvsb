<script lang="ts">
  import SearchWrapper from '$lib/components/search/SearchWrapper.svelte';
  import View from '$lib/components/ui/View.svelte';
  import Mounted from '$lib/components/utilities/Mounted.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Search: House Visual Study Bible</title>
</svelte:head>

<View padding>
  <Mounted>
    <SearchWrapper previousUrl={data.previousUrl} />
  </Mounted>
  <!-- {#await import('$lib/components/search/SearchWrapper.svelte') then { default: SearchWrapper }}
  {/await} -->
</View>
