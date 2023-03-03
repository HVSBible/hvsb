import { getBibleId } from './versions';
import { PUBLIC_BIBLE_API } from '$env/static/public';
export async function getChapters(version: string, bookId: string): Promise<number> {
  const bibleId = await getBibleId(version);

  const res = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`,
    {
      headers: {
        'api-key': PUBLIC_BIBLE_API,
      },
    }
  );
  const { data } = await res.json();
  return data.length - 1; // subtract 1 for introduction
}

export async function getNumberOfVerses(version: string, chapterId: string): Promise<number> {
  const bibleId = await getBibleId(version);

  const res = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`,
    {
      headers: {
        'api-key': PUBLIC_BIBLE_API,
      },
    }
  );
  const { data } = await res.json();
  return data.length;
}
