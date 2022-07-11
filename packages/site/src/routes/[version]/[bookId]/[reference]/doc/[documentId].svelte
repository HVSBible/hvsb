<script context="module" lang="ts">
  import { getDocument } from 'sveltefirets';
  import { DocumentGenres, LanguageMappings, type IDocument } from '@hvsb/types';

  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    const document = await getDocument<IDocument>(`media/${params.documentId}`);
    return { props: { document } };
  };
</script>

<script lang="ts">
  export let document: IDocument;
  import Medium from '$lib/components/content/Medium.svelte';
  import { page } from '$app/stores';
  import { bookAbbrev, DocGenreThumb } from '@hvsb/parts';
  import { getCurrentVerses } from '$lib/helpers/media';
  import ParsedParagraph from '$lib/components/content/ParsedParagraph.svelte';

  function printCurrentVerses() {
    let versesString = '';
    const currentVerses = getCurrentVerses(
      document.verseIds,
      $page.params.bookId,
      $page.params.reference
    );
    currentVerses.forEach((v, i) => {
      if (i == 0) {
        versesString = versesString.concat(
          bookAbbrev($page.params.bookId),
          ' ',
          $page.params.reference,
          ':'
        );
      }
      versesString = versesString.concat(v.toString());
      if (i != currentVerses.length - 1) {
        versesString = versesString.concat(', ');
      }
    });
    return versesString;
  }
</script>

<Medium
  let:translator={translatorLanguage}
  data={document}
  title={document.title}
  description={''}
  shareImage={`https://res.cloudinary.com/hvsb/image/upload/w_1200,h_630,c_fill/v1583535926/home/Jerash_Pano_8_v7myoz.jpg`}>
  <div class="p-2">
    <h2 class="hidden md:block text-2xl font-semibold mb-1">
      {document.title}
    </h2>

    <div class="mb-2 text-sm text-gray-600">
      {#if DocumentGenres[document.genre]}
        <div class="inline-block w-4 h-4" style="vertical-align: -2px;">
          <DocGenreThumb genre={document.genre} minimal={true} paddingPercent={0} />
        </div>
        {DocumentGenres[document.genre]}
        |
      {/if}
      {printCurrentVerses()}
      |
      {#if document.authors && document.authors.length}
        {document.authors.join(' • ')}
      {:else}
        {document.author ? document.author : 'Hershel Wayne House'}
        {#if document.secondAuthor}• {document.secondAuthor}{/if}
      {/if}
      {#if document.location}| {document.location}{/if}
    </div>

    {#each document.sections as section}
      <div class="mb-2">
        {#if section.contentType === 'text'}
          <div class="tw-prose max-w-none">
            <ParsedParagraph value={section.text} />
          </div>
        {:else if section.contentType === 'image'}
          {#await import('./_ImageInDoc.svelte') then { default: ImageInDoc }}
            <ImageInDoc imageId={section.imageId} />
          {/await}
        {/if}
      </div>
    {/each}
  </div>

  {#if document.seriesIds && document.seriesIds.length}
    {#await import('$lib/components/navigation/SeriesNavigator.svelte') then { default: SeriesNavigator }}
      {#each document.seriesIds as seriesId}
        <SeriesNavigator {seriesId} {document} />
      {/each}
    {/await}
  {/if}

  <div slot="author">
    {#if document.editorNotes}
      <div class="mb-4 p-2 bg-gray-200 rounded">
        <div class="text-xs font-semibold">Editor Notes <i class="fas fa-key" /></div>
        <ParsedParagraph value={document.editorNotes} />
      </div>
    {/if}

    <div class="flex">
      <a
        sveltekit:prefetch
        sveltekit:noscroll
        class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
      border border-primary-700"
        href="/{$page.params.version}/{$page.params.bookId}/{$page.params
          .reference}/doc/{document.id}/edit">
        Edit
        <i class="fas fa-key" />
      </a>
      &nbsp;
    </div>
  </div>

  <div class="flex" slot="translator">
    <a
      sveltekit:prefetch
      sveltekit:noscroll
      class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
      border border-primary-700"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params
        .reference}/doc/{document.id}/translate">
      Translate to {LanguageMappings[translatorLanguage]}
      <i class="fas fa-key" />
    </a>
    &nbsp;
  </div>
</Medium>

<style>
  :global(blockquote) {
    margin-left: 2em;
  }
</style>
