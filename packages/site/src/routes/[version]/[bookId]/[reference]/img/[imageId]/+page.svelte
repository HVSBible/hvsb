<script lang="ts">
  import Medium from '$lib/components/content/Medium.svelte';
  import ImageDisplay from '../_ImageDisplay.svelte';
  import { page } from '$app/stores';
  import ParsedParagraph from '$lib/components/content/ParsedParagraph.svelte';

  import type { PageData } from './$types';
  export let data: PageData;

  function truncatedDescription() {
    if (data.image.description) {
      const plainDescription = data.image.description.replace(/<[^>]*>/g, '');
      return truncateString(plainDescription, 90);
    } else {
      return '';
    }
  }

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num).trim() + '...';
  }
</script>

<Medium
  data={data.image}
  title={data.image.title || truncatedDescription()}
  description={truncatedDescription()}
  shareImage={`https://lh3.googleusercontent.com/${data.image.gcs}=w1200`}>
  <ImageDisplay image={data.image} />

  {#if data.image.title}
    <h3 class="p-2 font-semibold hidden md:block">{data.image.title}</h3>
  {/if}

  <div>
    {#if data.image.description && data.image.description != '<p>&nbsp;</p>'}
      <div class="p-2 tw-prose max-w-none">
        <ParsedParagraph mediaId={data.image.id} mediaType="img" version={$page.params.version} value={data.image.description} />
      </div>
    {/if}

    {#if data.image.sourceURL}
      <div class="px-2 pb-2 text-sm text-gray-600">
        Image source:
        <ParsedParagraph mediaId={data.image.id} mediaType="img" version={$page.params.version} value={data.image.sourceURL} />
      </div>
    {/if}
  </div>

  <div class="mt-2" slot="author">
    {#if data.image.editorNotes}
      <div class="mb-4 p-2 bg-gray-200 rounded">
        <div class="text-xs font-semibold">Editor Notes <i class="fas fa-key" /></div>
        <ParsedParagraph mediaId={data.image.id} mediaType="img" version={$page.params.version} value={data.image.editorNotes} />
      </div>
    {/if}

    <div class="flex">
      <a
        
        data-sveltekit-noscroll
        class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
        border border-primary-700"
        href="/{$page.params.version}/{$page.params.bookId}/{$page.params
          .reference}/img/{data.image.id}/edit">
        Edit
        <i class="fas fa-key" />
      </a>
      &nbsp;
    </div>
  </div>
</Medium>
