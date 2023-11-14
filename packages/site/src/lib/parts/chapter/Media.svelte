<script lang="ts">
  import { fetchVideoData } from '../helpers/fetchVideoData';
  import type { IMedia, IVerse } from '@hvsb/types';
  export let verses: IVerse[], media: IMedia[], version: string, bookId: string, chapter: number;

  function placeAfterVerse(mediaEl: HTMLElement, currentVerseNumber: number) {
    const verse = verses.find((verse) => verse.number == currentVerseNumber);
    if (verse)
      verse.element.after(mediaEl);

    return {
      destroy() {
        mediaEl?.parentElement?.removeChild(mediaEl);
      },
    };
  }

  function placeAfterParagraph(mediaEl: HTMLElement, currentVerseNumber: number) {
    const verse = verses.find((verse) => verse.number == currentVerseNumber);
    if (verse)
      verse.element.closest('p').after(mediaEl);

    return {
      destroy() {
        mediaEl?.parentElement?.removeChild(mediaEl);
      },
    };
  }
</script>

{#each media as medium (medium.id)}
  {#each medium.currentVerses as currentVerseNumber}
    {#if medium.type === 'image'}
      <a
        use:placeAfterVerse={currentVerseNumber}

        data-sveltekit-noscroll
        href="/{version}/{bookId}/{chapter}/img/{medium.id}"
        class="inline-flex"
        style="vertical-align: text-bottom;">
        <img
          alt=""
          class="cursor-pointer bg-gray-400 rounded mr-1 align-baseline
            md:opacity-50 transition-opacity duration-200 hover:opacity-100 h-5 w-5"
          src="https://lh3.googleusercontent.com/{medium.gcs}=s40-p" />
      </a>
    {:else if medium.type === 'document'}
      <a
        use:placeAfterVerse={currentVerseNumber}

        data-sveltekit-noscroll
        href="/{version}/{bookId}/{chapter}/doc/{medium.id}"
        class="text-teal-900 mr-1 opacity-50 transition-opacity duration-200 hover:opacity-100">
        <span class="i-ic-round-bookmarks" />
        <!-- title="${genre}: ${medium.title}" -->
      </a>
    {:else if medium.type === 'video'}
      <!-- TODO: place video first -->
      <a
        use:placeAfterParagraph={currentVerseNumber}

        data-sveltekit-noscroll
        href="/{version}/{bookId}/{chapter}/vid/{medium.id}"
        class="block h-20 relative overflow-hidden md:opacity-75 transition-opacity
          duration-200 hover:opacity-100 rounded my-2 bg-black"
        title="Video">
        {#await fetchVideoData(medium.id)}
          <i class="fas fa-play text-white absolute left-2 top-3" />
        {:then data}
          <img
            alt=""
            class="h-full w-full object-cover"
            style="object-position: 0 33%;"
            src={data.pictures.sizes[3].link.replace('?r=pad', '')} />
          <div class="absolute left-2 top-2 text-white text-shadow">
            <i class="fas fa-play mr-1" />
            {data.name.replace(/\([^()]*\)$/, '')}
            <!-- pull out title final verse references found in parenthesis -->
          </div>
        {/await}
      </a>
    {/if}
  {/each}
{/each}
