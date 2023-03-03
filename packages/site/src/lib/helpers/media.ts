import { browser } from '$app/environment';
import type { IMedia, IImageParent } from '@hvsb/types';
import { getBibleId } from '$lib/helpers/versions';
import { getCollection } from 'sveltefirets';
import { orderBy, where } from 'firebase/firestore';
import { PUBLIC_BIBLE_API } from '$env/static/public';
import { admin } from '$lib/stores';
import { get } from 'svelte/store';

export async function getChapterMedia(
  bookId: string,
  chapter: string
): Promise<IMedia[]> {
  if (browser && get(admin) > 0) return getAllChapterMedia(bookId, chapter);
  return await getCollection<IMedia>('media', [
    where('chapterIds', 'array-contains', `${bookId}.${chapter}`),
    where('published', '==', true),
    orderBy('type'),
  ]);
}

export async function getAllChapterMedia(
  bookId: string,
  chapter: string
): Promise<IMedia[]> {
  return await getCollection<IMedia>('media', [
    where('chapterIds', 'array-contains', `${bookId}.${chapter}`),
    orderBy('type'),
  ]);
}

export async function getContributorsChapterMedia(
  bookId: string,
  chapter: string,
  uid: string,
): Promise<IMedia[]> {
  return await getCollection<IMedia>('media', [
    where('chapterIds', 'array-contains', `${bookId}.${chapter}`),
    where('createdBy', '==', uid),
    orderBy('type'),
  ]);
}

export function prepareChapterMedia(
  media: IMedia[],
  bookId: string,
  chapter: string
): (IMedia)[] {
  media = media.map((medium) => {
    if (imageHasParentInChapter(medium, bookId, chapter)) {
      medium.type = 'skip';
    }
    medium.currentVerses = getCurrentVerses(medium.verseIds, bookId, chapter);
    return medium;
  });
  // media = media.filter(medium => {
  //   return medium.type != 'skip';
  // })
  media.sort((a, b) => a.currentVerses[0] - b.currentVerses[0]);
  return media;
}

function imageHasParentInChapter(
  medium: IMedia,
  bookId: string,
  chapter: string
): boolean {
  if (medium.type === 'image' && medium.parents) {
    const parents: IImageParent[] = medium.parents;
    return parents.some((p) => p.chapterId === `${bookId}.${chapter}`);
  } else {
    return false;
  }
}

export function getCurrentVerses(verseIds: string[], bookId: string, chapter: string): number[] {
  return verseIds
    .filter((v) => v.includes(`${bookId}.${chapter}.`))
    .map((v) => +v.split('.').pop()) // +v.match(/(\d*)$/)[0];
    .sort((a, b) => a - b);
}


export async function fetchBibleText(version = 'WEB', bookId: string, chapter: string) {
  try {
    const bibleId = version === 'WEB' ? '9879dbb7cfe39e4d-04' : await getBibleId(version);

    const res = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${bookId}.${chapter}?include-verse-spans=true`,
      {
        headers: {
          'api-key': PUBLIC_BIBLE_API,
        },
      }
    );
    const json = await res.json(); // { data, meta } _BAPI.t(meta.fumsId);
    // if (json.error) {
    //   throw new Error(json.message);
    // }
    return json.data;
  } catch (err) {
    throw new Error(err);
  }
}
