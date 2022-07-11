<script context="module" lang="ts">
  import { getDocument } from 'sveltefirets';
  import type { IImage } from '@hvsb/types';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    const image = await getDocument<IImage>(`media/${params.imageId}`);
    return { props: { image } };
  };
</script>

<script lang="ts">
  export let image: IImage;
  import Medium from '$lib/components/content/Medium.svelte';
  import ImageDisplay from './_ImageDisplay.svelte';
  import { page } from '$app/stores';
  import ParsedParagraph from '$lib/components/content/ParsedParagraph.svelte';

  function truncatedDescription() {
    if (image.description) {
      const plainDescription = image.description.replace(/<[^>]*>/g, '');
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
  data={image}
  title={image.title || truncatedDescription()}
  description={truncatedDescription()}
  shareImage={`https://lh3.googleusercontent.com/${image.gcs}=w1200`}>
  <ImageDisplay {image} />

  {#if image.title}
    <h3 class="p-2 font-semibold hidden md:block">{image.title}</h3>
  {/if}

  <div>
    {#if image.description && image.description != '<p>&nbsp;</p>'}
      <div class="p-2 tw-prose max-w-none">
        <ParsedParagraph value={image.description} />
      </div>
    {/if}

    {#if image.sourceURL}
      <div class="px-2 pb-2 text-sm text-gray-600">
        Image source:
        <ParsedParagraph value={image.sourceURL} />
      </div>
    {/if}
  </div>

  <div class="mt-2" slot="author">
    {#if image.editorNotes}
      <div class="mb-4 p-2 bg-gray-200 rounded">
        <div class="text-xs font-semibold">Editor Notes <i class="fas fa-key" /></div>
        <ParsedParagraph value={image.editorNotes} />
      </div>
    {/if}

    <div class="flex">
      <a
        sveltekit:prefetch
        sveltekit:noscroll
        class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
        border border-primary-700"
        href="/{$page.params.version}/{$page.params.bookId}/{$page.params
          .reference}/img/{image.id}/edit">
        Edit
        <i class="fas fa-key" />
      </a>
      &nbsp;
    </div>
  </div>
</Medium>
