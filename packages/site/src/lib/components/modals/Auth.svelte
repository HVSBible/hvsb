<script lang="ts">
  import Modal from 'svelte-pieces/ui/Modal.svelte';
  import { FirebaseUiAuth, saveUserData } from 'sveltefirets';
  export let context: 'force' = undefined;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{
    close: boolean;
  }>();
</script>

<Modal on:close>
  <span slot="heading">Sign In</span>
  {#if context === 'force'}
    <h4 class="mb-4">
      You must create a free account to view content. Content for the first chapter in each book is free.
    </h4>
  {/if}
  <FirebaseUiAuth
    continueUrl="/account"
    signInWith={{ google: true, emailPasswordless: true }}
    on:success={() => dispatch('close')}
    on:authresult={(e) => saveUserData(e.detail)} />
</Modal>
