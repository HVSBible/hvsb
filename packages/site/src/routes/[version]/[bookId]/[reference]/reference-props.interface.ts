import type { IMedia } from '@hvsb/types';

export interface IReferenceProps {
  version: string;
  bookId: string;
  chapter: string;
  media?: IMedia[];
  content?: string;
  nextChapterId?: string;
  previousChapterId?: string;
  textErr?: string;
  mediaErr?: string;
}
