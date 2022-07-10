import type { IMediaMetaData } from '.';
import type { TranslationFields } from './media-metadata.interface';

export interface IImage extends IMediaMetaData {
  published?: boolean;

  description?: string;
  description_translations?: TranslationFields;
  // keywords: string[];

  path: string; // FireStorage path
  gcs: string; // Google Cloud Storage serving url

  credit?: string[]; // Photographer, Author, or Permission source (e.g. museum)
  // photographer?: string; // deprecated
  location?: string[]; // Geographical or Source
  subject?: string;

  yearTaken?: number;
  sourceURL?: string; // Wikipedia public domain image for example

  genre: ImageGenre;
  // verse?: number; // used by notesService to extract current verse from appropriate verseId array item
  type: 'image' | 'skip';

  parents?: IImageParent[];
  // documentParentId?: string; // deprecated

  // uploadedBy?: { // deprecated
  //     uid: string,
  //     name: string
  // };
}

export interface IImageParent {
  parentId: string;
  chapterId: string;
}

export enum ImageGenres {
  artifact = 'Artifact',
  site = 'Site Study',
  biography = 'Biography',
  scenery = 'Scenery & Landscape',
  character = 'Bible Character', 
  story = 'Bible Story', 
  culture = 'Culture & Life', 
  structure = 'Structure', 
  
  // TODO: refactor to image.displayMedium
  artwork = 'Artwork', 
  chart = 'Chart',
  photograph = 'Photograph',  
  drawing = 'Drawing',
  painting = 'Painting',
  map = 'Map',
}

export type ImageGenre = keyof typeof ImageGenres;