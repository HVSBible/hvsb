import { getBibleId } from './versions';

export async function getChapters(version: string, bookId: string): Promise<number> {
  const bibleId = await getBibleId(version);

  const res = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`,
    {
      headers: {
        'api-key': import.meta.env.VITE_bibleApi as string,
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
        'api-key': import.meta.env.VITE_bibleApi as string,
      },
    }
  );
  const { data } = await res.json();
  return data.length;
}
