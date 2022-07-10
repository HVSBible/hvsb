import type { IFirestoreMetaData } from 'sveltefirets';;

export interface ISubject extends IFirestoreMetaData {
  name: string;
}
