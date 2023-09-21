<!-- From: https://github.com/techlab23/ckeditor5-svelte -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { Editor } from '@ckeditor/ckeditor5-core';
  import type { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';

  export let editor: typeof Editor;
  export let editorConfig: EditorConfig;
  export let value = '';
  // export let debounceMs = 300;

  let editorEl: HTMLDivElement;
  let instance: Editor;

  // $: watchValue(value);

  // function watchValue(x: string) {
  //   if (instance && x !== lastEditorData) {
  //     instance.setData(x);
  //   }
  // }

  // function debounce(func: () => void, timeout = 300) {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       func.apply(this, args);
  //     }, timeout);
  //   };
  // }

  const dispatch = createEventDispatcher<{
    update: string;
  // focus: { evt: any; instance: Editor };
    // blur: { evt: any; instance: Editor };
  }>();

  const emitInputEvent = () => {
    // @ts-ignore
    value = instance.getData();
    dispatch('update', value);
  };

  onMount(() => {
    editor
      .create(editorEl, { ...editorConfig, initialData: value })
      .then((editor) => {
        instance = editor;
        instance.model.document.on('change:data', emitInputEvent);
      // instance.model.document.on('change:data', debounce(emitInputEvent, debounceMs));

        // instance.editing.view.document.on('focus', (evt) => {
        //   dispatch('focus', { evt, instance });
        // });

        // instance.editing.view.document.on('blur', (evt) => {
        //   dispatch('blur', { evt, instance });
        // });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  onDestroy(() => {
    if (instance) {
      instance.model.document.off('change:data', emitInputEvent);
      instance.destroy();
      instance = null;
    }
  });
</script>

<div bind:this={editorEl} contenteditable bind:innerHTML={value} />
