# Bible Texts

Scripture is provided by the powerful [API.Bible](https://scripture.api.bible/) service provided by the American Bible Society.

## Fetch from API.Bible

1. To get started, obtain an API key from [API.Bible](https://scripture.api.bible/).
2. Fetch data on the chapters a book contains:

```ts
const res = await fetch(
  'https://api.scripture.api.bible/v1/bibles/<bibleId>/books/<bookId>/chapters',
  {
    headers: {
      'api-key': import.meta.env.VITE_bibleApi,
    },
  }
);
const json = await res.json();
```

3. Fetch the text from a particular chapter: `https://api.scripture.api.bible/v1/bibles/<bibleId>/chapters/<bookId>.<chapter>?include-verse-spans=true`
4. Fetch a particular verse, e.g. `https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-04/verses/1JN.1.1`

## Unused Sources

- Did not use [GetBible api](https://getbible.net/api), e.g. [1 John 3](https://getbible.net/v2/kjv/62/3.json).


## TODO:

Note message: using `window.fetch`. For best results, use the `fetch` that is passed to your `load` function: https://kit.svelte.dev/docs/loading#input-fetch