<script context="module" lang="ts">
  import { setConfig } from 'sveltefirets';
  import { firebaseConfig } from '$lib/firebaseConfig';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = () => {
    setConfig(firebaseConfig);
    return {};
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  onMount(async () => {
    const Sentry = await import('@sentry/browser');
    Sentry.init({
      dsn: 'https://4828396351a943f0acbe567421e6a1d1@o214614.ingest.sentry.io/5384573',
      // https://docs.sentry.io/enriching-error-data/user-feedback
      // beforeSend(event, hint) {
      // 	if (event.exception) {
      // 		Sentry.showReportDialog({ eventId: event.event_id });
      // 	}
      // 	return event;
      // }
    });
  });
</script>

<slot />

{#await import('$lib/components/shell/AuthSubscribeGuard.svelte') then { default: AuthSubscribe }}
  <AuthSubscribe />
{/await}

<style windi:preflights:global windi:safelist:global global>
  .ck-content table td h4,
  .ck-content table th h4 {
    white-space: nowrap;
  }

  .form-input {
    @apply border-gray-300 rounded-md focus:border-indigo-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50;
  }
</style>
