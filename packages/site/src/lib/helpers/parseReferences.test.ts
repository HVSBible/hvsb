import { findReferencesInParagraph } from "./parseReferences";

describe('parseReferences', () => {
  test('parses simple reference by itself', () => {
    expect(findReferencesInParagraph('Genesis 1:1')).toEqual([{
      bookId: 'GEN',
      chapter: 1,
      verseRange: "1",
      start: 0,
      end: 11,
      text: 'Genesis 1:1',
    }]);
  });
  
  // TODO: don't do this for book names that are also common names like John, otherwise we'll have John linked everywhere!
  test.fails('returns first chapter and verse if none given', () => {
    expect(findReferencesInParagraph('We see in this in Genesis.')).toEqual([{
      bookId: 'GEN',
      chapter: 1,
      verseRange: "1",
      start: 18,
      end: 25,
      text: 'Genesis',
    }]);
  });
  
  // TODO
  test.fails('returns first verse if book name is followed immediately by chapter number', () => {
    expect(findReferencesInParagraph('We see in this in Genesis 2.')).toEqual([{
      bookId: 'GEN',
      chapter: 2,
      verseRange: "1",
      start: 18,
      end: 27,
      text: 'Genesis 2',
    }]);
    expect(findReferencesInParagraph('We see in this in Gen. 2.')).toEqual([{
      bookId: 'GEN',
      chapter: 2,
      verseRange: "1",
      start: 18,
      end: 24,
      text: 'Gen. 2',
    }]);
  });

  // TODO: fix this edge case
  test.fails('trailing colon to explain something following a reference', () => {
    expect(findReferencesInParagraph('Remember what we see in Luke 16:10: 20 men!')).toEqual([{
      bookId: 'LUK',
      chapter: 16,
      verseRange: "10",
      start: 24,
      end: 34,
      text: 'Luke 16:10',
    }]);
  });

  test('does not parse ranges spanning chapters', () => {
    expect(findReferencesInParagraph('Genesis 1:1 - Genesis 2:1')).toEqual([
      {
        bookId: "GEN",
        chapter: 1,
        end: 11,
        start: 0,
        text: "Genesis 1:1",
        verseRange: "1",
      },
      {
        bookId: "GEN",
        chapter: 2,
        end: 25,
        start: 14,
        text: "Genesis 2:1",
        verseRange: "1",
      },
    ]);
  });

  test('handles a sentence full of references separated by commas', () => {
    expect(findReferencesInParagraph('Gen. 5:12, Exod. 4:10-23, John 1:1-2, 3:1-2, 5:7-8')).toMatchSnapshot();
  });

  test('handles Matt 5:1-2, 3, 3:1-2, 2 John 1:3 without marking the "2" in 2 John as verse 2 of Matthew 3', () => {
    expect(findReferencesInParagraph('Matt 5:1-2, 3, 3:1-2, 2 John 1:3')).toMatchSnapshot();
  });

  test('handles a conversational prose sentence with references', () => {
    expect(findReferencesInParagraph('If you go and read Gen 3:1-2, and 5:7-8, 12 then you will see 12 disciples.')).toMatchInlineSnapshot(`
      [
        {
          "bookId": "GEN",
          "chapter": 3,
          "end": 28,
          "start": 19,
          "text": "Gen 3:1-2",
          "verseRange": "1-2",
        },
        {
          "bookId": "GEN",
          "chapter": 5,
          "end": 39,
          "start": 34,
          "text": "5:7-8",
          "verseRange": "7-8",
        },
        {
          "bookId": "GEN",
          "chapter": 5,
          "end": 43,
          "start": 41,
          "text": "12",
          "verseRange": "12",
        },
      ]
    `);
  });
});