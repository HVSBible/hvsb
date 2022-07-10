<script lang="ts">
  import Modal from 'svelte-pieces/ui/Modal.svelte';
  import type { IUser } from '@hvsb/types';
  import { updateOnline } from 'sveltefirets';
  export let user: IUser;
  let selectedDate: Date;
  let dateInput: HTMLInputElement;
  import { onMount } from 'svelte';
  onMount(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/js-datepicker';
    script.onload = () => {
      // @ts-ignore
      datepicker(dateInput, {
        onSelect: (instance, date) => {
          selectedDate = date;
        },
      });
    };
    document.head.appendChild(script);

    return () => {
      script.parentNode.removeChild(script);
    };
  });

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import Button from 'svelte-pieces/ui/Button.svelte';

  async function setManualSubscriptionEndDate(user: IUser, endDate: Date) {
    await updateOnline(`users/${user.uid}`, {
      'subscriptions.basic.manualSubscriptionEndDate': endDate,
    });
    if (
      !(
        user.subscriptions &&
        user.subscriptions.basic &&
        user.subscriptions.basic.manualSubscriptionStartDate
      )
    ) {
      await updateOnline(`users/${user.uid}`, {
        'subscriptions.basic.manualSubscriptionStartDate': new Date(),
      });
    }
    dispatch('close');
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/js-datepicker/dist/datepicker.min.css" />
</svelte:head>

<Modal on:close>
  <span slot="heading">Select Date</span>
  <div style="height: 250px;">
    <input
      class="border border-gray-500"
      bind:this={dateInput}
      type="text"
      placeholder="Click to select" />
  </div>
  <div>
    <Button color="green" onclick={() => setManualSubscriptionEndDate(user, selectedDate)}
      >Save</Button>
  </div>
</Modal>
