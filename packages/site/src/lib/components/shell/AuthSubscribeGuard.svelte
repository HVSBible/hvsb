<script lang="ts">
  import { page, navigating } from '$app/stores';
  import { beforeNavigate } from '$app/navigation';
  import { user, admin, contributor, isSubscriber } from '$lib/stores';
  import LoadingIndicator from './LoadingIndicator.svelte';

  beforeNavigate(({ to, cancel }) => {
    if (!to) return
    const { pathname } = to.url
    if (pathname.includes('kitbook')) return
    if (pathname.includes('img') || pathname.includes('doc') || pathname.includes('vid')) {
      if (!$user) {
        modal = 'auth';
        cancel();
      } else if (
        !$admin && !contributor &&
          $page.params.reference &&
          +$page.params.reference > 1 &&
          !isSubscriber($user)
      ) {
        modal = 'subscribe';
        cancel();
      }
    }
  });

  let modal: 'auth' | 'subscribe' = null;
</script>

{#if $navigating}
  <LoadingIndicator />
{/if}


{#if modal === 'auth'}
  {#await import('$lib/components/modals/Auth.svelte') then { default: Auth }}
    <Auth
      context="force"
      on:close={() => {
        modal = null;
      }} />
  {/await}
{/if}

{#if modal === 'subscribe'}
  {#await import('$lib/components/modals/Subscribe.svelte') then { default: Subscribe }}
    <Subscribe
      on:close={() => {
        modal = null;
      }} />
  {/await}
{/if}
