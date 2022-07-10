<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ addedfile: FileList }>();

  let hovering = false;
  function dropped(event: DragEvent) {
    hovering = false;
    dispatch('addedfile', event.dataTransfer.files);
  }
</script>

<label
  class="border-gray-500 bg-gray-50 border-dashed border-2 p-3 block cursor-pointer rounded"
  class:border-orange-500={hovering}
  class:bg-orange-100={hovering}
  on:drop|preventDefault={dropped}
  on:dragover|preventDefault={() => (hovering = true)}
  on:dragleave|preventDefault={() => (hovering = false)}>
  <slot />
  <input
    style="display: none;"
    type="file"
    accept="image/*"
    on:change={(event) => {
      //@ts-ignore
      dispatch('addedfile', event.target.files);
    }} />
</label>
