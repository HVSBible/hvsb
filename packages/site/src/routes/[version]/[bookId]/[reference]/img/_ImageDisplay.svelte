<script lang="ts">
  import type { IImage } from '@hvsb/types';
  export let image: IImage;
  import { page } from '$app/stores';
  import { getCurrentVerses } from '$lib/helpers/media';
  import { bookAbbrev } from '$lib/parts';

  function printCurrentVerses() {
    let versesString = '';
    const currentVerses = getCurrentVerses(
      image.verseIds,
      $page.params.bookId,
      $page.params.reference
    );

    currentVerses.forEach((v, i) => {
      if (i == 0) {
        versesString = versesString.concat(
          bookAbbrev($page.params.bookId),
          ' ',
          $page.params.reference,
          ':'
        );
      }
      versesString = versesString.concat(v.toString());
      if (i != currentVerses.length - 1) {
        versesString = versesString.concat(', ');
      }
    });
    return versesString;
  }
</script>

<div
  class="bg-black relative text-white text-sm font-medium md:rounded-lg
    overflow-hidden text-shadow">
  <a href="https://lh3.googleusercontent.com/{image.gcs}=s0" target="_blank" class="pointer">
    <img
      alt={image.title || ''}
      class="w-full"
      style="max-height: 80vh; object-position: center; object-fit: contain;"
      src="https://lh3.googleusercontent.com/{image.gcs}=s1200" />
  </a>

  <div class="img-verses absolute pt-2 px-2 top-0 left-0">
    {printCurrentVerses()}
  </div>
  {#if image.location}
    <div class="img-location absolute pt-2 pr-2 top-0 right-0">
      {#each image.location as location, i}
        {location}
        {#if i != image.location.length - 1},{/if}
      {/each}
    </div>
  {/if}
  <div class="img-credit absolute pb-2 pr-2 bottom-0 right-0">
    Credit: ©
    {#if image.yearTaken}{image.yearTaken}{/if}
    {#if image.credit}
      {image.credit.join(', ')}
    {:else}
      <i>Hershel Wayne House</i>
    {/if}
  </div>
</div>

<style>
  .text-shadow {
    text-shadow: -1px -1px 0 hsl(0, 0%, 33%), 1px -1px 0 hsl(0, 0%, 33%), -1px 1px 0 hsl(0, 0%, 33%),
      1px 1px 0 hsl(0, 0%, 33%);
  }
</style>
