import { findReferencesInParagraph, type Reference } from "$lib/helpers/parseReferences/parseReferences";

export function turnReferencesIntoLinks(html: string, references: Reference[]): any {
  let currentIndex = 0;
  let result = "";

  references.forEach((reference) => {
    const link = `<a href="/${reference.bookId}/${reference.chapter}/${reference.verseRange}">${reference.text}</a>`;

    const start = reference.start;
    const end = reference.end;

    result += html.slice(currentIndex, start) + link;
    currentIndex = end;
  });

  result += html.slice(currentIndex);

  return result;
}

if (import.meta.vitest) {
  describe('turnReferencesIntoLinks', () => {
    test('1 instance', () => {
      const value = "Hello Genesis 1:2 and let's talk about something.";
      const references = findReferencesInParagraph(value);
      const result = turnReferencesIntoLinks(value, references);

      expect(result).toMatchInlineSnapshot('"Hello <a href=\\"/GEN/1/2\\">Genesis 1:2</a> and let\'s talk about something."');
    });

    test('2 instances', () => {
      const value = "Hello Genesis 1:2 and let's talk about Exod 13.";
      const references = findReferencesInParagraph(value);
      const result = turnReferencesIntoLinks(value, references);

      expect(result).toMatchInlineSnapshot('"Hello <a href=\\"/GEN/1/2\\">Genesis 1:2</a> and let\'s talk about <a href=\\"/EXO/13/1\\">Exod 13</a>."');
    });
  })
}
