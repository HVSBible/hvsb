import { arrayOfBookNamesAbbreviations, getBookId } from "$lib/parts/data/books";
import { filterOutLocationsWithSameEnd } from "./filterOutLocationsWithSameEnd";

// NOTES:
// check to see if Dr. House uses Philemon 12 or Phileman 1:12, Jude 20 or Jude 1:20 to refer to verses in books with only 1 chapter
// watch out to see if we need to convert 'en' dash: `–` or 'em' dash: `—` to a hyphen with `.replace(/\u2013|\u2014/g, "-")`
// split a text into paragraphs by newline to keep book location memory from leaking over into next paragraph

export interface Reference {
  bookId?: string;
  chapter: number;
  verseRange: string; // 1 | 5-7 | 4a | 3-4a
  start: number;
  end: number;
  text: string;
}

export interface Location {
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

    const bookName = bookLocation.text;

    const chapterVerseReferencesFromThisBookLocation = findChapterVerseReferences(textInfluencedByThisBookLocation, bookName);

    const bookId = getBookId(bookName);
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

export function getBookNameLocations(string: string): Location[] {
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

export function findChapterVerseReferences(string: string, bookName: string): Reference[] {
  const references: Reference[] = [];
  const chapterLocations = getChapterIndexes(string, bookName);

  for (const [chapterIndex, chapterLocation] of chapterLocations.entries()) {
    const chapter = parseInt(chapterLocation.text);

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

      references.push({
        verseRange: verseLocation.text,
        chapter,
        start: verseStart,
        end: verseEnd,
        text: string.slice(verseStart, verseEnd),
      });
    };

    const chapterReferenceWithoutVerses = !verseLocations.length;
    if (chapterReferenceWithoutVerses) {
      const bookStart = 0;
      references.push({
        verseRange: "1",
        chapter,
        start: bookStart,
        end: chapterLocation.end,
        text: string.slice(bookStart, chapterLocation.end),
      });
    }
  }
  return references;
}

export function getBookIndexes(string: string, bookName: string): Location[] {
  const caseInsensitiveWholeWordBookName = new RegExp(`\\b(${bookName})\\b`, 'ig');
  return getIndexes(string, caseInsensitiveWholeWordBookName);
}

const NUMBERS_FOLLOWED_BY_COLON = /(\d+):/g;

export function getChapterIndexes(string: string, bookName: string): Location[] {
  const locations: Location[] = []

  const BOOK_OPTIONAL_PERIOD_FOLLOWED_BY_CHAPTER = new RegExp(`(?<=^${bookName}\\.?\\s)(\\d+)`, 'g'); // using positive lookbehind to ensure right after bookName without actually including those characters in the match index
  const initialChapter = getIndexes(string, BOOK_OPTIONAL_PERIOD_FOLLOWED_BY_CHAPTER);
  locations.push(...initialChapter);

  const chaptersWithVerses = getIndexes(string, NUMBERS_FOLLOWED_BY_COLON);
  chaptersWithVerses.forEach(location => {
    if (initialChapter[0]?.start !== location.start) locations.push(location)
  })

  return locations;
}

const LETTER_AT_BEGINNING_OF_WORD = /\b[a-zA-Z]/;
const BRACKET_OR_PERIOD = /[[.]/;
const combinedPattern = new RegExp(`${LETTER_AT_BEGINNING_OF_WORD.source}|${BRACKET_OR_PERIOD.source}`);

const NOT_PRECEEDED_BY_TEXT_OR_HYPHEN = /(?<!\w\s*-?)/;
const CAPTURE_NUMBER_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS = /(\b[0-9]+[a-zA-Z0-9-]*)/;
const NUMBERS_NOT_PRECEEDED_BY_TEXT_BUT_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS = new RegExp(`${NOT_PRECEEDED_BY_TEXT_OR_HYPHEN.source}${CAPTURE_NUMBER_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS.source}`, 'g');

export function getVerseRangeIndexes(string: string): Location[] {
  const charactersBeforeFirstWord = string.split(combinedPattern)[0] || string;
  return getIndexes(charactersBeforeFirstWord, NUMBERS_NOT_PRECEEDED_BY_TEXT_BUT_OPTIONALLY_FOLLOWED_BY_NUMBERS_HYPHEN_OR_LETTERS);
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