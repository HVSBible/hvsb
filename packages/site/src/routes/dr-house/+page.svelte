<script lang="ts">
  import ParsedParagraph from '$lib/components/content/ParsedParagraph.svelte';
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Dr. Wayne House - Author of House Visual Study Bible</title>
</svelte:head>

<Header>
  <a class="px-3 py-2 hover:text-black hover:bg-gray-200 rounded-lg mr-2 print:hidden" href="/">
    <i class="fas fa-home fa-fw" />
  </a>
  <span class="font-semibold leading-tight sm:text-xl"> Biography </span>
</Header>

<View padding={true} marginTop={true} maxWidth={true}>
  <h1 class="text-3xl text-center mb-4">Dr. Wayne House</h1>
  <div class="tw-prose max-w-none">
    {#if data.bio}
      <ParsedParagraph value={data.bio.text} />
    {/if}
  </div>
</View>
