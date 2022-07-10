<script lang="ts">
  import type { IMedia } from '@hvsb/types';
  export let media: IMedia;
  import Modal from 'svelte-pieces/ui/Modal.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { bibleBooks } from '@hvsb/parts';
  import { getChapters, getNumberOfVerses } from '$lib/helpers/chapters';

  import { page } from '$app/stores';

  import { createEventDispatcher } from 'svelte';
  let bookId = 'GEN';
  let chapter = 1;
  let verse = 1;

  let chaptersCount = 1;
  let versesCount = 1;

  $: {
    getChapters($page.params.version, bookId).then((numberOfChapters) => {
      chaptersCount = numberOfChapters;
    });
  }

  $: {
    getNumberOfVerses($page.params.version, `${bookId}.${chapter}`).then((numberOfVerses) => {
      versesCount = numberOfVerses;
    });
  }

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  async function duplicate() {
    const chapterId = `${bookId}.${chapter}`;
    const verseId = `${bookId}.${chapter}.${verse}`;
    media.bookIds.indexOf(bookId) === -1 && media.bookIds.push(bookId);
    media.chapterIds.indexOf(chapterId) === -1 && media.chapterIds.push(chapterId);
    media.verseIds.indexOf(verseId) === -1 && media.verseIds.push(verseId);
    media = media;
    close();
  }
</script>

<form on:submit|preventDefault={close}>
  <Modal on:close>
    <span slot="heading">Duplicate to</span>

    <div class="flex mb-3">
      <select
        bind:value={bookId}
        class="mt-2 rounded-md block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:ring-primary-300 focus:border-primary-300 sm:text-sm sm:leading-5 mr-1">
        {#each bibleBooks as book, i}
          <option value={book.id}>{book.name}</option>
        {/each}
      </select>

      <select
        style="width: 90px;"
        bind:value={chapter}
        class="mt-2 rounded-md block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:ring-primary-300 focus:border-primary-300 sm:text-sm sm:leading-5 mr-1">
        {#each { length: chaptersCount } as chapter, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>

      <select
        style="width: 90px;"
        bind:value={verse}
        class="mt-2 rounded-md block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:ring-primary-300 focus:border-primary-300 sm:text-sm sm:leading-5">
        {#each { length: versesCount } as verses, i}
          <option value={i + 1}>{i + 1}</option>
        {/each}
      </select>
    </div>

    <Button form="filled" onclick={duplicate}>Duplicate</Button>
    <Button form="simple" onclick={close}>Cancel</Button>
  </Modal>
</form>
