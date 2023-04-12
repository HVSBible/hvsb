<script lang="ts">
  import type { IDocument, ITranslatedField } from '@hvsb/types';
  import { LanguageMappings } from '@hvsb/types';
  import { admin, translator } from '$lib/stores';
  import { Doc, getFirebaseApp } from 'sveltefirets';

  import type { PageData } from './$types';
  export let data: PageData;
  let documentType: IDocument;

  import { getFunctions, httpsCallable } from 'firebase/functions';
  async function save(e, field: 'title_translations' | 'description_translations' | 'section') {
    try {
      //@ts-ignore
      const translatedField: ITranslatedField = {
        language: $translator,
        mediaId: data.documentId,
        field,
        translation: e.target.value,
      };
      // add sectionIndex if field is sections,
      const functions = getFunctions(getFirebaseApp());
      const addTranslatedField = httpsCallable(functions, 'addTranslatedField');
      await addTranslatedField(translatedField);
    } catch (err) {
      alert(`Error saving translation. Please contact us if the problem continues.`);
    }
  }
</script>

<Doc path="media/{data.documentId}" startWith={documentType} let:data={document}>
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
