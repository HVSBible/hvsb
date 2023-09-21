import { number } from './number';

export function addLeadingZeros(number: number, type: 'ten' | 'hundred' = 'ten'): string {
  if (type === 'ten')
    return number < 10 ? `0${number}` : `${number}`;

  if (number < 10)
    return `00${number}`;
  else if (number < 100)
    return `0${number}`;

  return `${number}`;


}

console.log(addLeadingZeros(number, 'hundred'));

if (import.meta.vitest) {
  test('addLeadingZeros properly returns string from 3, 12, 55, 100, and 110', () => {
    expect(addLeadingZeros(3)).toBe('03');
    expect(addLeadingZeros(12)).toBe('12');
    expect(addLeadingZeros(55)).toBe('55');

    expect(addLeadingZeros(2)).toMatchInlineSnapshot('"02"')
    expect(addLeadingZeros(2, 'hundred')).toMatchInlineSnapshot('"002"')

    expect(addLeadingZeros(10)).toMatchInlineSnapshot('"10"')
    expect(addLeadingZeros(10, 'hundred')).toMatchInlineSnapshot('"010"')

    expect(addLeadingZeros(55)).toMatchInlineSnapshot('"55"')
    expect(addLeadingZeros(55, 'hundred')).toMatchInlineSnapshot('"055"')

    expect(addLeadingZeros(119, 'hundred')).toMatchInlineSnapshot('"119"')
  })
}
