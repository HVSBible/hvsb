import type { IFirestoreMetaData } from 'sveltefirets';;

export interface IAuthor extends IFirestoreMetaData {
  name: string;
}
