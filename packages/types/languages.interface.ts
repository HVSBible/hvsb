export enum LanguageMappings {
  es = 'Spanish',
  ru = 'Russian',
  fr = 'French',
  zh = 'Chinese',
  ko = 'Korean',
  de = 'German',
  ar = 'Arabic',
  to = 'Tongan',
}
// add more codes from https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

export type Languages = keyof typeof LanguageMappings;

export interface ITranslatedField {
  language: Languages;
  mediaId: string;
  field: 'title_translations' | 'description_translations' | 'section';
  sectionIndex?: number;
  translation: string;
}
