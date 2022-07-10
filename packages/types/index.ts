import type { IAboutPage } from './about-page.interface';
import type { IAuthor } from './author.interface';
import type { IBook } from './book.interface';
import {
  DocumentGenres,
  type DocumentGenre,
  type IDocument,
  type IDocumentSection,
} from './document.interface';
import type { IFriend } from './friend.interface';
import { ImageGenres, type IImage, type IImageParent, type ImageGenre } from './image.interface';
import type { IIntro } from './intro.interface';
import type { ILocation } from './location.interface';
import type { IPhotographer } from './photographer.interface';
import type { IReference } from './reference.interface';
import type { ISubject } from './subject.interface';
import type { IUser, ISubscription } from './user.interface';
import type { IVerse } from './verse.interface';
import type { IVideo, IVimeoVideo } from './video.interface';
import type { IMediaMetaData } from './media-metadata.interface';
import type { ISupportMessage } from './support-message.interface';
import { LanguageMappings, type Languages, type ITranslatedField } from './languages.interface';
import type { ISeries } from './series.interface';
type IMedia = IDocument | IVideo | IImage;

export type {
  IAboutPage,
  IAuthor,
  IDocument,
  IDocumentSection,
  IFriend,
  IImage,
  IImageParent,
  IIntro,
  ILocation,
  IPhotographer,
  IReference,
  ISubject,
  IUser,
  ISubscription,
  IVerse,
  IVideo,
  IVimeoVideo,
  IMediaMetaData,
  IMedia,
  ISupportMessage,
  Languages,
  ITranslatedField,
  ISeries,
  DocumentGenre,
  ImageGenre,
  IBook,
};
export { DocumentGenres, ImageGenres, LanguageMappings };
