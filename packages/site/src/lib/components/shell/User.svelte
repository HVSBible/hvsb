<script lang="ts">
  import { session } from '$app/stores';
  import { user as userStore, admin, contributor } from '$lib/stores';
  import { getFirebaseApp, update, logOut } from 'sveltefirets';
  import { firebaseConfig } from '$lib/firebaseConfig';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
  import { clickoutside } from 'svelte-pieces/actions/clickoutside';

  import { fly } from 'svelte/transition';
  let open = false;
  
  $: user = $userStore || $session?.user || null;

  import { browser } from '$app/env';
  $: if (browser && $userStore && $session) {
    $session.user = null; // so that page will properly reflect log out status and not fall back to session user from cookies
  }
</script>

{#if user}
  <div
    class="relative print:hidden flex-shrink-0"
    use:clickoutside
    on:clickoutside={() => (open = false)}>
    {#if user.photoURL}
      <button type="button" on:click={() => (open = !open)} class="p-1 block focus:outline-none">
        <img
          class="rounded-full"
          style="width: 34px; height: 34px;"
          alt={user.displayName[0]}
          src={user.photoURL} />
      </button>
    {:else}
      <button
        type="button"
        on:click={() => (open = !open)}
        class="hover:bg-gray-200 block rounded py-2 px-3 font-semibold focus:outline-none">
        <span class="hidden sm:block">{user.displayName.split(' ')[0]}</span>
        <span class="sm:hidden">{user.displayName[0]}</span>
      </button>
    {/if}

    {#if open}
      <div
        transition:fly={{ y: -10, duration: 150 }}
        class="origin-top-right absolute z-10 right-0 mt-2 -mr-1 w-48 rounded-md
        shadow-lg">
        <div class="py-1 rounded-md bg-white shadow-sm" on:click={() => (open = !open)}>
          <div class="px-4 py-2 text-xs font-semibold text-gray-600 border-b">
            {user.displayName}
            {#if $contributor}
              <div class="font-normal">(contributor)</div>
            {/if}
          </div>
          {#if $admin}
            <a
              href="/admin"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
              ">
              Admin Panel
              <i class="fas fa-key" />
            </a>
            <button
              type="button"
              on:click={() => {
                update(`users/${user.uid}`, {
                  demoted: true,
                });
              }}
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
            ">
              Demote to regular user
              <i class="fas fa-key" />
            </button>
          {/if}
          {#if user.demoted}
            <!-- {#if user.mockSubscriber}
              <button
                type="button"
                on:click={() => {
                  update(`users/${user.uid}`, {
                    mockSubscriber: null,
                  });
                }}
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
        ">
                Act as Unsubscribed
                <i class="fas fa-key" />
              </button>
            {:else}
              <button
                type="button"
                on:click={() => {
                  update(`users/${user.uid}`, {
                    mockSubscriber: true,
                  });
                }}
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
    ">
                Act as Subscriber
                <i class="fas fa-key" />
              </button>
            {/if} -->
            <button
              type="button"
              on:click={() => {
                update(`users/${user.uid}`, {
                  demoted: null,
                });
              }}
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
            ">
              Return to Admin Role
              <i class="fas fa-key" />
            </button>
          {/if}
          <a
            href="/account"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
            ">
            Account Details
          </a>
          <button
            on:click={logOut}
            class="block w-full text-left px-4 py-2 text-sm text-gray-700
            hover:bg-gray-100 
            focus:outline-none">
            Sign Out
          </button>
          {#if firebaseConfig.projectId === 'hvsb-dev'}
            <button
              on:click={async () => {
                const roleNumber = +prompt('Enter 0, 1, or 2');
                const { getFunctions, httpsCallable } = await import('firebase/functions');
                const functions = getFunctions(getFirebaseApp());
                await httpsCallable(
                  functions,
                  'updateDevAdminRole'
                )({
                  role: roleNumber,
                });
              }}
              class="block w-full text-left px-4 py-2 text-sm text-gray-700
          hover:bg-gray-100 
          focus:outline-none">
              Set Admin Role Level (dev only)
            </button>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{:else}
  <ShowHide let:show let:toggle>
    <button
      type="button"
      class="text-gray-700 hover:bg-gray-200 md:mr-2 py-2 px-3 ml-2 rounded bg-transparent font-semibold hover:text-black
    print:hidden"
      on:click={toggle}>
      <i class="fas fa-sign-in-alt" />
      <span class="ml-1 hidden sm:inline">Sign In</span>
    </button>
    {#if show}
      {#await import('$lib/components/modals/Auth.svelte') then { default: Auth }}
        <Auth on:close={toggle} />
      {/await}
    {/if}
  </ShowHide>
{/if}

<!-- User dropdown menu from https://tailwindui.com/page-examples/detail-view-01# -->
