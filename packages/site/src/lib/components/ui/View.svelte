<script lang="ts">
  import { fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  let duration = 200;
  export let adminGuard = false,
    marginTop = false,
    padding = false,
    maxWidth = false;
  //  export let page = '';
  import { admin } from '$lib/stores';
</script>

<!-- {#key page} -->
<div
  class:maxWidth
  class:p-3={padding}
  class:mt-14={marginTop}
  in:fade={{ duration, easing: cubicInOut }}>
  <!-- in:fade={{ duration, easing: cubicInOut, delay: duration }} -->
  <!-- out:fade={{ duration, easing: cubicInOut }} -->
  {#if !adminGuard || $admin}
    <slot />
  {:else}
    <div class="p-3">Not logged in as admin</div>
  {/if}
</div>

<!-- {/key} -->
<style>
  .maxWidth {
    @apply max-w-screen-md mx-auto;
  }
</style>
