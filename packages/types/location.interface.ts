import type { IFirestoreMetaData } from 'sveltefirets';

export interface ILocation extends IFirestoreMetaData {
  name: string;
  coordinates?: any;
}
