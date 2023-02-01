<script lang="ts">
  import NProgress from 'nprogress';
  import './nprogress.css';

  import { onMount } from 'svelte';
  onMount(() => {
    // https://github.com/rstacruz/nprogress#configuration
    NProgress.configure({
      minimum: 0.16,
      showSpinner: false,
    });
  });

  import { page } from '$app/stores';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  beforeNavigate(({ to, cancel }) => {
    NProgress && NProgress.start();
    if (
      to &&
      (to.pathname.includes('img') || to.pathname.includes('doc') || to.pathname.includes('vid'))
    ) {
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

  afterNavigate(() => {
    NProgress && NProgress.done();
  });

  import { user, admin, contributor, isSubscriber } from '$lib/stores';
  let modal: 'auth' | 'subscribe' = null;
</script>

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
