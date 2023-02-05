<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ params }) => {
    return { props: { documentId: params.documentId } };
  };
</script>

<script lang="ts">
  import type { IDocument, ITranslatedField } from '@hvsb/types';
  import { LanguageMappings } from '@hvsb/types';
  import { admin, translator } from '$lib/stores';
  import { Doc, getFirebaseApp } from 'sveltefirets';
  export let documentId: string;
  let documentType: IDocument;

  import { getFunctions, httpsCallable } from 'firebase/functions';
  async function save(e, field: 'title_translations' | 'description_translations' | 'section') {
    try {
      //@ts-ignore
      console.log('Translated: ', e.target.value);
      const data: ITranslatedField = {
        language: $translator,
        mediaId: documentId,
        field,
        translation: e.target.value,
      };
      // add sectionIndex if field is sections,
      const functions = getFunctions(getFirebaseApp());
      const addTranslatedField = httpsCallable(functions, 'addTranslatedField');
      await addTranslatedField(data);
    } catch (err) {
      alert(`Error saving translation. Please contact us if the problem continues.`);
    }
  }
</script>

<Doc path="media/{documentId}" startWith={documentType} let:data={document}>
  <p><b>Title</b></p>
  <p>{document.title}</p>
  <div class="font-semibold mt-1 mb-1">{LanguageMappings[$translator]}</div>
  <input
    type="text"
    on:blur={(e) => save(e, 'title_translations')}
    class="form-input block w-full mb-2"
    placeholder="Translate Title" />

  <p><b>Description</b></p>
  <p>{document.description}</p>
  <div class="font-semibold mt-1 mb-1">{LanguageMappings[$translator]}</div>
  <input
    type="text"
    on:blur={(e) => save(e, 'description_translations')}
    class="form-input block w-full mb-2"
    placeholder="Translate Description" />

  {#if $admin > 1}
    {#await import('svelte-pieces/data/JSON.svelte') then { default: JSON }}
      <JSON obj={document} />
    {/await}
  {/if}
</Doc>
