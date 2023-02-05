<script lang="ts">
  import { admin } from '$lib/stores';
  import { printDate } from '$lib/parts';
  import type { ISupportMessage } from '@hvsb/types';
  export let message: ISupportMessage;
</script>

<tr title={$admin > 1 && JSON.stringify(message, null, 1)}>
  <td class="font-bold whitespace-nowrap">
    {message.name}
  </td>
  <td>
    {message.email}
  </td>
  <td>
    {message.message}
  </td>
  <td>
    <a href={message.url} class="underline" target="_blank">{message.url}</a>
  </td>
  <td class="whitespace-nowrap">
    {#if message.createdAt}{printDate(message.createdAt.toDate())}{/if}
  </td>
</tr>
