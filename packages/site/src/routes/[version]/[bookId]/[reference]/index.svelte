<script lang="ts">
  import { page } from '$app/stores';
  import { admin, contributor } from '$lib/stores';
  import { deleteVideo } from '$lib/helpers/video';
  import { assignParentDocumentToImage } from '$lib/helpers/assignParentDocumentToImage';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { PreviewVideo, PreviewImage, PreviewDocument } from '@hvsb/parts';
  import { flip } from 'svelte/animate';

  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { IMedia } from '@hvsb/types';
  const chapterMedia = getContext<Writable<IMedia[]>>('chapterMedia');
  import type { QueryParamStore } from 'svelte-pieces/stores/queryParam';
  const selected = getContext<QueryParamStore<string>>('selected');

  $: sortedChapterMedia = (() => {
    if (!$chapterMedia) return [];
    if (!$selected) return $chapterMedia;
    const media = $chapterMedia.map((m) => {
      return {
        ...m,
        selected: m.currentVerses.includes(+$selected.split('.').pop()),
      };
    });
    return media.sort((a, b) => {
      return a.selected === b.selected ? 0 : a.selected ? -1 : 1;
    });
  })();
</script>

<div class="hidden md:block px-3">
  {#if $selected}
    <div class="mb-3 flex items-center">
      <Button form="simple" color="black" onclick={() => selected.remove()}>
        <!-- <i class="i-fa-solid-times mb-2px" /> -->
        <i class="i-fa-solid-arrow-left mb-2px" />
      </Button>
      <div class="font-semibold text-lg ml-1">
        Verse {$selected.split('.').pop()}
      </div>
    </div>
    {#if $admin || $contributor}
      {#await import('./_verse/EditVerse.svelte') then { default: EditVerse }}
        <EditVerse verseId={$selected} />
      {/await}
    {/if}
  {/if}

  {#each sortedChapterMedia as medium (medium.id)}
    <div
      class="mb-2"
      class:selected={medium.selected}
      class:opacity-60={$selected && !medium.selected}
      animate:flip={{ duration: 200 }}>
      {#if medium.type === 'document'}
        <PreviewDocument
          document={medium}
          href={`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${medium.id}`} />
      {/if}
      {#if medium.type === 'image'}
        <PreviewImage
          image={medium}
          admin={$admin}
          on:assignParent={(e) =>
            assignParentDocumentToImage(e.detail.documentId, e.detail.imageId)}
          href={`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/img/${medium.id}`} />
      {/if}
      {#if medium.type === 'video'}
        <PreviewVideo
          video={medium}
          admin={$admin}
          on:deleteVideo={(e) => deleteVideo(e.detail)}
          href={`/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/vid/${medium.id}`} />
      {/if}
    </div>
  {/each}
</div>

<style>
  .selected {
    @apply shadow-lg bg-white relative z-1;
  }
</style>
