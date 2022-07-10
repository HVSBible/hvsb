<script lang="ts">
  export let verseId: string; // MAT.3.1
  $: verseNumber = verseId ? +verseId.split('.').pop() : 1;

  import Button from 'svelte-pieces/ui/Button.svelte';
  import { admin } from '$lib/stores';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import type { IDocument } from '@hvsb/types';
  import { addOnline } from 'sveltefirets';
  import ReceiveImage from './ReceiveImage.svelte';
  import AddVideo from './AddVideo.svelte';
  async function createDocument() {
    try {
      const document: IDocument = {
        bookIds: [$page.params.bookId],
        chapterIds: [`${$page.params.bookId}.${$page.params.reference}`],
        verseIds: [verseId],
        title: '',
        authors: ['Hershel Wayne House'],
        genre: 'topical',
        type: 'document',
        sections: [
          {
            contentType: 'text',
            text: '',
          },
        ],
      };
      const { id } = await addOnline<IDocument>('media', document);
      goto(
        `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${id}/edit`
      );
    } catch (err) {
      alert(`Error creating document: ${err}`);
    }
  }
</script>

<div class="mb-5">
  <div class="flex flex-wrap">
    <Button class="mb-1 mr-1" onclick={createDocument}>Add Document</Button>
    {#if $admin}
      <AddVideo {verseNumber} />
    {/if}
  </div>

  {#if $admin}
    <ReceiveImage {verseNumber} />
  {/if}
  <!-- {#if $admin > 1}
    <Button
      class="mb-2"
      href="/{$page.params.version}/{$page.params.bookId}/{$page.params.reference}/{$page.params
        .verse}/study">
      Study
    </Button>
  {/if} -->
</div>
