<script lang="ts">
  // TODO: refactor document.author and .secondAuthor into .authors[]
  import { flip } from 'svelte/animate';
  import type { Readable } from 'svelte/store';
  import {
    DocumentGenres,
    type DocumentGenre,
    type IAuthor,
    type IDocument,
    type ILocation,
  } from '@hvsb/types';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { admin, user } from '$lib/stores';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { moveInArray } from '$lib/helpers/array';
  import { isAddingAttributeToDB, unlinkFromParentDocument } from '$lib/helpers/editing';
  import EditVerseIds from '$lib/components/content/EditVerseIds.svelte';
  import ImageInDoc from '../ImageInDoc.svelte';
  import ClassicCustomized from '$lib/components/editor/ClassicCustomized.svelte';
  import { addOnline, collectionStore, deleteDocumentOnline, Doc, update } from 'sveltefirets';
  import { orderBy } from 'firebase/firestore';

  import type { PageData } from './$types';
  export let data: PageData;

  let authors: Readable<IAuthor[]> = collectionStore<IAuthor>('authors', [orderBy('name')], {
    startWith: [],
  });
  let locations: Readable<ILocation[]> = collectionStore<ILocation>(
    'locations',
    [orderBy('name')],
    { startWith: [] }
  );
  const documentGenres = Object.keys(DocumentGenres) as DocumentGenre[];
  let document: IDocument;

  async function save(document: IDocument) {
    try {
      await update(`media/${document.id}`, document);

      if (document.authors) {
        for (const authorInDoc of document.authors) {
          if (isAddingAttributeToDB($authors, authorInDoc)) {
            await addOnline<IAuthor>('authors', { name: authorInDoc });
          }
        }
      }

      if (document.location && isAddingAttributeToDB($locations, document.location)) {
        await addOnline<ILocation>('locations', { name: document.location });
      }

      // TODO: refresh media and then we can navigate without the full page reload
      // goto(
      //   `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${document.id}`
      // );
      window.location.replace(
        `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${document.id}`
      );
    } catch (err) {
      alert(err);
    }
  }

  async function deleteDocument(document: IDocument) {
    if (confirm('Delete article?')) {
      if (document.sections.some((section) => section.contentType === 'image')) {
        return alert('Please unlink all embedded images before deleting article.');
      }
      try {
        console.log(`media/${document.id}`);
        await deleteDocumentOnline(`media/${document.id}`);
        goto(`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}`);
      } catch (err) {
        alert(`Error deleting, please try again later. ${err}`);
      }
    }
  }

  function prepareDocument(document: IDocument): IDocument {
    if (!document.authors) {
      document.authors = document.author ? [document.author] : [];
      if (document.secondAuthor) {
        document.authors.push(document.secondAuthor);
      }
    }
    delete document.author;
    delete document.secondAuthor;
    return document;
  }
</script>

<Doc
  path="media/{data.documentId}"
  on:data={(e) => {
    if (e.detail.data) {
      //@ts-ignore
      document = prepareDocument(e.detail.data);
    }
  }} />

{#if document}
  <form on:submit|preventDefault={() => save(document)}>
    <div
      class="flex justify-between items-center pb-1 sticky top-0 z-10 bg-white
    pt-2 -mt-2">
      <div class="mr-auto">
        <Button type="submit" color="green" form="filled">Save</Button>
      </div>

      {#if $admin || (document && $user && document.createdBy === $user.uid)}
        <Button color="red" form="simple" onclick={() => deleteDocument(document)}>
          <i class="fas fa-trash mr-1" />
          <span class="hidden sm:inline">Delete</span>
        </Button>
      {/if}
      <Button
        color="black"
        form="simple"
        href="/{$page.params.version}/{$page.params.bookId}/{$page.params
          .reference}/doc/{document.id}">
        <i class="fas fa-times mr-1" />
        Cancel
      </Button>
    </div>

    <div class="mt-3">
      <label for="title" class="block text-sm font-medium leading-5 text-gray-700"> Title </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <!-- svelte-ignore a11y-autofocus -->
        <input
          id="title"
          type="text"
          minlength="5"
          required
          autofocus
          bind:value={document.title}
          class="form-input block w-full text-lg sm:text-xl"
          placeholder="Enter article title" />
      </div>
    </div>

    <div class="mt-3">
      <label for="genre" class="block text-sm font-medium leading-5 text-gray-700">
        Article Genre
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <select
          id="genre"
          bind:value={document.genre}
          class="focus:ring-primary-500 focus:border-primary-500 shadow-sm border-gray-300 rounded-md block w-full">
          {#each documentGenres as genre}
            <option value={genre}>{DocumentGenres[genre]}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="mt-3">
      <label for="year" class="block text-sm font-medium leading-5 text-gray-700">
        Year Written
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="year"
          max="2100"
          min="1900"
          type="number"
          bind:value={document.yearWritten}
          class="form-input w-full"
          placeholder="Enter year" />
      </div>
    </div>

    {#if document.authors}
      {#each document.authors as docAuthor, index}
        <div class="mt-3">
          <div class="flex items-center">
            <label for="author" class="block text-sm font-medium leading-5 text-gray-700">
              Author
            </label>
            <button
              type="button"
              on:click={() => {
                document.authors.splice(index, 1);
                document.authors = [...document.authors];
              }}
              class="cursor-pointer justify-center items-center flex
            bg-gray-200 hover:bg-gray-300 rounded-full h-4 w-4 ml-1">
              <i class="fas fa-times text-xs" />
            </button>
            {#if docAuthor && isAddingAttributeToDB($authors, docAuthor)}
              <span class="text-sm leading-5 text-gray-500 ml-auto">
                <i class="fas fa-info-circle" />
                New Author
              </span>
            {/if}
          </div>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="author"
              bind:value={docAuthor}
              list="authors"
              class="form-input block w-full"
              placeholder="Enter author" />
            <datalist id="authors">
              {#each $authors as dbAuthor}
                <option>{dbAuthor.name}</option>
              {:else}
                <option>Loading authors...</option>
              {/each}
            </datalist>
          </div>
        </div>
      {/each}
    {/if}
    <button
      type="button"
      on:click={() => (document.authors = [...document.authors, ''])}
      class="bg-gray-100 hover:bg-gray-200 rounded mt-1 px-2 py-1 text-xs">
      Add Author
    </button>

    <div class="mt-3">
      <div class="flex justify-between">
        <label for="location" class="block text-sm font-medium leading-5 text-gray-700">
          Location
        </label>
        {#if isAddingAttributeToDB($locations, document.location)}
          <span class="text-sm leading-5 text-gray-500">
            <i class="fas fa-info-circle" />
            New Location
          </span>
        {/if}
      </div>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          id="location"
          bind:value={document.location}
          list="locations"
          class="form-input block w-full"
          placeholder="Enter location" />
        <datalist id="locations">
          {#each $locations as location}
            <option>{location.name}</option>
          {:else}
            <option>Loading location...</option>
          {/each}
        </datalist>
      </div>
      <p class="mt-1 text-xs text-gray-500">Geographical or Source (ex. museum location)</p>
    </div>

    <EditVerseIds bind:medium={document} />

    {#if $admin}
      <div class="cursor-pointer flex items-center">
        <input
          id="published"
          bind:checked={document.published}
          type="checkbox"
          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
        <label for="published" class="ml-2 block text-sm leading-5 text-gray-900">
          Published
        </label>
      </div>
    {/if}

    {#each document.sections as section, index (section)}
      <div class="border-b border-gray-500 pb-2" animate:flip>
        {#if section.contentType === 'text'}
          <div class="mt-5 prose max-w-none">
            <ClassicCustomized
              html={section.text}
              on:update={({ detail }) => (section.text = detail)} />
          </div>
        {:else if section.contentType === 'image'}
          <ImageInDoc imageId={section.imageId} />
        {/if}
        <div class="flex">
          {#if index != 0}
            <Button
              form="simple"
              onclick={() => {
                document.sections = moveInArray(document.sections, index, index - 1);
              }}>
              <i class="fas fa-chevron-up" />
            </Button>
          {/if}
          {#if index != document.sections.length - 1}
            <Button
              form="simple"
              onclick={() => {
                document.sections = moveInArray(document.sections, index, index + 1);
              }}>
              <i class="fas fa-chevron-down" />
            </Button>
          {/if}
          <div class="ml-auto" />
          {#if section.contentType === 'text'}
            <Button
              form="simple"
              onclick={() => {
                document.sections.splice(index, 1);
                document.sections = [...document.sections];
              }}>
              <i class="fas fa-trash" />
              Delete Paragraph
            </Button>
          {:else if section.contentType === 'image'}
            <Button
              target="_blank"
              form="simple"
              href="/{$page.params.version}/{$page.params.bookId}/{$page.params
                .reference}/img-edit/{section.imageId}">
              Edit Image
            </Button>
            <Button
              form="simple"
              onclick={() =>
                unlinkFromParentDocument(
                  $page.params.bookId,
                  $page.params.reference,
                  section.imageId,
                  document.id
                )}>
              <i class="fas fa-unlink" />
              Unlink Image
            </Button>
          {/if}
        </div>
      </div>
    {/each}
    <Button
      class="mt-2"
      onclick={() => {
        document.sections.push({ contentType: 'text', text: '' });
        document.sections = [...document.sections];
      }}>
      Add Paragraph
    </Button>

    <div class="my-4 p-2 bg-gray-200 rounded">
      <div class="text-xs font-semibold mb-2">Editor Notes (will not be published)</div>
      <div class="tw-prose max-w-none">
        <ClassicCustomized html={document.editorNotes} on:update={({ detail }) => (document.editorNotes = detail)} />
      </div>
    </div>

    {#if $admin > 1}
      <input
        type="text"
        on:blur={(e) => {
          //@ts-ignore
          document.seriesIds = [e.target.value];
        }}
        class="form-input block w-full mt-2"
        placeholder="Enter seriesId for index 0" />
    {/if}
  </form>

  {#if $admin > 1}
    {#await import('svelte-pieces/data/JSON.svelte') then { default: JSON }}
      <JSON obj={document} />
    {/await}
  {/if}
{/if}

<style>
  input:invalid {
    box-shadow: 0 0 0 3px hsl(0deg 98% 82% / 45%);
    border-color: hsl(0deg 98% 82%);
  }
</style>
