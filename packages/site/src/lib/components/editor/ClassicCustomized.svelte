<script lang="ts">
  export let html: string;
  import CKEditor from './CKEditor.svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import type { Editor } from '@ckeditor/ckeditor5-core';
  import type { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
  let editor: typeof Editor;
  let initialValue: string;

  let editorConfig: EditorConfig = {
    // TODO: figure out which plugins to remove related to photos to speed up
    // removePlugins: ['MediaEmbed'],
    // Available plugins for ClassicEditor: Essentials, CKFinderUploadAdapter, Autoformat, Bold, Italic, BlockQuote, CKFinder, EasyImage, Heading, Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, Link, List, MediaEmbed, Paragraph, PasteFromOffice, Table, TableToolbar, ++ Alignment
    // To Discover: ClassicEditor.builtinPlugins.map(plugin => { console.log(plugin.pluginName); });
    alignment: {
      options: ['left', 'right', 'center', 'justify'],
    },
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'smallCaps',
      'alignment',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'insertTable',
      'undo',
      'redo',
    ],
  };

  const dispatch = createEventDispatcher<{
    update: string;
    // focus: { evt: any; instance: Editor };
    // blur: { evt: any; instance: Editor };
  }>();

  $: if (editor && initialValue !== html) dispatch('update', html);

  onMount(async () => {
    initialValue = html;
    editor = (await import('ckeditor5-build-classic-with-alignment-underline-smallcaps')).default;
  });
</script>

{#if editor}
  <CKEditor {editor} value={html} {editorConfig} on:update />
{/if}
