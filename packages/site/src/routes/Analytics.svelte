<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  const analyticsId = 'REPLACED_WITH_VERCEL_ANALYTICS_ID';

  onMount(async () => {
    if (!analyticsId.includes('REPLACED')) {
      const { measureWebVitals } = await import('$lib/web_vitals');
      measureWebVitals({ path: $page.url.pathname, params: $page.params, analyticsId });
    }

    const { init } = await import('@sentry/browser');
    // const { Integrations } = await import('@sentry/tracing');
    init({
      dsn: 'https://4828396351a943f0acbe567421e6a1d1@o214614.ingest.sentry.io/5384573',
    // integrations: [new Integrations.BrowserTracing()],

      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring. We recommend adjusting this value in production
      // tracesSampleRate: 1.0,
    });
  });
</script>

