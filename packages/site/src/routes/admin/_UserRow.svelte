<script lang="ts">
  import { admin } from '$lib/stores';
  import { printDate } from '$lib/parts';
  import type { IUser } from '@hvsb/types';
  export let user: IUser;
  let manuallySubscribe = false;
  import SetTranslatorLanguage from './_SetTranslatorLanguage.svelte';
  import { updateOnline } from 'sveltefirets';
</script>

<tr title={$admin > 1 && JSON.stringify(user, null, 1)}>
  <td class="font-bold">
    {user.displayName}
  </td>
  <td>
    {user.email}
  </td>
  <td>
    {#if user.subscriptions}
      {#if user.subscriptions.basic.current_period_end}
        {printDate(user.subscriptions.basic.current_period_end * 1000)}
      {/if}
      {#if user.subscriptions.basic.status}
        <small class="text-sm">({user.subscriptions.basic.status})</small>
      {/if}
    {/if}
  </td>
  <td class="cursor-pointer" on:click={() => (manuallySubscribe = true)}>
    <!-- Started ' + user.subscriptions.basic.manualSubscriptionStartDate.toDate() : 'Give access until a certain date' -->
    {#if user.subscriptions?.basic?.manualSubscriptionEndDate}{printDate(
      user.subscriptions.basic.manualSubscriptionEndDate.toDate()
    )}

      <small class="text-sm"
      >({new Date() <= user.subscriptions.basic.manualSubscriptionEndDate.toDate()
        ? 'active'
        : 'expired'})</small>
    {:else}
      <span class="text-sm text-gray-500">Until...</span>
    {/if}
  </td>
  <td>
    {#if user.lastVisit}{printDate(user.lastVisit.toDate())}{/if}
  </td>
  <td>
    {#if user.createdAt}{printDate(user.createdAt.toDate())}{/if}
  </td>
  <td>
    {#if user.unsubscribe}
      <button
        type="button"
        title="Click to re-subscribe"
        class="hover:underline text-red-600"
        on:click={async () => {
          if (confirm('Re-subscribe user?')) {
            await updateOnline(`users/${user.uid}`, {
              unsubscribe: null,
            });
          }
        }}>{printDate(user.unsubscribe.toDate())}</button>
    {:else}
      <button
        type="button"
        class="text-xs hover:underline text-gray-700"
        on:click={async () => {
          await updateOnline(`users/${user.uid}`, {
            unsubscribe: new Date(),
          });
        }}>Mark Unsubscribed</button>
    {/if}
  </td>
  <td>
    <SetTranslatorLanguage {user} />
  </td>
</tr>

{#if manuallySubscribe}
  {#await import('$lib/components/ui/Datepicker.svelte') then { default: Datepicker }}
    <Datepicker
      {user}
      on:close={() => {
        manuallySubscribe = false;
      }} />
  {/await}
{/if}
