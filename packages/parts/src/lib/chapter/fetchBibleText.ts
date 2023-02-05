// duplicated in main repo

export async function fetchBibleText(
  bookId: string,
  chapter: number,
  bibleId = '9879dbb7cfe39e4d-04'
) {
  try {
    const res = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${bookId}.${chapter}?include-verse-spans=true`,
      {
        headers: {
          'api-key': import.meta.env.VITE_bibleApi as string,
        },
      }
    );
    const json = await res.json(); // { data, meta } _BAPI.t(meta.fumsId);
    if (json.error) {
      throw new Error(json.message);
    }
    return json.data;
  } catch (err) {
    throw new Error(err);
  }
}
