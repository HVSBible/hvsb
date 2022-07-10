export async function getBibleId(version: string): Promise<string> {
  const { bibles } = await import('$lib/mappings/bibles');
  const matchingBible = bibles.find((bible) => {
    return bible.abbreviation === version;
  });
  if (matchingBible) {
    return matchingBible.id;
  } else {
    throw new Error('Not a valid Bible version');
  }
}
