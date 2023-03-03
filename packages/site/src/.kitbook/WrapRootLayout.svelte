<script>
  // import './global.css'; // you can import needed global styles here or via style tag demoed below
  
  import { setContext } from 'svelte';

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

<!-- <style global>
  :root {
    --foo: red;
  }
</style> -->
