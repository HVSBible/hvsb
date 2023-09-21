<script lang="ts">
  import { fly } from 'svelte/transition';
  import { expoOut } from 'svelte/easing';

  import { page } from '$app/stores';

  import { bibleBooks } from '$lib/parts';
  import { getChapters } from '$lib/helpers/chapters';

  let currentBookId = $page.params.bookId;

  let chaptersCount = 1;
  getChapters($page.params.version, currentBookId).then((numberOfChapters) => {
    chaptersCount = numberOfChapters;
  });

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<selector
  style="z-index: -1;"
  class="fixed top-0 right-0 left-0 bottom-0 bg-white pt-16 px-3 pb-3 flex"
  in:fly={{ y: -16, duration: 300, easing: expoOut }}
  out:fly={{ y: -16, duration: 150 }}>
  <div class="pt-2 overflow-y-auto flex flex-col md:flex-row">
    <div class="md:w-1/2 mb-6 pr-2 md:pr-6">
      <h2
        class="text-xs mb-3 pl-3 font-semibold text-gray-600 uppercase
          tracking-wide">
        Old Testament
      </h2>
      {#each bibleBooks as book, i}
        {#if i < 39}
          <button
            type="button"
            on:click={async () => {
              currentBookId = book.id;
              chaptersCount = await getChapters($page.params.version, book.id);
            }}
            class="{book.id == currentBookId
              ? 'bg-gray-200 text-gray-900'
              : 'hover:bg-gray-200 text-gray-700'}
              px-3 py-1 flex items-center justify-between text-sm font-medium
              focus:outline-none w-full whitespace-nowrap rounded-lg">
            <span>{book.name}</span>
            <!-- <span
              class="inline-block w-6 text-center py-1 leading-none text-xs
              font-semibold text-gray-700 bg-gray-300 rounded-full">
              3
            </span> -->
          </button>
        {/if}
      {/each}
    </div>
    <div class="md:w-1/2 pr-2 md:pr-6">
      <h2
        class="mb-3 text-xs pl-3 font-semibold text-gray-600 uppercase
          tracking-wide">
        New Testament
      </h2>
      {#each bibleBooks as book, i}
        {#if i > 38}
          <button
            type="button"
            on:click={async () => {
              currentBookId = book.id;
              chaptersCount = await getChapters($page.params.version, book.id);
            }}
            class="{book.id == currentBookId
              ? 'bg-gray-200 text-gray-900'
              : 'hover:bg-gray-200 text-gray-700'}
              px-3 py-1 flex items-center justify-between text-sm font-medium
              focus:outline-none w-full whitespace-nowrap rounded-lg mr-2 md:mr-6">
            <span>{book.name}</span>
          </button>
        {/if}
      {/each}
    </div>
  </div>
  <div class="pt-2 flex-grow overflow-y-auto pl-2">
    <h2
      class="text-xs mb-3 pl-3 font-semibold text-gray-600 uppercase
        tracking-wide">
      Select Chapter
    </h2>
    <div
      class="bg-gray-100 shadow-inner rounded-lg p-2"
      style="display: grid; grid-gap: 5px;grid-template-columns:
        repeat(auto-fit, minmax(50px, 1fr));">
      <a
        href="/{$page.params.version}/{currentBookId}/intro"
        on:click={() => dispatch('close')}

        class="{currentBookId == $page.params.bookId &&
          $page.params.reference == 'intro' &&
          'bg-gray-200'}
          rounded-lg hover:bg-gray-300 items-center justify-center flex p-4"
        style="grid-column: 1 / 3">
        Introduction
      </a>
      {#each { length: chaptersCount } as chapter, i}
        <a
          href="/{$page.params.version}/{currentBookId}/{i + 1}"
          on:click={() => dispatch('close')}

          class="{currentBookId == $page.params.bookId &&
            +$page.params.reference == i + 1 &&
            'bg-gray-200'}
            rounded-lg hover:bg-gray-300 items-center justify-center flex p-4">
          {i + 1}
        </a>
      {/each}
    </div>
  </div>
</selector>

<svelte:head>
  <link type="text/css" rel="stylesheet" href="/minimal-scrollbar.css" />
</svelte:head>
