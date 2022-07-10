<script lang="ts">
  export let version: string, bookId: string, chapter: string;
  import { bibles } from '$lib/mappings/bibles';
  import { goto } from '$app/navigation';
  import { admin } from '$lib/stores';
</script>

<div class="mt-6">
  <!-- <label for="version" class="block text-sm leading-5 font-medium text-gray-700">Version</label> -->
  <!-- svelte-ignore a11y-no-onchange -->
  <select
    value={version}
    on:change={(e) => {
      //@ts-ignore
      goto(`/${e.target.value}/${bookId}/${chapter}`);
    }}
    id="version"
    style="width: 350px; max-width: 100%;"
    class="mt-1 rounded-md block mx-auto pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm sm:leading-5">
    {#each bibles as bible}
      {#if bible.supported || $admin}
        <option value={bible.abbreviation}
          >{bible.name} {!bible.supported && $admin ? '(admin-only)' : ''}</option>
      {/if}
    {/each}
  </select>
</div>
