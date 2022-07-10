import type { IVerse } from '@hvsb/types';

// makes sure the next verse offsetTop is at least the size of the thumbnail box greater than previous verse offsetTop
export function spaceOutVerseMedia(verses: IVerse[], thumbBox: number): IVerse[] {
  return verses.map((verse, index) => {
    const prevVerse = verses[index - 1];
    if (prevVerse) {
      const spaceBetweenVerses = verse.offsetTop - prevVerse.offsetTop;
      if (spaceBetweenVerses < thumbBox) {
        verse.offsetTop = prevVerse.offsetTop + thumbBox;
      }
    }
    return verse;
  });
}

export function setMaxHeightOnMediaBasedOnNextVerseOffsetTop(
  verses: IVerse[],
  thumbBox: number
): IVerse[] {
  return verses.map((verse, index) => {
    const nextVerse = verses[index + 1];
    if (nextVerse) {
      let maxHeight = nextVerse.offsetTop - verse.offsetTop;
      maxHeight = Math.floor(maxHeight / thumbBox) * thumbBox;
      verse.maxRestHeight = maxHeight;
    }
    return verse;
  });
}

if (import.meta.vitest) {
  test('spaceOutVerseMedia and setMaxHeightOnMediaBasedOnNextVerseOffsetTop properly spaces out media.', () => {
    const mockVerses: IVerse[] = [
      {
        offsetTop: 0,
      },
      {
        offsetTop: 25,
      },
      {
        offsetTop: 25,
      },
      {
        offsetTop: 250,
      },
      {
        offsetTop: 260,
      },
    ] as IVerse[];
    expect(setMaxHeightOnMediaBasedOnNextVerseOffsetTop(spaceOutVerseMedia(mockVerses, 44), 44))
      .toMatchInlineSnapshot(`
        [
          {
            "maxRestHeight": 44,
            "offsetTop": 0,
          },
          {
            "maxRestHeight": 44,
            "offsetTop": 44,
          },
          {
            "maxRestHeight": 132,
            "offsetTop": 88,
          },
          {
            "maxRestHeight": 44,
            "offsetTop": 250,
          },
          {
            "offsetTop": 294,
          },
        ]
      `);
  });
}
