<script lang="ts">
  import { DocumentGenres, type DocumentGenre } from '@hvsb/types';
  export let genre: DocumentGenre;
  export let minimal = false;
  export let fillBackground = false;
  export let paddingPercent = 20;
</script>

<div
  style="padding: {minimal ? `${paddingPercent}%` : '12%'};"
  class="h-full w-full flex flex-col items-center justify-center"
  class:bg-gray-900={!DocumentGenres[genre]}
  class:text-gray-900={!DocumentGenres[genre]}
  class:bg-indigo-900={genre === 'note'}
  class:text-indigo-900={genre === 'note'}
  class:bg-teal-900={genre === 'word'}
  class:text-teal-900={genre === 'word'}
  class:bg-blue-800={genre === 'passage'}
  class:text-blue-800={genre === 'passage'}
  class:bg-teal-700={genre === 'topical'}
  class:text-teal-700={genre === 'topical'}
  class:bg-amber-900={genre === 'artifact'}
  class:text-amber-900={genre === 'artifact'}
  class:bg-orange-800={genre === 'site'}
  class:text-orange-800={genre === 'site'}
  class:bg-gray-800={genre === 'biography'}
  class:text-gray-800={genre === 'biography'}
  class:bg-pink-900={genre === 'textual'}
  class:text-pink-900={genre === 'textual'}
  class:bg-orange-700={genre === 'ancient_literature'}
  class:text-orange-700={genre === 'ancient_literature'}
  class:bg-red-900={genre === 'chart'}
  class:text-red-900={genre === 'chart'}
  class:bg-blue-900={genre === 'timeline'}
  class:text-blue-900={genre === 'timeline'}
  class:bg-red-600={genre === 'apologetics'}
  class:text-red-600={genre === 'apologetics'}
  class:bg-cyan-700={genre === 'culture'}
  class:text-cyan-700={genre === 'culture'}
  class:bg-purple-800={genre === 'application'}
  class:text-purple-800={genre === 'application'}
  class:bg-rose-700={genre === 'exegetical'}
  class:text-rose-700={genre === 'exegetical'}
  class:bg-green-800={genre === 'doctrine'}
  class:text-green-800={genre === 'doctrine'}
  class:bg-rose-900={genre === 'reflection'}
  class:text-rose-900={genre === 'reflection'}
  class:bg-gray-700={genre === 'fathers'}
  class:text-gray-700={genre === 'fathers'}
  class:bg-purple-900={genre === 'wisdom'}
  class:text-purple-900={genre === 'wisdom'}
  class:!bg-transparent={!fillBackground}
  class:!text-white={fillBackground}>
  {#if genre === 'note'}
    <span class="i-ph-note-light" />
  {:else if genre === 'topical'}
    <span class="i-clarity-hashtag-solid" />
  {:else if genre === 'word'}
    <span class="i-ic-round-search" />
  {:else if genre === 'passage'}
    <span class="i-fa-solid-scroll" />
  {:else if genre === 'artifact'}
    <span class="i-fa-solid-monument" />
  {:else if genre === 'site'}
    <span class="i-fa-solid-archway" />
  {:else if genre === 'biography'}
    <span class="i-fa-solid-user" />
  {:else if genre === 'textual'}
    <span class="i-fa-solid-question-circle" />
  {:else if genre === 'ancient_literature'}
    <span class="i-carbon-stacked-scrolling-1" />
    <!-- i-simple-icons-scrollreveal -->
  {:else if genre === 'chart'}
    <span class="i-fa-table" />
  {:else if genre === 'timeline'}
    <span class="i-fa-solid-stream" />
  {:else if genre === 'apologetics'}
    <span class="i-fa-regular-comments" />
  {:else if genre === 'culture'}
    <span class="i-mdi-food-variant" />
  {:else if genre === 'application'}
    <span class="i-carbon-worship" />
  {:else if genre === 'exegetical'}
    <span class="i-fa-solid-brain" />
  {:else if genre === 'doctrine'}
    <span class="i-fa-solid-road" />
  {:else if genre === 'reflection'}
    <span class="i-ic-baseline-format-list-numbered" />
  {:else if genre === 'fathers'}
    <span class="i-fluent-chart-person-20-regular" />
  {:else if genre === 'wisdom'}
    <span class="i-mdi-crown" />
  {:else}
    <span class="i-ic-round-search" />
  {/if}
  {#if !minimal && DocumentGenres[genre]}
    <div class="text-xs text-center" style="padding-top: 5%">
      {DocumentGenres[genre]}
    </div>
  {/if}
</div>

<style>
  span {
    @apply h-full w-full !important;
  }
</style>
