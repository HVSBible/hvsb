import type { IDocument, IImage, IVideo } from '@hvsb/types';

export function unduplicate(media: IDocument | IImage | IVideo, verseId: string) {
  // remove verseId
  const index = media.verseIds.indexOf(verseId);
  if (index !== -1) media.verseIds.splice(index, 1);

  // reset bookId and chapterId arrays
  media.bookIds = [];
  media.chapterIds = [];

  // add applicable bookIds and chapterIds for remaining verseIds
  for (const v of media.verseIds) {
    const [bookId, chapter] = v.split('.');
    const chapterId = `${bookId}.${chapter}`;

    if (!media.bookIds.includes(bookId)) media.bookIds.push(bookId);
    if (!media.chapterIds.includes(chapterId)) media.chapterIds.push(chapterId);
  }

  return media;
}

if (import.meta.vitest) {
  test('unduplicate properly removes GEN.1.1 (verseId) without removing bookId and chapterId', () => {
    const media: IDocument = {
      bookIds: ['MAT', 'GEN'],
      chapterIds: ['MAT.1', 'GEN.1', 'GEN.18'],
      verseIds: ['MAT.1.1', 'GEN.1.1', 'GEN.1.18', 'GEN.18.16'],
      genre: 'biography',
      type: 'document',
      sections: [],
    };
    expect(unduplicate(media, 'GEN.1.1')).toMatchInlineSnapshot(`
      {
        "bookIds": [
          "MAT",
          "GEN",
        ],
        "chapterIds": [
          "MAT.1",
          "GEN.1",
          "GEN.18",
        ],
        "genre": "biography",
        "sections": [],
        "type": "document",
        "verseIds": [
          "MAT.1.1",
          "GEN.1.18",
          "GEN.18.16",
        ],
      }
    `);
  });
}
