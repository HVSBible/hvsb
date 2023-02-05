<script lang="ts">
  export let bookId: string, chapter: string;
  import { bookAbbrev, bookName } from '$lib/parts';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
</script>

<ShowHide let:show let:toggle let:set>
  <div class="flex items-center lg:px-1">
    {#if !show}
      <a class="p-3 hover:text-black hover:bg-gray-200 rounded mr-1 flex print:hidden" href="/">
        <span class="i-fa-solid-home text-lg" />
      </a>
    {:else}
      <button
        on:click={() => set(false)}
        type="button"
        class="p-3 hover:text-black hover:bg-gray-200 rounded mr-1 flex">
        <span class="i-fa-solid-times mx-1px" />
      </button>
    {/if}

    <slot name="previous" />

    <button
      on:click={toggle}
      type="button"
      class="font-semibold sm:text-lg py-2 px-3 hover:bg-gray-200
      rounded">
      <span class="hidden sm:inline">{bookName(bookId)}</span>
      <span class="sm:hidden">{bookAbbrev(bookId)}</span>
      <span>{chapter}</span>
      {#if show}
        <span class="i-fa-caret-up text-sm mb-1" />
      {:else}
        <span class="i-fa-caret-down text-sm mb-1" />
      {/if}
    </button>

    <slot name="next" />
  </div>

  {#if show}
    {#await import('$lib/components/navigation/ChapterSelector.svelte') then { default: ChapterSelector }}
      <ChapterSelector on:close={toggle} />
    {/await}
  {/if}
</ShowHide>
