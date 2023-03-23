import { findChapterVerseReferences, findReferencesInParagraph, getBookIndexes, getBookNameLocations, getChapterIndexes, getVerseRangeIndexes } from "./parseReferences";

describe('findReferencesInParagraph', () => {
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
  test.skip('returns first chapter and verse if none given', () => {
    expect(findReferencesInParagraph('We see in this in Genesis.')).toEqual([{
      bookId: 'GEN',
      chapter: 1,
      verseRange: "1",
      start: 18,
      end: 25,
      text: 'Genesis',
    }]);
  });
  
  test.skip('returns first verse if book name is followed immediately by chapter number', () => {
    expect(findReferencesInParagraph('We see in this in Genesis 2.')).toEqual([{
      bookId: 'GEN',
      chapter: 2,
      verseRange: "1",
      start: 18,
      end: 27,
      text: 'Genesis 2',
    }]);
    // expect(findReferencesInParagraph('We see in this in Gen. 2.')).toEqual([{
    //   bookId: 'GEN',
    //   chapter: 2,
    //   verseRange: "1",
    //   start: 18,
    //   end: 24,
    //   text: 'Gen. 2',
    // }]);
  });

  // TODO: fix this edge case if needed
  test.skip('trailing colon to explain something following a reference', () => {
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

test('getBookNameLocations', () => {
  expect(getBookNameLocations('This is Genesis 1:1 and Exod 2:5. Then we reference 1 John 2:1.')).toEqual([
    {
      start: 8,
      end: 15,
      text: 'Genesis',
    },
    {
      start: 24,
      end: 28,
      text: 'Exod',
    },
    {
      start: 52,
      end: 58,
      text: '1 John',
    },
  ]);
});

describe('findChapterVerseReferences', () => {
  test('basic', () => {
    expect(findChapterVerseReferences('Genesis 1:1')).toEqual([{
      text: 'Genesis 1:1',
      chapter: 1,
      verseRange: "1",
      start: 0,
      end: 11,
    }]);
  });

  test('chapter with multiple references', () => {
    expect(findChapterVerseReferences('John 5:1-2, 12')).toMatchInlineSnapshot(`
      [
        {
          "chapter": 5,
          "end": 10,
          "start": 0,
          "text": "John 5:1-2",
          "verseRange": "1-2",
        },
        {
          "chapter": 5,
          "end": 14,
          "start": 12,
          "text": "12",
          "verseRange": "12",
        },
      ]
    `);
  });

  test('chapter with multiple references', () => {
    expect(findChapterVerseReferences('John 3:1, 5:1-2, 12')).toMatchInlineSnapshot(`
      [
        {
          "chapter": 3,
          "end": 8,
          "start": 0,
          "text": "John 3:1",
          "verseRange": "1",
        },
        {
          "chapter": 5,
          "end": 15,
          "start": 10,
          "text": "5:1-2",
          "verseRange": "1-2",
        },
        {
          "chapter": 5,
          "end": 19,
          "start": 17,
          "text": "12",
          "verseRange": "12",
        },
      ]
    `);
  });

  test('sentence with three references', () => {
    expect(findChapterVerseReferences(`Gen. 1:1, 2:3, and 4:5-7 and some more here
     and else.`)).toEqual([
      {
        text: 'Gen. 1:1',
        chapter: 1,
        verseRange: "1",
        start: 0,
        end: 8,
      },
      {
        text: '2:3',
        chapter: 2,
        verseRange: "3",
        start: 10,
        end: 13,
      },
      {
        text: '4:5-7',
        chapter: 4,
        verseRange: "5-7",
        start: 19,
        end: 24,
      },
    ]);
  });
});

describe('getBookIndexes', () => {
  test('return start, end, and original text', () => {
    expect(getBookIndexes('Gen 1:1', 'Gen')).toEqual([{
      start: 0,
      end: 3,
      text: "Gen",
    }]);
    expect(getBookIndexes('This is Genesis 1:1', 'Genesis')).toEqual([{
      start: 8,
      end: 15,
      text: "Genesis",
    }]);
  });
  test('handles period after abbreviated book name', () => {
    expect(getBookIndexes('Matt. 5:2', 'Matt')).toEqual([{
      start: 0,
      end: 4,
      text: "Matt",
    }]);
  });
});

describe('getChapterIndexes', () => {
  test('handles chapter and verse anywhere', () => {
    expect(getChapterIndexes('. 2:3 and 14:2, 5')).toEqual([
      {
        "start": 2,
        "end": 3,
        "text": "2",
      },
      {
        "start": 10,
        "end": 12,
        "text": "14",
      },
    ]);
  });
  test('handles just chapter immediately at beginning, after space or period and space', () => {
    expect(getChapterIndexes(' 2 is a place to read...')).toEqual([
      {
        "start": 1,
        "end": 2,
        "text": "2",
      },
    ]);
    expect(getChapterIndexes('. 2.')).toEqual([
      {
        "start": 2,
        "end": 3,
        "text": "2",
      },
    ]);
  });
});

describe('getVerseRangeIndexes', () => {
  test('captures verse', () => {
    expect(getVerseRangeIndexes('3 and ')).toEqual([
      {
        "end": 1,
        "start": 0,
        "text": "3",
      },
    ]);
  });

  test('handles ranges, and multiple verses following commas or semicolons', () => {
    expect(getVerseRangeIndexes('3a-5, 7; 12, ')).toEqual([
      {
        "end": 4,
        "start": 0,
        "text": "3a-5",
      },
      {
        "end": 7,
        "start": 6,
        "text": "7",
      },
      {
        "end": 11,
        "start": 9,
        "text": "12",
      },
    ]);
  });

  test('does not get verse indexes for numbers coming after words', () => {
    expect(getVerseRangeIndexes('3 and 12 sheep.')).toEqual([
      {
        "end": 1,
        "start": 0,
        "text": "3",
      },
    ]);
  });
});