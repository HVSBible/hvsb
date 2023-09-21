<script lang="ts">
  import Modal from 'svelte-pieces/ui/Modal.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import Form from 'svelte-pieces/data/Form.svelte';
  import { user } from '$lib/stores/user';
  import type { ISupportMessage } from '@hvsb/types';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ close: boolean }>();

  function close() {
    dispatch('close');
  }

  let message = '';
  let email = '';

  let status: 'success' | 'fail';

  import { addOnline } from 'sveltefirets';
  async function send() {
    try {
      if (!window.navigator.onLine)
        status = 'fail';

      const data: ISupportMessage = {
        message,
        email: $user?.email || email,
        name: $user?.displayName || 'Anonymous',
        url: window.location.href,
      };

      await addOnline<ISupportMessage>(`supportMessages`, data);
      if (window.navigator.onLine)
        status = 'success';

    } catch (err) {
      status = 'fail';
      alert(`Error sending message: ${err}`);
    }
  }
</script>

<Modal on:close class="!bg-gray-100">
  <span slot="heading">Contact Us</span>
  {#if !status}
    <Form let:loading onsubmit={send}>
      <div class="mt-3">
        <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="message">
          What is your question or comment?
        </label>
        <textarea
          required
          rows="4"
          minlength="5"
          maxlength="1000"
          bind:value={message}
          class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded
            text-sm shadow focus:outline-none focus:ring w-full"
          placeholder="Enter your message..." />
        <div class="flex text-xs">
          <div class="text-gray-500 ml-auto" class:emphasis={message.length > 999}>
            {message.length}/1000
          </div>
        </div>
      </div>

      {#if !$user}
        <div class="mt-3">
          <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="email">
            Your Email Address
          </label>
          <input
            type="email"
            required
            bind:value={email}
            class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded
              text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Email"
            style="transition: all 0.15s ease 0s;" />
        </div>
      {/if}

      <div class="mt-4">
        <Button {loading} type="submit" form="filled" color="black" size="lg"
        >Send Message</Button>
        <Button disabled={loading} onclick={close} form="simple" size="lg" color="black"
        >Cancel</Button>
      </div>
    </Form>
  {:else if status == 'success'}
    <h4 class="text-lg mt-1 mb-4">
      <i class="fas fa-check" />
      Message sent. We will reply as soon as we can.
    </h4>
    <div>
      <Button onclick={close} form="filled" size="lg" color="black">Close</Button>
    </div>
  {:else if status == 'fail'}
    <h4 class="text-lg mt-1 mb-4">
      Message send failed. Check your internet connection or email
      <a class="underline" href="mailto:support@hvsb.app">support@hvsb.app</a>
    </h4>
  {/if}
</Modal>

<style>
  .emphasis {
    --at-apply: font-bold text-black bg-yellow-200 p-1;
  }
</style>
