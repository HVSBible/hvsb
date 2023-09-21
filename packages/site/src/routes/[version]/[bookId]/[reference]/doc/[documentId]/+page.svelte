<script lang="ts">
  import { DocumentGenres, LanguageMappings } from '@hvsb/types';
  import Medium from '$lib/components/content/Medium.svelte';
  import { page } from '$app/stores';
  import { bookAbbrev, DocGenreThumb } from '$lib/parts';
  import { getCurrentVerses } from '$lib/helpers/media';
  import ParsedParagraph from '$lib/components/content/ParsedParagraph.svelte';
  import type { PageData } from './$types';
  import { admin } from '$lib/stores';
  export let data: PageData;

  function printCurrentVerses() {
    let versesString = '';
    const currentVerses = getCurrentVerses(
      data.document.verseIds,
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
      if (i != currentVerses.length - 1)
        versesString = versesString.concat(', ');

    });
    return versesString;
  }
</script>

<Medium
  let:translator={translatorLanguage}
  data={data.document}
  title={data.document.title}
  description={''}
  shareImage={`https://res.cloudinary.com/hvsb/image/upload/w_1200,h_630,c_fill/v1583535926/home/Jerash_Pano_8_v7myoz.jpg`}>
  <div class="p-2">
    <h2 class="hidden md:block text-2xl font-semibold mb-1">
      {data.document.title}
    </h2>

    <div class="mb-2 text-sm text-gray-600">
      {#if DocumentGenres[data.document.genre]}
        <div class="inline-block w-4 h-4" style="vertical-align: -2px;">
          <DocGenreThumb genre={data.document.genre} minimal={true} paddingPercent={0} />
        </div>
        {DocumentGenres[data.document.genre]}
        |
      {/if}
      {printCurrentVerses()}
      |
      {#if data.document.authors?.length}
        {data.document.authors.join(' • ')}
      {:else}
        {data.document.author || 'Hershel Wayne House'}
        {#if data.document.secondAuthor}• {data.document.secondAuthor}{/if}
      {/if}
      {#if data.document.location}| {data.document.location}{/if}
    </div>

    {#each data.document.sections as section}
      <div class="mb-2">
        {#if section.contentType === 'text'}
          <div class="tw-prose max-w-none">
            <ParsedParagraph
              showVerseLinks={!!$admin}
              mediaId={data.document.id}
              mediaType="doc"
              version={$page.params.version}
              value={section.text} />
          </div>
        {:else if section.contentType === 'image'}
          {#await import('./ImageInDoc.svelte') then { default: ImageInDoc }}
            <ImageInDoc imageId={section.imageId} />
          {/await}
        {/if}
      </div>
    {/each}
  </div>

  {#if data.document.seriesIds?.length}
    {#await import('$lib/components/navigation/SeriesNavigator.svelte') then { default: SeriesNavigator }}
      {#each data.document.seriesIds as seriesId}
        <SeriesNavigator {seriesId} document={data.document} />
      {/each}
    {/await}
  {/if}

  <div slot="author">
    {#if data.document.editorNotes}
      <div class="mb-4 p-2 bg-gray-200 rounded">
        <div class="text-xs font-semibold">Editor Notes <i class="fas fa-key" /></div>
        <ParsedParagraph
          showVerseLinks
          mediaId={data.document.id}
          mediaType="doc"
          version={$page.params.version}
          value={data.document.editorNotes} />
      </div>
    {/if}

    <div class="flex">
      <a
        data-sveltekit-noscroll
        class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
          border border-primary-700"
        href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}/doc/{data
          .document.id}/edit">
        Edit
        <i class="fas fa-key" />
      </a>
      &nbsp;
    </div>
  </div>

  <div class="flex" slot="translator">
    <a
      data-sveltekit-noscroll
      class="font-medium px-3 py-2 hover:bg-gray-200 text-primary-700 rounded
        border border-primary-700"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}/doc/{data
        .document.id}/translate">
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
