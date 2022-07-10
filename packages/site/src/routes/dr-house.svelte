<script context="module" lang="ts">
  // export const prerender = true;
  import { getDocument } from 'sveltefirets';

  import type { Load } from '@sveltejs/kit';
  export const load: Load = async () => {
    const aboutId = 'dr-house';
    const data = await getDocument(`about/${aboutId}`);
    return {
      props: { data },
    };
  };
</script>

<script lang="ts">
  export let data;
  import ParsedParagraph from '$lib/components/content/ParsedParagraph.svelte';
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
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
    {#if data}
      <ParsedParagraph value={data.text} />
    {/if}
  </div>
</View>
