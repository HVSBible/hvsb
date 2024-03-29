<script lang="ts">
  import { Story } from 'kitbook';
  import PreviewDocument from './PreviewDocument.svelte';

  import type { Hit } from 'instantsearch.js';
  import type { IDocument } from '@hvsb/types';
  let document1: Partial<Hit & IDocument> = {
    chapterIds: ['GEN.1'],
    verseIds: ['GEN.1.1'],
  };
</script>

# Document Previews

<Story name="null title" knobs={{ published: false }} let:props={{ published }}>
  <div class="p-2">
    <PreviewDocument document={{ ...document1, published, title: null }} />
  </div>
</Story>

<Story
  name="unpublished document with a description"
  knobs={{ published: false, genre: 'note' }}
  let:props={{ published, genre }}>
  <div class="p-2">
    <PreviewDocument
      document={{ ...document1, published, genre, description: 'How it all came about' }} />
  </div>
</Story>

<Story
  name="document"
  knobs={{
    published: true,
    title:
      'The Feeding of the 5000 and more miraculous deeds that if all the websites of the world had stuff they still could not the whole of it even they had really wanted to do so. Let us do a bit more to stretch things out.',
  }}
  let:props={{ published, title }}>
  <div class="p-2">
    <PreviewDocument
      document={{ ...document1, genre: 'doctrine', title, published, currentVerses: [2, 8] }} />
  </div>
</Story>
