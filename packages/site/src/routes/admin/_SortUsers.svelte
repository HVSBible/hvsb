<script lang="ts">
  import type { IUser } from '@hvsb/types';
  export let users: IUser[] = [];
  enum UserFields {
    displayName = 'Name',
    email = 'Email',
    stripeSubscription = 'Stripe Subscription Until',
    manualSubscription = 'Manual Subscription',
    lastVisit = 'Last Visit',
    createdAt = 'Created At',
    unsubscribe = 'Unsubscribed',
    translatorLanguage = 'Translator Language',
  }

  type SortFields = keyof typeof UserFields;
  //@ts-ignore
  const userFields: {
    key: SortFields;
    value: UserFields;
  }[] = Object.entries(UserFields).map(([key, value]) => {
    return { key, value };
  });

  let sortKey: SortFields = 'displayName';
  let sortDescending = true;

  $: sortedUsers = users.sort((a, b) => {
    let valueA: string | number;
    let valueB: string | number;
    // prettier-ignore
    switch (sortKey) {
      case 'translatorLanguage':
        valueA = a.roles && a.roles.translator || 'zz';
        valueB = b.roles && b.roles.translator || 'zz';
        break;
      case 'createdAt':
        valueA = a.createdAt && a.createdAt.seconds || 0;
        valueB = b.createdAt && b.createdAt.seconds || 0;
        break;
      case 'lastVisit':
        valueA = a.lastVisit && a.lastVisit.seconds || 0;
        valueB = b.lastVisit && b.lastVisit.seconds || 0;
        break;
      case 'unsubscribe':
        valueA = a.unsubscribe && a.unsubscribe.seconds || 0;
        valueB = b.unsubscribe && b.unsubscribe.seconds || 0;
        break;
      case 'manualSubscription':
        valueA = a.subscriptions && a.subscriptions.basic && a.subscriptions.basic.manualSubscriptionEndDate && a.subscriptions.basic.manualSubscriptionEndDate.seconds || 0;
        valueB = b.subscriptions && b.subscriptions.basic && b.subscriptions.basic.manualSubscriptionEndDate && b.subscriptions.basic.manualSubscriptionEndDate.seconds || 0;
        break;
      case 'stripeSubscription':
        valueA = a.subscriptions && a.subscriptions.basic && a.subscriptions.basic.current_period_end || 0;
        valueB = b.subscriptions && b.subscriptions.basic && b.subscriptions.basic.current_period_end || 0;
        break;
      default: 
        valueA = a[sortKey] ? a[sortKey].toUpperCase() : 'zz'; // if we ever have missing names or email, then pass 'zz' when the sortKey is undefined
        valueB = b[sortKey] ? b[sortKey].toUpperCase() : 'zz';
        // a[sortKey].localeCompare(b[sortKey])
    }
    if (valueA < valueB) {
      return sortDescending ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortDescending ? 1 : -1;
    }
    return 0;
  });

  function setSortSettings(paraSortKey: SortFields) {
    //Changes the key if the sort wasn't based on the button before, and if it was, change the direction
    if (sortKey === paraSortKey) {
      sortDescending = !sortDescending;
    } else {
      sortKey = paraSortKey;
    }
  }
</script>

{#each userFields as field}
  <th
    class="cursor-pointer"
    on:click={() => setSortSettings(field.key)}
    title="Click to sort asc/desc">
    {field.value}
    {#if sortKey === field.key}
      {#if sortDescending}
        <i class="fas fa-sort-amount-down" />
      {:else}
        <i class="fas fa-sort-amount-up" />
      {/if}
    {/if}
  </th>
{/each}

<slot {sortedUsers} />

<style>
  th {
    @apply text-xs font-semibold text-gray-600 uppercase tracking-wider;
  }
</style>