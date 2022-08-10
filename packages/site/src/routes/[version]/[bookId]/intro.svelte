<script context="module" lang="ts">
  import { getDocument, setOnline } from 'sveltefirets';
  import type { IIntro } from '@hvsb/types';

  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    const version = params.version;
    const bookId = params.bookId;
    const intro = await getDocument<IIntro>(`intros/${bookId}`);

    return {
      props: {
        version,
        bookId,
        intro,
      },
    };
  };
</script>

<script lang="ts">
  import Header from '$lib/components/shell/Header.svelte';
  import ChapterTitle from '$lib/components/navigation/ChapterTitle.svelte';
  import View from '$lib/components/ui/View.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { admin } from '$lib/stores';
  import { bookName } from '@hvsb/parts';
  import ParsedParagraph from '$lib/components/content/ParsedParagraph.svelte';
  export let version = 'WEB',
    bookId: string,
    intro: IIntro;
  let editing = false;

  import { page } from '$app/stores';
  async function save() {
    try {
      await setOnline(`intros/${bookId}`, intro);
      window.location.replace(`/${$page.params.version}/${$page.params.bookId}/intro`);
    } catch (err) {
      alert(err);
    }
  }
</script>

<Header>
  <ChapterTitle {bookId} chapter="Intro" />
</Header>

<View marginTop={true}>
  <div class="px-5 pb-16 w-full flex flex-col items-center">
    <div class="flex">
      <h2 class="hidden md:block mb-3 tw-prose text-3xl font-semibold">
        Introduction to {bookName(bookId)}
      </h2>
      {#if $admin}
        {#if editing}
          <Button class="ml-2" onclick={() => (editing = false)}>Cancel</Button>
          <Button class="ml-2" form="filled" onclick={save}>Save</Button>
        {:else}
          <Button class="ml-2" form="simple" onclick={() => (editing = true)}>Edit</Button>
        {/if}
      {/if}
    </div>

    <a
      class="next-ch-btn p-3 rounded-full bg-white hover:bg-gray-200 border
      border-solid border-gray-400 shadow-lg fixed"
      style="right: 12px;"
      sveltekit:prefetch
      href="/{version}/{bookId}/1">
      <i class="fas fa-chevron-right text-center" style="width: 1rem;" />
    </a>

    <div class="flex">
      {#if editing}
        <div class="max-w-screen-md tw-prose prose-lg">
          {#await import('$lib/components/editor/ClassicCustomized.svelte') then { default: ClassicCustomized }}
            <ClassicCustomized
              html={intro?.text || ''}
              on:update={(e) => {
                console.log(e.detail);
                intro = { text: e.detail };
              }} />
          {/await}
        </div>
      {/if}
      <div class="tw-prose prose-lg max-w-screen-md {editing && 'hidden md:block mt-14 ml-3'}">
        {#if intro?.text}
          <ParsedParagraph value={intro.text} />
        {:else if !$admin}
          To be written...
        {/if}
      </div>
    </div>
  </div>
</View>

<style>
  .next-ch-btn {
    bottom: 0.75rem;
    line-height: 1;
  }

  @media only screen and (min-width: 1024px) {
    .next-ch-btn {
      bottom: 51%;
    }
  }

  :global(figure) {
    margin: 0;
  }
</style>
