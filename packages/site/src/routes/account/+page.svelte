<script lang="ts">
  import Header from '$lib/components/shell/Header.svelte';
  import View from '$lib/components/ui/View.svelte';
  import Button from 'svelte-pieces/ui/Button.svelte';
  import { user, admin, subscriptionStatus, createBillingPortalSession } from '$lib/stores';

  import { printDateWithWeekday } from '@hvsb/parts';
  import { logOut, updateOnline, saveUserData } from 'sveltefirets';
  import ShowHide from 'svelte-pieces/functions/ShowHide.svelte';
</script>

<svelte:head>
  <title>Account Settings</title>
</svelte:head>

<Header>
  <a class="px-3 py-2 hover:text-black hover:bg-gray-200 rounded-lg mr-2 print:hidden" href="/">
    <i class="fas fa-home fa-fw" />
  </a>
  <span class="font-semibold leading-tight sm:text-xl"> Account Settings </span>
</Header>

<View padding={true} marginTop={true} maxWidth={true}>
  {#if $user}
    <div class="px-2 md:p-6 rounded-lg md:shadow-xl bg-white">
      <div class="mb-6 pb-6 border-b border-gray-300">
        <div class="font-semibold">{$user.displayName}</div>
        <div class="text-gray-600">{$user.email}</div>
        <!-- <div class="text-gray-600">{$user.createdAt}</div> -->
        {#if $admin}
          <div class="mt-2">
            <a
              href="/admin"
              class="cursor-pointer px-3 py-2 text-sm font-medium text-white
              bg-gray-800 rounded-md hover:bg-gray-700">
              Admin Panel
              <i class="fas fa-key" />
            </a>
          </div>
        {/if}
      </div>
      <div class="mb-6 pb-6 border-b border-gray-300">
        <div class="text-sm text-gray-700 font-bold uppercase">Basic Subscription</div>
        <div class="text-sm mb-3 text-gray-500">Access study resources</div>
        {#if subscriptionStatus($user) === 'active' || subscriptionStatus($user) === 'trialing'}
          <div class="text-green-700">
            <i class="fas fa-check" />
            {$user.subscriptions.basic.period === 'monthly' ? 'Monthly' : 'Yearly'}
            Plan Active
          </div>
          <div class="text-sm text-gray-500 mb-2">
            Your subscription started on
            {printDateWithWeekday($user.subscriptions.basic.start_date * 1000)}.
          </div>
          {#if $user.subscriptions.basic.cancel_at_period_end}
            <div class="mb-2">
              Your subscription is cancelled, but you will still receive access until
              {printDateWithWeekday($user.subscriptions.basic.current_period_end * 1000)}.
            </div>
            <Button
              onclick={() => createBillingPortalSession(document.location.href)}
              form="filled">
              Resubscribe in Billing Portal
              <i class="fas fa-chevron-right" />
            </Button>
          {:else}
            <div class="mb-2">
              Your
              {subscriptionStatus($user) === 'active' ? 'next' : 'first'}
              payment of
              <b>
                {$user.subscriptions.basic.period === 'monthly' ? '$5' : '$50'}
              </b>
              will be charged on
              {printDateWithWeekday($user.subscriptions.basic.current_period_end * 1000)}.
            </div>
            <Button onclick={() => createBillingPortalSession(document.location.href)}>
              Modify Plan in Billing Portal
              <i class="fas fa-chevron-right" />
            </Button>
          {/if}
        {:else if subscriptionStatus($user) === 'past_due'}
          <div class="text-orange-700">
            {$user.subscriptions.basic.period === 'monthly' ? 'Monthly' : 'Yearly'}
            Plan
            <b>Past Due</b>
          </div>
          <div class="mb-3">
            Your most recent
            {$user.subscriptions.basic.period === 'monthly' ? '$5/month' : '$50/year'}
            subscription payment is past due. Stripe should have contacted you to update your payment
            information, but please
            <ShowHide let:show let:toggle>
              <button type="button" class="underline" on:click={toggle}> contact us </button>
              {#if show}
                {#await import('$lib/components/modals/Contact.svelte') then { default: Contact }}
                  <Contact on:close={toggle} />
                {/await}
              {/if}
            </ShowHide>
            if you haven't received a message from them or if you have other questions for us.
          </div>
          <Button onclick={() => createBillingPortalSession(document.location.href)}>
            Modify Plan in Billing Portal
            <i class="fas fa-chevron-right" />
          </Button>
        {:else if subscriptionStatus($user) === 'canceled'}
          <div class="mb-2">
            Subscription ended on
            {printDateWithWeekday($user.subscriptions.basic.current_period_end * 1000)}.
          </div>
          <Button onclick={() => createBillingPortalSession(document.location.href)} form="filled">
            Resubscribe in Billing Portal
            <i class="fas fa-chevron-right" />
          </Button>
        {:else if subscriptionStatus($user) === 'manual-active'}
          <div class="mb-2">
            Your subscription is active until
            {#if $user.subscriptions.basic.manualSubscriptionEndDate.toDate}
              {printDateWithWeekday($user.subscriptions.basic.manualSubscriptionEndDate.toDate())}.
            {/if}
          </div>
        {:else}
          {#if subscriptionStatus($user) === 'manual-expired'}
            <div class="mb-2">
              Manual subscription ended on
              <!-- Can't read toDate() method on timestamps cached in localStorage so verify the method exists before calling -->
              {#if $user.subscriptions.basic.manualSubscriptionEndDate.toDate}
                {printDateWithWeekday(
                  $user.subscriptions.basic.manualSubscriptionEndDate.toDate()
                )}.
              {/if}
            </div>
          {/if}
          <ShowHide let:show let:toggle>
            <Button form="filled" onclick={toggle}>Subscribe</Button>
            {#if show}
              {#await import('$lib/components/modals/Subscribe.svelte') then { default: Subscribe }}
                <Subscribe on:close={toggle} />
              {/await}
            {/if}
          </ShowHide>
        {/if}
      </div>
      <div class="mb-6 pb-6 border-b border-gray-300">
        <div class="flex items-center">
          <input
            on:change={async () => {
              const unsubscribed = $user.unsubscribe;
              try {
                await updateOnline(`users/${$user.uid}`, {
                  unsubscribe: $user.unsubscribe ? null : new Date(),
                });
                alert(`You have ${unsubscribed ? 'resubscribed' : 'unsubscribed'}`);
              } catch (err) {
                alert(
                  "We're sorry, but there was an error trying to save your preference. Please use the Contact Us form to let us know."
                );
              }
            }}
            checked={!$user.unsubscribe}
            id="newsletter"
            name="newsletter"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
          <label for="newsletter" class="ml-2 block text-sm text-gray-900">
            Receive newsletter updates
          </label>
        </div>
      </div>
      <div class="my-2">
        <Button onclick={logOut}>Sign Out</Button>
      </div>
    </div>
  {:else}
    {#await import('sveltefirets') then { FirebaseUiAuth }}
      <FirebaseUiAuth
        signInWith={{ google: true, emailPasswordless: true }}
        on:authresult={(e) => saveUserData(e.detail)} />
    {/await}
  {/if}

  {#if $admin > 1}
    {#await import('svelte-pieces/data/JSON.svelte') then { default: JSON }}
      <JSON obj={$user} />
    {/await}
  {/if}
</View>
