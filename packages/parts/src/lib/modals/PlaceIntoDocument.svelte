<script lang="ts">
  export let imageId: string;
  import Modal from 'svelte-pieces/ui/Modal.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    close: boolean;
    assignParent: { documentId: string; imageId: string };
  }>();

  let documentId: string;

  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import type { IMedia } from '@hvsb/types';
  const chapterMedia = getContext<Writable<IMedia[]>>('chapterMedia');
</script>

<Modal on:close>
  <span slot="heading">Place Image Into</span>

  <select
    bind:value={documentId}
    class="my-2 rounded-md block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:ring-primary-300 focus:border-primary-300 sm:text-sm sm:leading-5 mr-1">
    {#each $chapterMedia as medium}
      {#if medium.type === 'document'}
        <option value={medium.id}>{medium.title}</option>
      {/if}
    {/each}
  </select>

  <Button
    form="filled"
    onclick={() => {
      dispatch('assignParent', { documentId, imageId });
      dispatch('close');
    }}>Place</Button>
  <Button form="simple" onclick={() => dispatch('close')}>Cancel</Button>
</Modal>
