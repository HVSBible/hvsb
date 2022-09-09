<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    return { props: { imageId: params.imageId } };
  };
</script>

<script lang="ts">
  import {
    ImageGenres,
    type IImage,
    type ILocation,
    type ImageGenre,
    type IPhotographer,
    type ISubject,
  } from '@hvsb/types';
  import ImageDisplay from '../_ImageDisplay.svelte';
  import { admin } from '$lib/stores';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import EditVerseIds from '$lib/components/content/EditVerseIds.svelte';
  import ClassicCustomized from '$lib/components/editor/ClassicCustomized.svelte';
  import { isAddingAttributeToDB } from '$lib/helpers/editing';
  import type { Readable } from 'svelte/store';
  import { addOnline, collectionStore, deleteDocumentOnline, Doc, update } from 'sveltefirets';
  import { orderBy } from 'firebase/firestore';

  export let imageId: string;
  let subjects: Readable<ISubject[]> = collectionStore<ISubject>('subjects', [orderBy('name')], {
    startWith: [],
  });
  let locations: Readable<ILocation[]> = collectionStore<ILocation>(
    'locations',
    [orderBy('name')],
    { startWith: [] }
  );
  let photographers: Readable<IPhotographer[]> = collectionStore<IPhotographer>(
    'photographers',
    [orderBy('name')],
    { startWith: [] }
  ); // Credit
  const imageGenres = Object.keys(ImageGenres) as ImageGenre[];
  let image: IImage;

  async function save(image: IImage) {
    try {
      await update(`media/${image.id}`, image);

      if (image.credit) {
        for (const credit of image.credit) {
          if (isAddingAttributeToDB($photographers, credit)) {
            await addOnline<IPhotographer>('photographers', { name: credit });
          }
        }
      }

      if (image.location) {
        for (const location of image.location) {
          if (isAddingAttributeToDB($locations, location)) {
            await addOnline<ILocation>('locations', { name: location });
          }
        }
      }

      if (image.subject && isAddingAttributeToDB($subjects, image.subject)) {
        await addOnline<ISubject>('subjects', { name: image.subject });
      }

      window.location.replace(
        `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/img/${image.id}`
      );
    } catch (err) {
      alert(err);
    }
  }

  async function deleteImage(image: IImage) {
    if (image.parents && image.parents.length) {
      return alert('Please unlink this image from all articles before deleting');
    }
    if (
      image.verseIds.length > 1
        ? confirm(
            'This image is attached to multiple verses. Deleting will remove from all of the verses.'
          )
        : confirm('Delete image?')
    ) {
      try {
        await deleteDocumentOnline(`media/${image.id}`); // Only do image reference deletion client-side, the actual image is deleted by Firebase delete-image function
        goto(`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}`);
      } catch (err) {
        alert(`Error deleting, please try again later or let us know. ${err}`);
      }
    }
  }
</script>

<Doc
  path="media/{imageId}"
  on:data={(e) => {
    if (e.detail.data) {
      //@ts-ignore
      image = e.detail.data;
    }
  }} />

{#if image}
  <form on:submit|preventDefault={() => save(image)}>
    <div class="flex justify-between items-center pb-1 sticky top-0 z-10 bg-white">
      <button
        class="bg-green-500 hover:bg-green-600 text-white btn rounded px-4 py-2
      font-bold hover:shadow text-sm focus:outline-none focus:border-green-700
      focus:ring-green-500 uppercase
      leading-6 mr-1"
        type="submit">
        <span class="mr-1">Save</span>
      </button>

      {#if $admin}
        <button
          class="btn hover:bg-red-200 text-red-700 px-4 py-2 font-bold text-sm
      rounded  uppercase leading-6 ml-auto"
          type="button"
          on:click={() => deleteImage(image)}>
          <i class="fas fa-trash mr-1" />
          <span class="hidden sm:inline">Delete</span>
        </button>
      {/if}
      <a
        class="hover:bg-gray-200 text-gray-500 px-4 py-2 font-bold text-sm rounded
     uppercase leading-6"
        href="/{$page.params.version}/{$page.params.bookId}/{$page.params
          .reference}/img/{image.id}">
        <i class="fas fa-times mr-1" />
        Cancel
      </a>
    </div>

    <ImageDisplay {image} />

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
          bind:value={image.title}
          class="form-input block w-full text-lg"
          placeholder="Enter image title" />
      </div>
    </div>

    <div class="mt-3 prose max-w-none">
      <ClassicCustomized
        html={image.description}
        on:update={({ detail }) => (image.description = detail)} />
    </div>

    {#if image.location}
      {#each image.location as location, index}
        <div class="mt-3">
          <div class="flex items-center">
            <label for="location" class="block text-sm font-medium leading-5 text-gray-700">
              Location
            </label>
            <button
              type="button"
              on:click={() => {
                image.location.splice(index, 1);
                image.location = [...image.location];
              }}
              class="cursor-pointer justify-center items-center flex
          bg-gray-200 hover:bg-gray-300 rounded-full h-4 w-4 ml-1">
              <i class="fas fa-times text-xs" />
            </button>
            {#if location && isAddingAttributeToDB($locations, location)}
              <span class="text-sm leading-5 text-gray-500 ml-auto">
                <i class="fas fa-info-circle" />
                New Location
              </span>
            {/if}
          </div>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="location"
              bind:value={location}
              list="locations"
              class="form-input block w-full"
              placeholder="Enter location" />
            <datalist id="locations">
              {#each $locations as dbLocation}
                <option>{dbLocation.name}</option>
              {:else}
                <option>Loading locations...</option>
              {/each}
            </datalist>
          </div>
        </div>
      {/each}
    {/if}
    <button
      type="button"
      on:click={() => {
        if (!image.location) {
          image.location = [];
        }
        image.location = [...image.location, ''];
      }}
      class="bg-gray-100 hover:bg-gray-200 rounded mt-1 px-2 py-1 text-xs">
      Add Location
    </button>

    {#if image.credit}
      {#each image.credit as credit, index}
        <div class="mt-3">
          <div class="flex items-center">
            <label for="credit" class="block text-sm font-medium leading-5 text-gray-700">
              Credit
            </label>
            <button
              type="button"
              on:click={() => {
                image.credit.splice(index, 1);
                image.credit = [...image.credit];
              }}
              class="cursor-pointer justify-center items-center flex
          bg-gray-200 hover:bg-gray-300 rounded-full h-4 w-4 ml-1">
              <i class="fas fa-times text-xs" />
            </button>
            {#if credit && isAddingAttributeToDB($photographers, credit)}
              <span class="text-sm leading-5 text-gray-500 ml-auto">
                <i class="fas fa-info-circle" />
                New Credit
              </span>
            {/if}
          </div>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              id="credit"
              bind:value={credit}
              list="credits"
              class="form-input block w-full"
              placeholder="Enter credit" />
            <datalist id="credits">
              {#each $photographers as dbPhotographer}
                <option>{dbPhotographer.name}</option>
              {:else}
                <option>Loading...</option>
              {/each}
            </datalist>
          </div>
        </div>
      {/each}
    {/if}
    <button
      type="button"
      on:click={() => {
        if (!image.credit) {
          image.credit = [];
        }
        image.credit = [...image.credit, ''];
      }}
      class="bg-gray-100 hover:bg-gray-200 rounded mt-1 px-2 py-1 text-xs">
      Add Credit
    </button>

    <div class="mt-3">
      <label for="genre" class="block text-sm font-medium leading-5 text-gray-700">
        Image Genre (Medium)
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <select
          id="genre"
          bind:value={image.genre}
          class="focus:ring-primary-500 focus:border-primary-500 shadow-sm border-gray-300 rounded-md block w-full">
          {#each imageGenres as genre}
            <option value={genre}>{ImageGenres[genre]}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="mt-3">
      <div class="flex justify-between">
        <label for="subject" class="block text-sm font-medium leading-5 text-gray-700">
          Subject
        </label>
        {#if isAddingAttributeToDB($subjects, image.subject)}
          <span class="text-sm leading-5 text-gray-500">
            <i class="fas fa-info-circle" />
            New Subject
          </span>
        {/if}
      </div>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          id="subject"
          bind:value={image.subject}
          list="subjects"
          class="form-input block w-full"
          placeholder="Enter subject" />
        <datalist id="subjects">
          {#each $subjects as subject}
            <option>{subject.name}</option>
          {:else}
            <option>Loading subjects...</option>
          {/each}
        </datalist>
      </div>
    </div>

    <div class="mt-3">
      <label for="year" class="block text-sm font-medium leading-5 text-gray-700">
        Year Taken
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="year"
          max="2100"
          min="1900"
          type="number"
          bind:value={image.yearTaken}
          class="form-input w-full"
          placeholder="Enter year" />
      </div>
    </div>

    <div class="mt-3">
      <label for="url" class="block text-sm font-medium leading-5 text-gray-700">
        Source URL
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="url"
          type="text"
          bind:value={image.sourceURL}
          class="form-input w-full"
          placeholder="https://..." />
      </div>
    </div>

    <EditVerseIds bind:medium={image} />

    {#if $admin}
      <div class="flex items-center">
        <input
          id="published"
          bind:checked={image.published}
          type="checkbox"
          class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
        <label for="published" class="ml-2 block text-sm leading-5 text-gray-900 cursor-pointer">
          Published
        </label>
      </div>
    {/if}

    <!-- TODO: Make links -->
    {#if image.parents}
      Child of documents: {image.parents.join(', ')}
    {/if}

    <div class="my-4 p-2 bg-gray-200 rounded">
      <div class="text-xs font-semibold mb-2">Editor Notes (will not be published)</div>
      <div class="tw-prose max-w-none">
        <ClassicCustomized
          html={image.editorNotes}
          on:update={({ detail }) => (image.description = detail)} />
      </div>
    </div>
  </form>

  {#if $admin > 1}
    {#await import('svelte-pieces/data/JSON.svelte') then { default: JSON }}
      <JSON obj={image} />
    {/await}
  {/if}
{/if}

<style>
  input:invalid {
    box-shadow: 0 0 0 3px hsl(0deg 98% 82% / 45%);
    border-color: hsl(0deg 98% 82%);
  }
</style>
