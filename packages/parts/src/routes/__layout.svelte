<script lang="ts" context="module">
  import { Layout } from 'kitbook';
  const modules = import.meta.glob('./**/*.{md,svx}');

  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    return { stuff: { kitbook: { modules } } };
  };
</script>

<Layout title="HVSB Docs" githubURL="https://github.com/HVSBible/hvsb/tree/main/packages/parts">
  <slot />
</Layout>
