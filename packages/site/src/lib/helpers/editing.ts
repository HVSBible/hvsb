import type { IImageParent, IDocumentSection, IAuthor, ILocation } from '@hvsb/types';
import { updateOnline } from 'sveltefirets';
import { arrayRemove } from 'firebase/firestore/lite';

export async function unlinkFromParentDocument(
  bookId: string,
  chapter: string,
  imageId: string,
  documentId: string
) {
  try {
    const parentToRemove: IImageParent = {
      parentId: documentId,
      chapterId: `${bookId}.${chapter}`,
    };
    const updateImage = updateOnline(`media/${imageId}`, {
      parents: arrayRemove(parentToRemove),
    });

    const sectionToRemove: IDocumentSection = {
      contentType: 'image',
      imageId,
    };
    const updateDocument = updateOnline(`media/${documentId}`, {
      sections: arrayRemove(sectionToRemove),
    });

    await Promise.all([updateImage, updateDocument]);
  } catch (err) {
    alert(`Error unlinking image from parent document. Refresh and try again. ${err}`);
  }
}

export function isAddingAttributeToDB(
  attributesInDB: (IAuthor | ILocation)[],
  attributeBeingUsed: string
): boolean {
  return !!attributesInDB.filter((attribute) => attribute.name === attributeBeingUsed).length;
}
