<script lang="ts">
  import linkifyHtml from 'linkify-html';
  import { onMount } from 'svelte';
  import { findReferencesInParagraph } from "$lib/helpers/parseReferences/parseReferences";

  export let value = '';
  let paragraph: string;

  $: {
   const linkified = linkifyHtml(value, {
      className: 'hover:text-primary-800 underline',
      target: {
        url: '_blank',
      },
    });
    const references = findReferencesInParagraph(value)
    paragraph 
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
<div bind:this={paragraphEl}>{@html paragraph}</div>

<pre>{JSON.stringify(findReferencesInParagraph(value), null, 2)}</pre>