<script lang="ts">
  import { browser } from '$app/environment';
  import ChapterTitle from '$lib/components/navigation/ChapterTitle.svelte';
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
  import { Chapter } from '$lib/parts';
  import type { IMedia } from '@hvsb/types';
  import type { LayoutData } from './$types';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { createQueryParamStore } from 'svelte-pieces/stores/queryParam';
  import { page } from '$app/stores';

  export let data: LayoutData;

  $: if (browser) {
    localStorage.setItem('currentVersion', data.version);
    localStorage.setItem('currentBook', data.bookId);
    localStorage.setItem('currentChapter', data.chapter);
  }

  const chapterMedia = writable<IMedia[]>([]);
  setContext('chapterMedia', chapterMedia);
  $: chapterMedia.set(data.media);

  let scriptureDiv: HTMLElement;
  $: if (data.version && data.bookId && data.chapter && scriptureDiv) {
    scriptureDiv.scrollTop = 0;
  }
  let mediaDiv: HTMLElement;
  $: if (data.media && mediaDiv) {
    mediaDiv.scrollTop = 0;
  }

  // TODO: Keep media id in url when navigating chapters with opened media item
  $: previousUrl = (data.previousChapterId && data.previousChapterId.replace(/\./g, '/')) || null;
  $: nextUrl = (data.nextChapterId && data.nextChapterId.replace(/\./g, '/')) || null;

  let fullWidth = 800;
  $: subpageOpen = $page.params && Object.keys($page.params).length > 3;

  const selected = createQueryParamStore<number>({ key: 'vv', replaceState: true });
  setContext('selected', selected);
</script>

<Header>
  <ChapterTitle bookId={data.bookId} chapter={data.chapter} />
</Header>

<View>
  <div class="flex md:h-screen" bind:clientWidth={fullWidth}>
    <div bind:this={scriptureDiv} class="px-3 w-full md:w-1/2 md:h-full relative">
      <div class="scripture md:px-2 lg:px-4 md:h-full md:overflow-y-auto pt-16 pb-70vh md:pb-50vh">
        {#if data.textErr}
          <p class="mb-3">
            <i>{data.textErr}</i>
          </p>
          <p class="text-sm">
            We're having trouble getting the chapter text at the moment. Please reload and use the
            "Contact Us" button in the upper right if the problem persists.
          </p>
        {:else}
          <Chapter contentHtml={data.content} media={data.media} version={data.version} bookId={data.bookId} chapter={data.chapter} />
        {/if}

        {#await import('$lib/components/navigation/VersionSelector.svelte') then { default: VersionSelector }}
          <VersionSelector version={data.version} bookId={data.bookId} chapter={data.chapter} />
        {/await}
      </div>

      {#if previousUrl}
        <a
          class="bottom-3 md:bottom-1/2 left-2 leading-4 p-3 rounded-full bg-white hover:bg-gray-200 border
            border-solid border-gray-400 shadow-lg fixed md:absolute print:hidden w-11 text-center"
          href="/{data.version}/{previousUrl}">
          <span class="i-fa-solid-chevron-left" />
        </a>
      {/if}

      {#if nextUrl}
        <a
          class="bottom-3 md:bottom-1/2 right-2 leading-4 p-3 rounded-full bg-white hover:bg-gray-200 border
            border-solid border-gray-400 shadow-lg fixed md:absolute print:hidden w-11 text-center"
          href="/{data.version}/{nextUrl}">
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
      {#if data.mediaErr}
        {data.mediaErr}
      {:else if subpageOpen || fullWidth > 767}
        <slot />
      {/if}
    </div>
  </div>
</View>

<svelte:head>
  <link type="text/css" rel="stylesheet" href="/minimal-scrollbar.css" />
</svelte:head>
