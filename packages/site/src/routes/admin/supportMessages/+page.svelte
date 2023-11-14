<script lang="ts">
  import type { ISupportMessage } from '@hvsb/types';
  import { Collection } from 'sveltefirets';
  import ResponsiveTable from 'svelte-pieces/ui/ResponsiveTable.svelte';
  import View from '$lib/components/ui/View.svelte';
  import Filter from '../_Filter.svelte';
  import SupportMessageRow from '../_SupportMessageRow.svelte';

  const messagesType: ISupportMessage[] = [];
</script>

<View padding={true}>
  <Collection path="supportMessages" startWith={messagesType} let:data={messages}>
    <Filter items={messages} let:filteredItems={filteredMessages} placeholder="Search messages">
      <div class="my-1">
        <ResponsiveTable stickyColumn stickyHeading>
          <thead>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>URL</th>
            <th>Date</th>
          </thead>
          {#each filteredMessages as message}
            <SupportMessageRow {message} />
          {/each}
        </ResponsiveTable>
      </div>
    </Filter>
  </Collection>
</View>

<style>
  th {
    --at-apply: text-xs font-semibold text-gray-600 uppercase tracking-wider;
  }
</style>
