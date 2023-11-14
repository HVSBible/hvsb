import { findReferencesInParagraph, type Reference } from '$lib/helpers/parseReferences/parseReferences';

export function turnReferencesIntoLinks({ html, references, version, mediaId, mediaType }: { html: string, references: Reference[], version?: string, mediaId?: string, mediaType?: 'doc' | 'img' }): any {
  let currentIndex = 0;
  let result = '';

  references.forEach((reference) => {
    const link = constructReferenceLink({ version, reference, mediaId, mediaType });

    const {start} = reference;
    const {end} = reference;

    result += html.slice(currentIndex, start) + link;
    currentIndex = end;
  });

  result += html.slice(currentIndex);

  return result;
}

if (import.meta.vitest) {
  describe('turnReferencesIntoLinks', () => {
    test('1 instance within a doc', () => {
      const html = 'Hello Gen 1:2 and let\'s talk about something.';
      const references = findReferencesInParagraph(html);
      const result = turnReferencesIntoLinks({ html, references, version: 'WEB', mediaType: 'doc', mediaId: 'fooId' });
      expect(result).toEqual(`Hello <a href="/WEB/GEN/1/doc/fooId?vv=GEN.1.2">Gen 1:2</a> and let's talk about something.`);
    });

    test('2 instances from not inside media', () => {
      const html = 'Hello Genesis 1:2 and let\'s talk about Exod 13.';
      const references = findReferencesInParagraph(html);
      const result = turnReferencesIntoLinks({ html, references });
      expect(result).toEqual(`Hello <a href="/WEB/GEN/1?vv=GEN.1.2">Genesis 1:2</a> and let's talk about <a href="/WEB/EXO/13">Exod 13</a>.`);
    });
  })
}

const DEFAULT_VERSION = 'WEB'
function constructReferenceLink({ reference, version, mediaType, mediaId }: { reference: Reference, version?: string, mediaType?: 'doc' | 'img', mediaId?: string }): string {
  const _version = version || DEFAULT_VERSION;
  const verseRangeQueryParam = reference.verseRange ? `?vv=${reference.bookId}.${reference.chapter}.${reference.verseRange}` : '';

  if (mediaType && mediaId)
    return `<a href="/${_version}/${reference.bookId}/${reference.chapter}/${mediaType}/${mediaId}${verseRangeQueryParam}">${reference.text}</a>`;

  // default: linked to from elsewhere (intro or other place on site)
  return `<a href="/${_version}/${reference.bookId}/${reference.chapter}${verseRangeQueryParam}">${reference.text}</a>`;
}

if (import.meta.vitest) {
  describe('constructReferenceLink', () => {
    const reference: Reference = {
      bookId: 'GEN',
      chapter: 1,
      verseRange: '1-2',
      text: 'Gen 1:1-2',
      start: 0,
      end: 7,
    };

    test('default', () => {
      const version = 'ABC';
      const result = constructReferenceLink({ version, reference });
      expect(result).toEqual(`<a href="/ABC/GEN/1?vv=GEN.1.1-2">Gen 1:1-2</a>`);
    });

    test('handles doc', () => {
      const result = constructReferenceLink({ reference, mediaType: 'doc', mediaId: 'fooId' });
      expect(result).toEqual(`<a href="/WEB/GEN/1/doc/fooId?vv=GEN.1.1-2">Gen 1:1-2</a>`);
    });

    test('handles img', () => {
      const result = constructReferenceLink({ reference, mediaType: 'img', mediaId: 'fooId' });
      expect(result).toEqual(`<a href="/WEB/GEN/1/img/fooId?vv=GEN.1.1-2">Gen 1:1-2</a>`);
    });

    test('do not add "?vv=..." ending if no verseRange', () => {
      const referenceWithNoVerseRange: Reference = {
        bookId: 'GEN',
        chapter: 1,
        text: 'Gen 1',
        start: 0,
        end: 4,
      }
      const result = constructReferenceLink({ reference: referenceWithNoVerseRange, mediaType: 'img', mediaId: 'fooId' });
      expect(result).toEqual(`<a href="/WEB/GEN/1/img/fooId">Gen 1</a>`);
    });
  })
}
