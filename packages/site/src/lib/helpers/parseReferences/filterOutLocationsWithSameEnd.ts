import type { Location } from './parseReferences'

export function filterOutLocationsWithSameEnd(locations: Location[]) {
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
