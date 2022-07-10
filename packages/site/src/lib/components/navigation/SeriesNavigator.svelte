<script lang="ts">
  import { Doc } from 'sveltefirets';
  import type { IDocument, ISeries } from '@hvsb/types';
  export let seriesId: string, document: IDocument;
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  let seriesType: ISeries;
  let documentType: IDocument;
  let currentIndex = -1;

  function setCurrentIndex(mediaIds: string[]) {
    currentIndex = mediaIds.findIndex((mediaId) => mediaId === document.id);
  }
</script>

{#key document.id}
  <Doc
    path={`series/${seriesId}`}
    startWith={seriesType}
    let:data={series}
    on:data={(e) => setCurrentIndex(e.detail.data.mediaIds)}>
    {#if series && currentIndex > -1}
      <div class="p-2 my-2 border-t border-gray-300">
        <p class="text-center mb-2">
          <span class="font-semibold">{series.title} Series</span>
          <small class="text-gray-500">({currentIndex + 1} of {series.mediaIds.length})</small>
        </p>

        <div class="flex space-x-3 items-center mt-1">
          {#if currentIndex !== 0}
            <Doc
              path={`media/${series.mediaIds[currentIndex - 1]}`}
              let:data={medium}
              startWith={documentType}>
              <a
                href={`/${$page.params.version}/${medium.chapterIds[0].split('.')[0]}/${
                  medium.chapterIds[0].split('.')[1]
                }/doc/${medium.id}`}
                class="hover:underline text-gray-800 text-sm font-semibold whitespace-nowrap">
                <i class="fas fa-arrow-left mr-1" />Prev
              </a>
            </Doc>
          {/if}

          <!-- svelte-ignore a11y-no-onchange -->
          <select
            on:change={(e) => {
              //@ts-ignore
              goto(e.target.value);
            }}
            class="block cursor-pointer pl-3 pr-9 py-1 border-transparent focus:outline-none ring-primary-500 hover:border-primary-100 focus:border-primary-500 hover:bg-transparent bg-gray-100 text-sm rounded-md w-full text-ellipsis">
            {#each series.mediaIds as mediaId}
              <Doc path={`media/${mediaId}`} let:data={medium} startWith={documentType}>
                <option
                  value={`/${$page.params.version}/${medium.chapterIds[0].split('.')[0]}/${
                    medium.chapterIds[0].split('.')[1]
                  }/doc/${medium.id}`}
                  class:font-bold={mediaId === document.id}
                  selected={mediaId === document.id}>{medium.title}</option>
              </Doc>
            {/each}
            <option disabled>The rest of Passion Week will be posted soon... </option>
          </select>

          {#if currentIndex !== series.mediaIds.length - 1}
            <Doc
              path={`media/${series.mediaIds[currentIndex + 1]}`}
              let:data={medium}
              startWith={documentType}>
              <a
                href={`/${$page.params.version}/${medium.chapterIds[0].split('.')[0]}/${
                  medium.chapterIds[0].split('.')[1]
                }/doc/${medium.id}`}
                class="hover:underline text-gray-800 text-sm font-semibold whitespace-nowrap">
                Next<i class="fas fa-arrow-right ml-1" />
              </a>
            </Doc>
          {/if}
        </div>
      </div>
    {/if}
  </Doc>
{/key}
