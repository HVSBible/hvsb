import { prepareChapterMedia, fetchBibleText, getChapterMedia } from '$lib/helpers/media';
import type { IReferenceProps } from './_reference-props.interface';

import type { LayoutLoad } from '@sveltejs/kit';
export const load: LayoutLoad = async ({ params }) => {
  const version: string = params.version;
  const bookId: string = params.bookId;
  const chapter: string = params.reference.match(/[0-9]*/)[0]; // return '12' in a '12.3-13.1' string

  const props: IReferenceProps = {
    version,
    bookId,
    chapter, // verse: page.params.reference[1],
  };

  const mediaPromise = getChapterMedia(bookId, chapter).catch((err) => (props.mediaErr = err));
  const textDataPromise = fetchBibleText(version, bookId, chapter).catch(
    (err) => (props.textErr = err)
  );

  const [media, textData] = await Promise.all([mediaPromise, textDataPromise]);

  if (!props.textErr) {
    if (textData) {
      const { content, next, previous } = textData;
      props.content = content;
      props.previousChapterId = (previous && previous.id) || null;
      props.nextChapterId = (next && next.id) || null;
    } else {
      props.textErr = 'No content for selected version, book, and chapter.';
    }
  }

  if (!props.mediaErr) {
    props.media = prepareChapterMedia(media, bookId, chapter);
  }

  return props;
};
