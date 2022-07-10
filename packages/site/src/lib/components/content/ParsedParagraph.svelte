<script lang="ts">
  import linkifyHtml from 'linkify-html';
  import { onMount } from 'svelte';
  // TODO: import { linkifyReferences } from "$lib/helpers/linkify-references";
  // linkifyReferences(value)
  // was parseInternalLinks in old repo

  export let value = '';
  $: paragraph = linkifyHtml(value, {
    className: 'hover:text-primary-800 underline',
    target: {
      url: '_blank',
    },
  });

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

<!-- class="hover:text-primary-800 underline" -->
<div bind:this={paragraphEl}>{@html paragraph}</div>
