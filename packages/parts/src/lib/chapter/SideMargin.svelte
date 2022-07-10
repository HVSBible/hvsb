<script lang="ts">
  import { DocumentGenres, type IMedia, type IVerse } from '@hvsb/types';
  import DocGenreThumb from './media/thumbs/DocGenreThumb.svelte';
  import ImageThumb from './media/thumbs/ImageThumb.svelte';
  import { placeMediaIntoVersesArray } from './placeMediaIntoVersesArray';
  import VideoThumb from './media/thumbs/VideoThumb.svelte';
  import {
    setMaxHeightOnMediaBasedOnNextVerseOffsetTop,
    spaceOutVerseMedia,
  } from './media/spaceVerseThumbs';
  import { fetchVideoData } from '../helpers/fetchVideoData';

  export let media: IMedia[],
    verses: IVerse[],
    selected: string = undefined,
    hovered: string = undefined,
    thumbBox: number,
    version: string,
    bookId: string,
    chapter: string;

  function mouseout(verse: IVerse) {
    if (hovered === verse.id) {
      hovered = null;
    }
  }

  $: versesWithMedia = setMaxHeightOnMediaBasedOnNextVerseOffsetTop(
    spaceOutVerseMedia(placeMediaIntoVersesArray(verses, media), thumbBox),
    thumbBox
  );
</script>

<div class="relative" style="--thumbnail-size: calc(var(--thumbnail-box) - 4px);">
  {#each versesWithMedia as verse (verse.id)}
    {@const isSelected = verse.id === selected}
    {@const isHovered = verse.id === hovered}
    {#if verse.media}
      <div
        on:click={() =>
          selected === verse.id
            ? ((selected = null), (hovered = null))
            : (selected = verse.id)}
        on:mouseover={() => (hovered = verse.id)}
        on:focus={() => (hovered = verse.id)}
        on:mouseout={() => mouseout(verse)}
        on:blur={() => mouseout(verse)}
        class:z-1={isSelected}
        class:z-2={isHovered}
        class:!opacity-100={isHovered || isSelected}
        class:!opacity-50={(selected || hovered) && !(isHovered || isSelected)}
        class="absolute flex flex-wrap bg-white opacity-75 overflow-hidden transition-opacity duration-300"
        style="top: {verse.offsetTop}px; {!isSelected && !isHovered && verse.maxRestHeight
          ? `max-height: ${verse.maxRestHeight}px`
          : ''}">
        {#each verse.media as medium}
          {#if medium.type === 'document'}
            <a
              sveltekit:prefetch
              sveltekit:noscroll
              href="/{version}/{bookId}/{chapter}/doc/{medium.id}"
              title="{DocumentGenres[medium.genre]}{medium.title ? ': ' + medium.title : ''}"
              class="w-$thumbnail-size h-$thumbnail-size m-2px rounded overflow-hidden"
              class:shadow-lg={isSelected || isHovered}>
              <DocGenreThumb minimal fillBackground={isSelected || isHovered} genre={medium.genre} />
            </a>
          {:else if medium.type === 'image'}
            <a
              sveltekit:prefetch
              sveltekit:noscroll
              href="/{version}/{bookId}/{chapter}/img/{medium.id}"
              title={medium.title}
              class="w-$thumbnail-size h-$thumbnail-size m-2px rounded overflow-hidden"
              class:shadow-lg={isSelected || isHovered}>
              <ImageThumb gcs={medium.gcs} size={thumbBox - 4} />
            </a>
          {:else if medium.type === 'video'}
            <a
              sveltekit:prefetch
              sveltekit:noscroll
              href="/{version}/{bookId}/{chapter}/vid/{medium.id}"
              title={medium.title}
              class="w-$thumbnail-size h-$thumbnail-size lg:w-[calc(var(--thumbnail-box)*2-4px)] xl:w-[calc(var(--thumbnail-box)*3-4px)] m-2px rounded overflow-hidden -order-1"
              class:shadow-lg={isSelected || isHovered}>
              {#await fetchVideoData(medium.id)}
                <VideoThumb />
              {:then data}
                <VideoThumb src={data.pictures.sizes[4].link.replace('?r=pad', '')} />
              {/await}
            </a>
          {/if}
        {/each}
      </div>
    {/if}
  {/each}
</div>
