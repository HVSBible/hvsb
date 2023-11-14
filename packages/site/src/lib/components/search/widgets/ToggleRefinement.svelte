<script lang="ts">
  import type { InstantSearch } from 'instantsearch.js';
  import type { ToggleRefinementRenderState } from 'instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement';
  // import { connectToggleRefinement } from 'instantsearch.js/es/connectors';
  import { connectToggleRefinement } from 'instantsearch.js/cjs/connectors/index.js';
  import { onMount } from 'svelte';

  export let search: InstantSearch,
    attribute = '',
    on = true,
    label = '';

  let value: ToggleRefinementRenderState['value'];
  let refine: (arg0: any) => any;

  onMount(() => {
    const customToggleRefinement = connectToggleRefinement((params) => {
      ({ value, refine } = params);
    });

    search.addWidgets([
      customToggleRefinement({
        attribute,
        on,
      }),
    ]);
  });
</script>

{#if value?.onFacetValue.count}
  <div class="flex items-center my-2">
    <input
      id={on ? attribute : 'not_' + attribute}
      type="checkbox"
      checked={value.isRefined}
      on:change={() => {
        refine({ isRefined: value.isRefined });
      }}
      class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" />
    <label
      for={on ? attribute : 'not_' + attribute}
      class="ml-2 block text-sm leading-5 text-gray-900">
      {label}
      <span class="text-xs text-gray-600"> ({value.onFacetValue.count}) </span>
      <!-- value.offFacetValue.count -->
    </label>
  </div>
{/if}
