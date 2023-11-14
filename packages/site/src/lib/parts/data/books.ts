import type { IBook } from '@hvsb/types';

// getBookName
export function bookName(bookId: string): string {
  const matchingBook = bibleBooks.find((book) => book.id === bookId);
  return matchingBook?.name || bookId;
}

if (import.meta.vitest) {
  test('getBookId', () => {
    expect(bookName('GEN')).toEqual('Genesis');
  });
}

// refactor to getBookAbbreviation
export function bookAbbrev(bookId: string): string {
  const matchingBook = bibleBooks.find((book) => book.id === bookId);
  return matchingBook?.abbreviation || bookId;
}

if (import.meta.vitest) {
  test('getBookId', () => {
    expect(bookAbbrev('GEN')).toEqual('Gen');
  });
}

export function getBookId(bookName: string): string | null {
  const matchingBook = bibleBooks.find((book) => {
    return book.name === bookName || book.abbreviation === bookName;
  });
  return matchingBook?.id || null;
}

if (import.meta.vitest) {
  test('getBookId', () => {
    expect(getBookId('Genesis')).toEqual('GEN');
    expect(getBookId('Gen')).toEqual('GEN');
  });
}

export function arrayOfBookNamesAbbreviations() {
  const abbreviations = bibleBooks.map(({ abbreviation }) => abbreviation);
  const names = bibleBooks.map(({ name }) => name);
  const uniqueNames = [...new Set([...abbreviations, ...names])]
  return uniqueNames;
}

if (import.meta.vitest) {
  test('arrayOfBookNamesAbbreviations', () => {
    expect(arrayOfBookNamesAbbreviations()).toMatchSnapshot();
  });
}

export const bibleBooks: IBook[] = [
  { ch: 50, abbreviation: 'Gen', name: 'Genesis', id: 'GEN' },
  { ch: 40, abbreviation: 'Exod', name: 'Exodus', id: 'EXO' },
  { ch: 27, abbreviation: 'Lev', name: 'Leviticus', id: 'LEV' },
  { ch: 36, abbreviation: 'Num', name: 'Numbers', id: 'NUM' },
  { ch: 34, abbreviation: 'Deut', name: 'Deuteronomy', id: 'DEU' },
  { ch: 24, abbreviation: 'Josh', name: 'Joshua', id: 'JOS' },
  { ch: 21, abbreviation: 'Judg', name: 'Judges', id: 'JDG' },
  { ch: 4, abbreviation: 'Ruth', name: 'Ruth', id: 'RUT' },
  { ch: 31, abbreviation: '1 Sam', name: '1 Samuel', id: '1SA' },
  { ch: 24, abbreviation: '2 Sam', name: '2 Samuel', id: '2SA' },
  { ch: 22, abbreviation: '1 Kgs', name: '1 Kings', id: '1KI' },
  { ch: 25, abbreviation: '2 Kgs', name: '2 Kings', id: '2KI' },
  { ch: 29, abbreviation: '1 Chr', name: '1 Chronicles', id: '1CH' },
  { ch: 36, abbreviation: '2 Chr', name: '2 Chronicles', id: '2CH' },
  { ch: 10, abbreviation: 'Ezra', name: 'Ezra', id: 'EZR' },
  { ch: 13, abbreviation: 'Neh', name: 'Nehemiah', id: 'NEH' },
  { ch: 10, abbreviation: 'Esth', name: 'Esther', id: 'EST' },
  { ch: 42, abbreviation: 'Job', name: 'Job', id: 'JOB' },
  { ch: 150, abbreviation: 'Ps', name: 'Psalms', id: 'PSA' },
  { ch: 31, abbreviation: 'Prov', name: 'Proverbs', id: 'PRO' },
  { ch: 12, abbreviation: 'Eccl', name: 'Ecclesiastes', id: 'ECC' },
  { ch: 8, abbreviation: 'Song', name: 'Song of Solomon', id: 'SNG' },
  { ch: 66, abbreviation: 'Isa', name: 'Isaiah', id: 'ISA' },
  { ch: 52, abbreviation: 'Jer', name: 'Jeremiah', id: 'JER' },
  { ch: 5, abbreviation: 'Lam', name: 'Lamentations', id: 'LAM' },
  { ch: 48, abbreviation: 'Ezek', name: 'Ezekiel', id: 'EZK' },
  { ch: 12, abbreviation: 'Dan', name: 'Daniel', id: 'DAN' },
  { ch: 14, abbreviation: 'Hos', name: 'Hosea', id: 'HOS' },
  { ch: 3, abbreviation: 'Joel', name: 'Joel', id: 'JOL' },
  { ch: 9, abbreviation: 'Amos', name: 'Amos', id: 'AMO' },
  { ch: 1, abbreviation: 'Obad', name: 'Obadiah', id: 'OBA' },
  { ch: 4, abbreviation: 'Jonah', name: 'Jonah', id: 'JON' },
  { ch: 7, abbreviation: 'Mic', name: 'Micah', id: 'MIC' },
  { ch: 3, abbreviation: 'Nah', name: 'Nahum', id: 'NAM' },
  { ch: 3, abbreviation: 'Hab', name: 'Habakkuk', id: 'HAB' },
  { ch: 3, abbreviation: 'Zeph', name: 'Zephaniah', id: 'ZEP' },
  { ch: 2, abbreviation: 'Hag', name: 'Haggai', id: 'HAG' },
  { ch: 14, abbreviation: 'Zech', name: 'Zechariah', id: 'ZEC' },
  { ch: 4, abbreviation: 'Mal', name: 'Malachi', id: 'MAL' },
  { ch: 28, abbreviation: 'Matt', name: 'Matthew', id: 'MAT' },
  { ch: 16, abbreviation: 'Mark', name: 'Mark', id: 'MRK' },
  { ch: 24, abbreviation: 'Luke', name: 'Luke', id: 'LUK' },
  { ch: 21, abbreviation: 'John', name: 'John', id: 'JHN' },
  { ch: 28, abbreviation: 'Acts', name: 'Acts', id: 'ACT' },
  { ch: 16, abbreviation: 'Rom', name: 'Romans', id: 'ROM' },
  { ch: 16, abbreviation: '1 Cor', name: '1 Corinthians', id: '1CO' },
  { ch: 13, abbreviation: '2 Cor', name: '2 Corinthians', id: '2CO' },
  { ch: 6, abbreviation: 'Gal', name: 'Galatians', id: 'GAL' },
  { ch: 6, abbreviation: 'Eph', name: 'Ephesians', id: 'EPH' },
  { ch: 4, abbreviation: 'Phil', name: 'Philippians', id: 'PHP' },
  { ch: 4, abbreviation: 'Col', name: 'Colossians', id: 'COL' },
  { ch: 5, abbreviation: '1 Thess', name: '1 Thessalonians', id: '1TH' },
  { ch: 3, abbreviation: '2 Thess', name: '2 Thessalonians', id: '2TH' },
  { ch: 6, abbreviation: '1 Tim', name: '1 Timothy', id: '1TI' },
  { ch: 4, abbreviation: '2 Tim', name: '2 Timothy', id: '2TI' },
  { ch: 3, abbreviation: 'Titus', name: 'Titus', id: 'TIT' },
  { ch: 1, abbreviation: 'Phlm', name: 'Philemon', id: 'PHM' },
  { ch: 13, abbreviation: 'Heb', name: 'Hebrews', id: 'HEB' },
  { ch: 5, abbreviation: 'Jas', name: 'James', id: 'JAS' },
  { ch: 5, abbreviation: '1 Pet', name: '1 Peter', id: '1PE' },
  { ch: 3, abbreviation: '2 Pet', name: '2 Peter', id: '2PE' },
  { ch: 5, abbreviation: '1 John', name: '1 John', id: '1JN' },
  { ch: 1, abbreviation: '2 John', name: '2 John', id: '2JN' },
  { ch: 1, abbreviation: '3 John', name: '3 John', id: '3JN' },
  { ch: 1, abbreviation: 'Jude', name: 'Jude', id: 'JUD' },
  { ch: 22, abbreviation: 'Rev', name: 'Revelation', id: 'REV' },
];
