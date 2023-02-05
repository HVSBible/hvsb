import type { IMedia, IVerse } from '@hvsb/types';

export function placeMediaIntoVersesArray(verses: IVerse[], media: IMedia[]) {
  const versesWithMedia = verses.map((verse) => {
    const verseMedia = media.filter((medium) => medium.currentVerses.includes(verse.number));
    if (verseMedia.length) {
      verse.media = verseMedia;
    }
    return verse;
  });
  return versesWithMedia.filter((v) => v.media);
}

// export function placeMediaIntoVersesArray(verses: IVerse[], media: IMedia[]) {
//   const versesWithMedia = [];
//   media.forEach((medium) =>
//     medium.currentVerses.forEach((verseNumber) => {
//       const verse = verses[verseNumber - 1];
//       if (verse) {
//         if (!verse.media) {
//           verse.media = [];
//         }
//         verse.media.push(medium);
//         versesWithMedia.push(verse);
//       }
//     })
//   );
//   return versesWithMedia;
// }

if (import.meta.vitest) {
  test('placeMediaIntoVersesArray filters out verses without media.', () => {
    const mockVerses: IVerse[] = [
      {
        number: 1,
        offsetTop: 0,
      },
      {
        number: 2,
        offsetTop: 25,
      },
      {
        number: 3,
        offsetTop: 260,
      },
    ] as IVerse[];
    expect(placeMediaIntoVersesArray(mockVerses, [{ currentVerses: [1, 2] }, { currentVerses: [1] }] as IMedia[]))
      .toMatchInlineSnapshot(`
        [
          {
            "media": [
              {
                "currentVerses": [
                  1,
                  2,
                ],
              },
              {
                "currentVerses": [
                  1,
                ],
              },
            ],
            "number": 1,
            "offsetTop": 0,
          },
          {
            "media": [
              {
                "currentVerses": [
                  1,
                  2,
                ],
              },
            ],
            "number": 2,
            "offsetTop": 25,
          },
        ]
      `);
  });
}

// unneeded when using flex order (though note that makes the tab order irregular)
// function sortVideoMediaFirst(media: IMedia[]): IMedia[] {
//   return media.sort((a, b) => {
//     if (a.type === 'video' && b.type !== 'video') {
//       return -1;
//     }
//     if (a.type !== 'video' && b.type === 'video') {
//       return 1;
//     }
//     return 0;
//   });
// }
