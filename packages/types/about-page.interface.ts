// import { IDocumentSection } from './document.interface';
import type { IFirestoreMetaData } from 'sveltefirets';;

export interface IAboutPage extends IFirestoreMetaData {
  title: string;
  text: string;
  // sections: IDocumentSection[];
}
