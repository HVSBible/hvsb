<script lang="ts">
  import { Story } from 'kitbook';
  import PlaceIntoDocument from './PlaceIntoDocument.svelte';

  import type { IMedia } from '@hvsb/types';
  import { setContext } from 'svelte';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { writable } from 'svelte/store';
  const chapterMedia = writable<Partial<IMedia>[]>([
    { type: 'document', id: 'docIdsomething', title: 'The Tombs' },
    { type: 'document', id: 'docIdsomething2', title: 'The Catacombs' },
  ]);
  setContext('chapterMedia', chapterMedia);
</script>

<Story>
  <ShowHide let:show={hide} let:toggle>
    {#if hide}
      <Button onclick={toggle}>Show Again</Button>
    {:else}
      <PlaceIntoDocument
        imageId="fakeImageId"
        on:close={toggle}
        on:assignParent={(e) =>
          alert(
            `Make documentId of ${e.detail.documentId} a parent of imageId of ${e.detail.imageId}`
          )} />
    {/if}
  </ShowHide>
</Story>
