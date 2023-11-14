import type { IVerse } from '@hvsb/types';

export function uniqueVerseAttributes(verses: IVerse[]) {
  const uniqueVerses: IVerse[] = [];
  verses.forEach((verse) => {
    const verseIndex = uniqueVerses.findIndex((v) => v.id === verse.id);
    if (verseIndex === -1) {
      uniqueVerses.push(verse);
    } else {
      const existingVerse = uniqueVerses[verseIndex];
      if (verse.offsetTop < existingVerse.offsetTop)
        existingVerse.offsetTop = verse.offsetTop;

      if (verse.offsetBottom > existingVerse.offsetBottom)
        existingVerse.offsetBottom = verse.offsetBottom;

      existingVerse.element = verse.element;
    }
  });
  return uniqueVerses;
}

if (import.meta.vitest) {
  const verses = [
    {
      id: 'GEN.1.1',
      number: 1,
      offsetTop: -1,
      offsetBottom: 25,
      element: {},
    },
    {
      id: 'GEN.1.1',
      number: 1,
      offsetTop: -1,
      offsetBottom: 25,
      element: {},
    },
    {
      id: 'GEN.1.1',
      number: 1,
      offsetTop: -1,
      offsetBottom: 50,
      element: {},
    },
    {
      id: 'GEN.1.2',
      number: 2,
      offsetTop: 24,
      offsetBottom: 50,
      element: {},
    },
    {
      id: 'GEN.1.2',
      number: 2,
      offsetTop: 24,
      offsetBottom: 100,
      element: {},
    },
    {
      id: 'GEN.1.3',
      number: 3,
      offsetTop: 99,
      offsetBottom: 125,
      element: {},
    },
    {
      id: 'GEN.1.3',
      number: 3,
      offsetTop: 99,
      offsetBottom: 150,
      element: {},
    },
  ];

  test('uniqueVerseAttributes returns one object for each verse with the smallest offsetTop and biggest offsetBottom', () => {
    // @ts-ignore
    expect(uniqueVerseAttributes(verses)).toMatchInlineSnapshot(`
      [
        {
          "element": {},
          "id": "GEN.1.1",
          "number": 1,
          "offsetBottom": 50,
          "offsetTop": -1,
        },
        {
          "element": {},
          "id": "GEN.1.2",
          "number": 2,
          "offsetBottom": 100,
          "offsetTop": 24,
        },
        {
          "element": {},
          "id": "GEN.1.3",
          "number": 3,
          "offsetBottom": 150,
          "offsetTop": 99,
        },
      ]
    `);
  });
}
