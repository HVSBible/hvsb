<script lang="ts">
  import { page } from '$app/stores';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
  import { onMount } from 'svelte';

  import { dev } from '$app/environment';

  onMount(async () => {
    const Sentry = await import('@sentry/browser');
    const eventId = Sentry.captureException($page.error);
    console.log('sent error', eventId);
    // https://docs.sentry.io/enriching-error-data/user-feedback
    // Sentry.showReportDialog({ eventId });
  });
</script>

<svelte:head>
  <title>Error: {$page.status}</title>
</svelte:head>

<div class="p-4 bg-white relative z-20">
  <h2 class="text-xl sm:text-4xl font-bold mb-3">We're sorry, but we've run into an error.</h2>

  <p class="mb-3">
    The error has been recorded and we will be looking into it.
    <b> If you have a moment, would you mind sending us a short note to explain what happened? </b>
    For example, "I clicked on ______ and then ________."
  </p>

  <ShowHide let:show let:toggle>
    <Button form="filled" onclick={toggle}>Contact Us</Button>
    {#if show}
      {#await import('$lib/components/modals/Contact.svelte') then { default: Contact }}
        <Contact on:close={toggle} />
      {/await}
    {/if}
  </ShowHide>

  <p class="text-gray-600 text-sm mt-6">
    This is the
    {$page.status}
    error:
    {$page.error.message}
  </p>

  {#if dev && $page.error.stack}
    <pre>{$page.error.stack}</pre>
  {/if}
</div>
