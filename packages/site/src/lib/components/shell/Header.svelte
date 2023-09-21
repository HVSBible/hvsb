<script lang="ts">
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
  import User from './User.svelte';
  export let home = false;
</script>

<header class:fixed={!home} class="top-0 z-20 w-full flex items-center p-3 gradient-bg">
  <div class="w-full flex items-center">
    <slot />

    <div class="mr-auto" />

    <a
      href="/search"

      class="text-gray-700 hover:bg-gray-200 py-2 px-3 rounded hover:text-black border border-transparent print:hidden">
      <i class="fas fa-search" />
      <span class="ml-1 hidden md:inline">Search</span>
    </a>

    <ShowHide let:show let:toggle>
      <button
        type="button"
        class="text-gray-700 hover:bg-gray-200 py-2 px-3 rounded hover:text-black border border-transparent print:hidden"
        on:click={toggle}>
        <i class="fas fa-question-circle" />
        <span class="ml-1 hidden sm:inline">Contact Us</span>
      </button>
      {#if show}
        {#await import('$lib/components/modals/Contact.svelte') then { default: Contact }}
          <Contact on:close={toggle} />
        {/await}
      {/if}
    </ShowHide>
    <User />
  </div>
</header>

<style>
  .gradient-bg {
    background: linear-gradient(0deg, #f9f9fa00 0%, #f9f9fad9 40%, #f9f9fa 100%);
  }
</style>
