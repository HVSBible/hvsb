import type { IFirestoreMetaData } from 'sveltefirets';

export interface ISupportMessage extends IFirestoreMetaData {
  message: string;
  email: string;
  name: string;
  url: string;
}
