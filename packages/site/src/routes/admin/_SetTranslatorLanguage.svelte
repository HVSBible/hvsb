<script lang="ts">
  import { update } from 'sveltefirets';
  import { LanguageMappings, type IUser } from '@hvsb/types';
  export let user: Partial<IUser> = {};

  const languages = Object.keys(LanguageMappings);

  $: translatorLanguage = (user.roles?.translator) || null;
</script>

<!-- {#if translatorLanguage}
  {translatorLanguage}
{/if} -->

<select
  class:bg-green-100={translatorLanguage}
  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
  value={translatorLanguage}
  on:change={async (e) => {
    await update(`users/${user.uid}`, {
      //@ts-ignore
      'roles.translator': e.target.value || null,
    });
  }}>
  <option value="">{translatorLanguage ? 'Remove' : 'Set'} Language</option>
  {#each languages as language}
    <option value={language}>{LanguageMappings[language]}</option>
  {/each}
</select>
