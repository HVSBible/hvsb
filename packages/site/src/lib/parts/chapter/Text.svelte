<script lang="ts">
  import './scripture-hvsb.css';
  import { createEventDispatcher, tick } from 'svelte';
  import { uniqueVerseAttributes } from './uniqueVerseAttributes';
  import type { IVerse } from '@hvsb/types';
  import { browser } from '$app/environment';
  export let contentHtml: string;
  export let selected: string = undefined;
  export let hovered: string = undefined;

  const dispatch = createEventDispatcher<{ selected: string; hovered: string }>();

  function onSelectVerse(e: Event) {
    let { dataset } = e.target as HTMLElement; // offsetTop, offsetHeight
    if (dataset.verseId) {
      if (selected === dataset.verseId) {
        selected = null;
      } else {
        selected = dataset.verseId;
        dispatch('selected', selected);
      }
    }
  }
  let selectedVerseSpans: NodeListOf<Element>;
  $: {
    if (selectedVerseSpans) {
      selectedVerseSpans.forEach((span) => {
        span.classList.remove('selected-verse');
      });
      selectedVerseSpans = null;
    }
    if (selected && browser) {
      selectedVerseSpans = document.querySelectorAll(`[data-verse-id="${selected}"]`);
      selectedVerseSpans.forEach((span) => {
        span.classList.add('selected-verse');
      });
    }
  }

  function mouseover(e: Event) {
    let { dataset } = e.target as HTMLElement;
    if (dataset.verseId) {
      hovered = dataset.verseId;
      dispatch('hovered', hovered);
    }
  }
  function mouseout(e: Event) {
    let { dataset } = e.target as HTMLElement;
    if (hovered === dataset.verseId) {
      hovered = null;
    }
  }
  let hoveredVerseSpans: NodeListOf<Element>;
  $: {
    if (hoveredVerseSpans) {
      hoveredVerseSpans.forEach((span) => {
        span.classList.remove('hovered-verse');
      });
      hoveredVerseSpans = null;
    }

    if (hovered && browser) {
      hoveredVerseSpans = document.querySelectorAll(`[data-verse-id="${hovered}"]`);
      hoveredVerseSpans.forEach((span) => {
        span.classList.add('hovered-verse');
      });
    }
  }

  let innerWidth: number; // recalculate where to put media when user rotates or resizes window
  let container: HTMLDivElement;
  let verses: IVerse[] = [];

  $: if (container && contentHtml && innerWidth) updateVerses();
  async function updateVerses() {
    await tick(); // wait until verse-spans are updated
    const verseElements = container.querySelectorAll<HTMLSpanElement>('.verse-span');
    const versesDuplicated = Array.from(verseElements).map((element) => {
      const { dataset, offsetTop, offsetHeight } = element;
      return {
        id: dataset.verseId,
        number: +dataset.verseId.match(/\d+$/)[0],
        offsetTop,
        offsetBottom: offsetTop + offsetHeight,
        element,
      };
    });
    verses = uniqueVerseAttributes(versesDuplicated);
  }
</script>

<svelte:window bind:innerWidth/>

<div
  bind:this={container}
  class="scripture"
  on:click={onSelectVerse}
  on:mouseover={mouseover}
  on:focus={mouseover}
  on:mouseout={mouseout}
  on:blur={mouseout}>
  {@html contentHtml}
</div>

<slot {verses} {selected} {hovered} />

<style global>
  .verse-span {
    padding: 1px 0 2px !important;
    margin: -1px 0 -2px !important;
    cursor: pointer;
  }
  /* .verse-span:hover, */
  .hovered-verse {
    /* background: hsl(0, 0%, 87%); */
    /* background: hsla(60, 0%, 90%, 0.5); */
    --at-apply: md:bg-gray-300/50;
  }
  /* .verse-span:focus, */
  .selected-verse {
    /* background: hsl(60, 100%, 94%); */
    --at-apply: bg-yellow-200/40;
  }
  .selected-verse.hovered-verse {
    /* background: hsl(60, 100%, 90%); */
    --at-apply: bg-yellow-200/70;
  }
</style>
