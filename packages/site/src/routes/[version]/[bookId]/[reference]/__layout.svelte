<script context="module" lang="ts">
  import { prepareChapterMedia, fetchBibleText, getChapterMedia } from '$lib/helpers/media';
  import type { IReferenceProps } from './_reference-props.interface';

  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    const version: string = params.version;
    const bookId: string = params.bookId;
    const chapter: string = params.reference.match(/[0-9]*/)[0]; // return '12' in a '12.3-13.1' string

    let props: IReferenceProps = {
      version,
      bookId,
      chapter, // verse: page.params.reference[1],
    };

    const mediaPromise = getChapterMedia(bookId, chapter).catch((err) => (props.mediaErr = err));
    const textDataPromise = fetchBibleText(version, bookId, chapter).catch(
      (err) => (props.textErr = err)
    );

    const [media, textData] = await Promise.all([mediaPromise, textDataPromise]);

    if (!props.textErr) {
      if (textData) {
        const { content, next, previous } = textData;
        props.content = content;
        props.previousChapterId = (previous && previous.id) || null;
        props.nextChapterId = (next && next.id) || null;
      } else {
        props.textErr = 'No content for selected version, book, and chapter.';
      }
    }

    if (!props.mediaErr) {
      props.media = prepareChapterMedia(media, bookId, chapter);
    }

    return {
      props,
    };
  };
</script>

<script lang="ts">
  import { browser } from '$app/env';
  import ChapterTitle from '$lib/components/navigation/ChapterTitle.svelte';
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
  import { Chapter } from '@hvsb/parts';
  import type { IMedia } from '@hvsb/types';

  export let version: string,
    bookId: string,
    chapter: string,
    previousChapterId: string,
    nextChapterId: string,
    content,
    media: IMedia[],
    textErr,
    mediaErr;

  $: {
    if (browser) {
      localStorage.setItem('currentVersion', version);
      localStorage.setItem('currentBook', bookId);
      localStorage.setItem('currentChapter', chapter);
    }
  }

  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  const chapterMedia = writable<IMedia[]>([]);
  setContext('chapterMedia', chapterMedia);
  $: chapterMedia.set(media);

  let scriptureDiv: HTMLElement;
  $: if (version && bookId && chapter && scriptureDiv) {
    scriptureDiv.scrollTop = 0;
  }
  let mediaDiv: HTMLElement;
  $: if (media && mediaDiv) {
    mediaDiv.scrollTop = 0;
  }

  // TODO: Keep media id in url when navigating chapters with opened media item
  $: previousUrl = (previousChapterId && previousChapterId.replace(/\./g, '/')) || null;
  $: nextUrl = (nextChapterId && nextChapterId.replace(/\./g, '/')) || null;

  let fullWidth = 800;
  import { page } from '$app/stores';
  $: subpageOpen = $page.params && Object.keys($page.params).length > 3;

  import { createQueryParamStore } from 'svelte-pieces/stores/queryParam';
  const selected = createQueryParamStore<number>({ key: 'vv', replaceState: true });
  setContext('selected', selected);
</script>

<Header>
  <ChapterTitle {bookId} {chapter} />
</Header>

<View>
  <div class="flex md:h-screen" bind:clientWidth={fullWidth}>
    <div bind:this={scriptureDiv} class="px-3 w-full md:w-1/2 md:h-full relative">
      <div
        class="scripture md:px-2 lg:px-4 md:h-full md:overflow-y-auto pt-16 pb-70vh md:pb-50vh">
        {#if textErr}
          <p class="mb-3">
            <i>{textErr}</i>
          </p>
          <p class="text-sm">
            We're having trouble getting the chapter text at the moment. Please reload and use the
            "Contact Us" button in the upper right if the problem persists.
          </p>
        {:else}
          <Chapter contentHtml={content} {media} {version} {bookId} {chapter} />
        {/if}

        {#await import('$lib/components/navigation/VersionSelector.svelte') then { default: VersionSelector }}
          <VersionSelector {version} {bookId} {chapter} />
        {/await}
      </div>

      {#if previousUrl}
        <a
          class="bottom-3 md:bottom-1/2 left-2 leading-4 p-3 rounded-full bg-white hover:bg-gray-200 border
            border-solid border-gray-400 shadow-lg fixed md:absolute print:hidden w-11 text-center"
          sveltekit:prefetch
          href="/{version}/{previousUrl}">
          <span class="i-fa-solid-chevron-left" />
        </a>
      {/if}

      {#if nextUrl}
        <a
          class="bottom-3 md:bottom-1/2 right-2 leading-4 p-3 rounded-full bg-white hover:bg-gray-200 border
            border-solid border-gray-400 shadow-lg fixed md:absolute print:hidden w-11 text-center"
          sveltekit:prefetch
          href="/{version}/{nextUrl}">
          <span class="i-fa-solid-chevron-right" />
        </a>
      {/if}
    </div>

    <div
      bind:this={mediaDiv}
      class="md:px-2 lg:px-4 md:pt-16 md:pb-16 w-full md:w-1/2 overflow-y-auto
        md:h-full fixed md:relative md:z-auto z-30 bottom-0 md:bottom-auto
        max-h-full !md:shadow-none bg-white"
      style="box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.35);">
      {#if mediaErr}
        {mediaErr}
      {:else if subpageOpen || fullWidth > 767}
        <slot />
      {/if}
    </div>
  </div>
</View>

<svelte:head>
  <link type="text/css" rel="stylesheet" href="/minimal-scrollbar.css" />
</svelte:head>
