<script lang="ts">
  import linkifyHtml from 'linkify-html';
  import { onMount } from 'svelte';
  import { findReferencesInParagraph } from '$lib/helpers/parseReferences/parseReferences';
  import { turnReferencesIntoLinks } from './turnReferencesIntoLinks';

  export let value = '';
  export let version: string = undefined;
  export let mediaType: 'doc' | 'img' = undefined;
  export let mediaId: string = undefined;
  export let showVerseLinks = false;

  $: paragraph = linkifyHtml(value, {
    className: 'hover:text-primary-800 underline',
    target: {
      url: '_blank',
    },
  });

  function addVerseLinksToParagraph(html: string) {
    const references = findReferencesInParagraph(html);
    return turnReferencesIntoLinks({
      version,
      html,
      references,
      mediaType,
      mediaId,
    });
  }

  let paragraphEl: HTMLDivElement;

  onMount(() => {
    makeExternalLinksOpenInNewTab();
  });

  function makeExternalLinksOpenInNewTab() {
    const website = window.location.hostname;

    const internalLinkRegex = new RegExp(
      '^((((http:\\/\\/|https:\\/\\/)(www\\.)?)?' +
        website +
        ')|(localhost:\\d{4})|(\\/.*))(\\/.*)?$',
      ''
    );

    const anchorEls = paragraphEl.querySelectorAll('a');
    const anchorElsLength = anchorEls.length;

    for (var i = 0; i < anchorElsLength; i++) {
      const anchorEl = anchorEls[i];
      const href = anchorEl.getAttribute('href');

      if (!internalLinkRegex.test(href)) {
        anchorEl.setAttribute('target', '_blank');
      }
    }
  }
</script>

<!-- safelist class="hover:text-primary-800 underline" -->
{#if showVerseLinks}
  <div bind:this={paragraphEl}>{@html addVerseLinksToParagraph(paragraph)}</div>
{:else}
  <div bind:this={paragraphEl}>{@html paragraph}</div>
{/if}

<style>
  div :global(a) {
    text-decoration: underline;
  }
</style>