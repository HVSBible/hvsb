<script lang="ts">
  // module
  // import type { Load } from '@sveltejs/kit';
  // export const load: Load = async ({ session }) => {
  //   let { user } = session;
  //   if (!user) {
  //     return { status: 302, redirect: '/' };
  //   }
  //   return {};
  // };
  import Tab from './_Tab.svelte';
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
  const tabs = ['users', 'supportMessages', 'other'];
</script>

<Header>
  <a class="px-3 py-2 hover:text-black hover:bg-gray-200 rounded-lg mr-2 print:hidden" href="/">
    <i class="fas fa-home fa-fw" />
  </a>
  <span class="font-semibold leading-tight sm:text-xl"> Admin Panel </span>
</Header>

<View adminGuard={true} marginTop={true}>
  <div class="px-3 border-b border-gray-200">
    <nav class="-mb-px flex overflow-x-auto">
      {#each tabs as tab}
        <Tab link={tab} />
      {/each}
    </nav>
  </div>

  <slot />
</View>
