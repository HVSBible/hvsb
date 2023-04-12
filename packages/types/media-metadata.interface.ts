import type { IFirestoreMetaData } from 'sveltefirets';
import type { Languages } from '.';

export interface IMediaMetaData extends IFirestoreMetaData {
  title?: string; // TODO: ensure that title exists before saving article
  title_translations?: TranslationFields;
  published?: boolean;
  seriesIds?: string[];
  editorNotes?: string;

  bookIds: string[]; // GEN
  chapterIds: string[]; // GEN.1
  verseIds: string[]; // GEN.1.1

  // added based on runtime parameters
  currentVerses?: number[];
  selected?: boolean;
}

export type TranslationFields = {
  [bcp in Languages]?: string;
};
