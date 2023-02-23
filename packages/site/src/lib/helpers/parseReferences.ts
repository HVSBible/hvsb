// NOTES:

// check to see if Dr. House uses Philemon 12 or Phileman 1:12, Jude 20 or Jude 1:20 to refer to verses in books with only 1 chapter

// watch out to see if we need to convert 'en' dash: `–` or 'em' dash: `—` to a hyphen with `.replace(/\u2013|\u2014/g, "-")`

// split a text into paragraphs by newline to keep book location memory from leaking over into next paragraph


import { arrayOfBookNamesAbbreviations, getBookId } from "$lib/parts/data/books";

export interface Reference {
  bookId?: string;
  chapter: number;
  verseRange: string; // 1 | 5-7 | 4a | 3-4a
  start: number;
  end: number;
  text: string;
}

interface Location {
  start: number;
  end: number;
  text: string;
}

export function findReferencesInParagraph(string: string): Reference[] {
  const references: Reference[] = [];
  const bookNameLocations = getBookNameLocations(string);

  for (const [index, bookLocation] of bookNameLocations.entries()) {
    const nextLocation = bookNameLocations[index + 1];
    const endOfTextInfluencedByThisBookLocation = nextLocation?.start || string.length;
    const textInfluencedByThisBookLocation = string.slice(bookLocation.start, endOfTextInfluencedByThisBookLocation);
    const chapterVerseReferencesFromThisBookLocation = findChapterVerseReferences(textInfluencedByThisBookLocation);

    const bookId = getBookId(bookLocation.text);
    for (const chapterVerseReference of chapterVerseReferencesFromThisBookLocation) {
      const reference: Reference = {
        bookId,
        ...chapterVerseReference,
        start: bookLocation.start + chapterVerseReference.start,
        end: bookLocation.start + chapterVerseReference.end,
      }
      references.push(reference);
    }
  }
  
  return references;
}

const bookNamesAndAbbreviations = arrayOfBookNamesAbbreviations();
const longestToShortestBookNames = bookNamesAndAbbreviations.sort((a, b) => b.length - a.length);
// check for book abbreviations used in actual articles and pull additional ones like (I John vs 1 John) from https://github.com/phillipb/bible-verse-parser/blob/master/lib/ValidBookNames.ts if helpful

function getBookNameLocations(string: string): Location[] {
  const locations: Location[] = []
  // Find 1 John before John
  for (const name of longestToShortestBookNames) {
    const bookNameLocations = getBookIndexes(string, name);
    locations.push(...bookNameLocations);
  }
  const uniqueBookNameLocations = filterOutLocationsWithSameEnd(locations);
  const sortedByStartIndex = uniqueBookNameLocations.sort((a, b) => a.start - b.start);
  return sortedByStartIndex;
}

if (import.meta.vitest) {
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
}

function filterOutLocationsWithSameEnd(locations: Location[]) {
  const alreadyFoundEndIndexes: number[] = [];
  return locations.filter((location) => {
    if (alreadyFoundEndIndexes.includes(location.end)) return false;
    alreadyFoundEndIndexes.push(location.end); return true;
  });
}

if (import.meta.vitest) {
  test('filterOutLocationsWithSameEnd', () => {
    const locations: Location[] = [
      {
        start: 8,
        end: 15,
        text: 'Genesis',
      },
      {
        start: 52,
        end: 58,
        text: '1 John',
      },
      {
        start: 54,
        end: 58,
        text: 'John',
      },
    ]
    expect(filterOutLocationsWithSameEnd(locations)).toEqual([
      {
        start: 8,
        end: 15,
        text: 'Genesis',
      },
      {
        start: 52,
        end: 58,
        text: '1 John',
      },
    ]);
  });
}

function findChapterVerseReferences(string: string): Reference[] {
  const references: Reference[] = [];
  const chapterLocations = getChapterIndexes(string);
  for (const [chapterIndex, chapterLocation] of chapterLocations.entries()) {
    const nextLocation = chapterLocations[chapterIndex + 1];
    const endOfTextInfluencedByThisChapterLocation = nextLocation?.start || string.length;
    const textInfluencedByThisChapterLocation = string.slice(chapterLocation.end, endOfTextInfluencedByThisChapterLocation);

    const verseLocations = getVerseRangeIndexes(textInfluencedByThisChapterLocation);

    for (const [verseIndex, verseLocation] of verseLocations.entries()) {
      const isFirstReferenceForBook = chapterIndex === 0 && verseIndex === 0;
      const isFirstReferenceForChapter = verseIndex === 0;

      const verseStart = isFirstReferenceForBook ? 0 :
        isFirstReferenceForChapter ? chapterLocation.start :
          chapterLocation.end + verseLocation.start;

      const verseEnd = chapterLocation.end + verseLocation.end;

      const reference: Reference = {
        verseRange: verseLocation.text,
        chapter: parseInt(chapterLocation.text),
        start: verseStart,
        end: verseEnd,
        text: string.slice(verseStart, verseEnd),
      };
      references.push(reference);
    };
  }
  return references;
}

if (import.meta.vitest) {
  describe('parseReferencesForBookLocation', () => {
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
}

function getBookIndexes(string: string, bookName: string): Location[] {
  const caseInsensitiveWholeWordBookName = new RegExp(`\\b(${bookName})\\b`, 'ig');
  return getIndexes(string, caseInsensitiveWholeWordBookName);
}

if (import.meta.vitest) {
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
}

const NUMBERS_FOLLOWED_BY_COLON = new RegExp('([0-9]+):', 'g');

function getChapterIndexes(string: string): Location[] {
  return getIndexes(string, NUMBERS_FOLLOWED_BY_COLON);
}

if (import.meta.vitest) {
  test('getChapterIndexes', () => {
    expect(getChapterIndexes('. 2:3 and 14:2, 5')).toMatchInlineSnapshot(`
      [
        {
          "end": 3,
          "start": 2,
          "text": "2",
        },
        {
          "end": 12,
          "start": 10,
          "text": "14",
        },
      ]
    `);
  });
}

const NOT_PRECEEDED_BY_TEXT = '(?<!\\w\\s*)';
const CAPTURE_NUMBER_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS = '([0-9]+[a-zA-Z0-9-]*)';
const NUMBERS_NOT_PRECEEDED_BY_TEXT_BUT_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS = new RegExp(`${NOT_PRECEEDED_BY_TEXT}${CAPTURE_NUMBER_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS}`, 'g');

function getVerseRangeIndexes(string: string): Location[] {
  return getIndexes(string, NUMBERS_NOT_PRECEEDED_BY_TEXT_BUT_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS);
}

if (import.meta.vitest) {
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
}

function getIndexes(string: string, regex: RegExp): Location[] {
  const matches: Location[] = [];
  for (const match of string.matchAll(regex)) {
    const text = match[1];
    matches.push({
      start: match.index,
      end: match.index + text.length,
      text,
    });
  }
  return matches;
}