<script lang="ts">
  import type { IMedia } from '@hvsb/types';
  import SideMargin from './SideMargin.svelte';
  import Text from './Text.svelte';

  export let contentHtml: string,
    media: IMedia[],
    thumbBox = 44,
    version: string,
    bookId: string,
    chapter: string;

  import { getContext } from 'svelte';
  import type { QueryParamStore } from 'svelte-pieces/stores/queryParam';
  const selected = getContext<QueryParamStore<string>>('selected');

  let hovered: string = undefined;
</script>

<div class="flex">
  <Text {contentHtml} let:verses bind:selected={$selected} bind:hovered>
    <div
      class="w-$thumbnail-box lg:w-[calc(var(--thumbnail-box)*2)] xl:w-[calc(var(--thumbnail-box)*3)] flex-shrink-0 ml-2 relative -mt-16"
      style="--thumbnail-box: {thumbBox}px;">
      <SideMargin
        {thumbBox}
        {media}
        {verses}
        {version}
        {bookId}
        {chapter}
        bind:selected={$selected}
        bind:hovered />
    </div>
  </Text>
</div>
