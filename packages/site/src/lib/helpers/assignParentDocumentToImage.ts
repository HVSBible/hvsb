import { page } from '$app/stores';
import { get } from 'svelte/store';
import type { IImageParent, IDocumentSection } from '@hvsb/types';
import { updateOnline } from 'sveltefirets';
import { arrayUnion } from 'firebase/firestore/lite';

export async function assignParentDocumentToImage(documentId: string, imageId: string) {
  try {
    const $page = get(page);

    const newParent: IImageParent = {
      parentId: documentId,
      chapterId: `${$page.params.bookId}.${$page.params.reference}`,
    };

    const updateImage = updateOnline(`media/${imageId}`, {
      parents: arrayUnion(newParent),
    });

    const newSection: IDocumentSection = {
      contentType: 'image',
      imageId,
    };
    const updateDocument = updateOnline(`media/${documentId}`, {
      sections: arrayUnion(newSection),
    });

    await Promise.all([updateImage, updateDocument]);
    window.location.replace(
      `/${$page.params.version}/${$page.params.bookId}/${$page.params.reference}/doc/${documentId}`
    );
  } catch (err) {
    alert(`Error updating image: ${err}.`);
    throw new Error(`Error updating image: ${err}.`);
  }
}
