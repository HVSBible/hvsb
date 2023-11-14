<script lang="ts">
  import type { IMedia } from '@hvsb/types';
  import { unduplicate } from '$lib/helpers/unduplicate';
  export let medium: IMedia;
  import { page } from '$app/stores';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
</script>

<div class="mt-3 text-gray-700 text-sm">
  {#each medium.verseIds as verseId}
    <span
      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium leading-4 bg-primary-100 text-primary-800 mr-1 mb-1">
      <a
        class="hover:underline"
        href="/{$page.params.version}/{verseId.split('.')[0]}/{verseId.split(
          '.'
        )[1]}/{medium.type === 'image'
          ? 'img'
          : medium.type === 'document'
          ? 'doc'
          : medium.type === 'video'
          ? 'vid'
          : ''}/{medium.id}/edit"
      >{verseId}
      </a>
      {#if medium.verseIds.length > 1}
        <button
          type="button"
          title="Unduplicate"
          on:click={() => (medium = unduplicate(medium, verseId))}
          class="flex justify-center items-center ml-2 rounded-full h-4 w-4 text-primary-500 hover:bg-primary-300 focus:outline-none focus:text-primary-700"
          aria-label="Unduplicate">
          <i class="fas fa-times text-xs" />
        </button>
      {/if}
    </span>
  {/each}

  <ShowHide let:show let:toggle>
    <Button form="simple" onclick={toggle}>
      <i class="fas fa-copy mr-1" />
      Duplicate
    </Button>
    {#if show}
      {#await import('$lib/components/modals/DuplicateMedia.svelte') then { default: DuplicateMedia }}
        <DuplicateMedia bind:media={medium} on:close={toggle} />
      {/await}
    {/if}
  </ShowHide>
</div>
