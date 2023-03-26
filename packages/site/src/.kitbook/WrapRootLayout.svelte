<script>
  import { pagesStore } from 'kitbook';
  import { setContext } from 'svelte';
  setContext('pages-store', pagesStore);

  /** @type {import('kitbook').KitbookSettings} */
  const kitbookSettings = {
    title: 'HVSB Docs',
    description: 'House Visual Study Bible',
    githubURL: 'https://github.com/HVSBible/hvsb/tree/main/packages/site',
    expandTree: true,
  };

  setContext('kitbook-settings', kitbookSettings);
</script>

<slot />

