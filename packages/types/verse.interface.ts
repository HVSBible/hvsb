import type { IMedia } from '.';

export interface IVerse {
  id: string;
  number: number;
  offsetTop: number;
  offsetBottom: number;
  maxRestHeight?: number;
  element?: HTMLSpanElement;
  media?: IMedia[];
}
