<script lang="ts">
  import { Story } from 'kitbook';
  import PreviewImage from './PreviewImage.svelte';

  import type { Hit } from 'instantsearch.js';
  import type { IImage, IMedia } from '@hvsb/types';
  let image: Partial<Hit & IImage> = {
    id: 'fakeImageId',
    chapterIds: ['GEN.1'],
    verseIds: ['GEN.1.1'],
    gcs: 'f4v90F_jpZOz3zxq8FqG6HkDI0lTIyWzP572nlt7ZXHdljjB00fqkeA7X-_i94SYESzgiOi51k04pRIdONJYPg'
  };

  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  const chapterMedia = writable<Partial<IMedia>[]>([
    { type: 'document', id: 'docIdsomething', title: 'The Tombs' },
    { type: 'document', id: 'docIdsomething2', title: 'The Catacombs' },
  ]);
  setContext('chapterMedia', chapterMedia);
</script>

# Image Previews

<Story name="null title" knobs={{ published: false, admin: true }} let:props={{ published, admin }}>
  <div class="p-2">
    <PreviewImage on:assignParent={(e) =>
      alert(
        `Make documentId of ${e.detail.documentId} a parent of imageId of ${e.detail.imageId}`
      )} {admin} image={{ ...image, published, title: null }} />
  </div>
</Story>

<Story
  name="unpublished image with a description"
  knobs={{ published: false }}
  let:props={{ published }}>
  <div class="p-2">
    <PreviewImage
      image={{ ...image, published, genre: 'site', description: 'How it all came about' }} />
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
    <PreviewImage image={{ ...image, genre: 'artwork', title, published, currentVerses: [2, 8] }} />
  </div>
</Story>
