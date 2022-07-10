import algoliasearch from 'algoliasearch';
const APP_ID = 'ZZG6DI40DK';
// TODO: get keys
// @ts-ignore
import algoliaKeys from './algolia-admin-key.json';
const ADMIN_KEY = algoliaKeys.adminKey;
const client = algoliasearch(APP_ID, ADMIN_KEY);

client.copySettings('media_dev', 'media_prod').then(() => {
  console.log('settings copied');
});

// client.copyIndex('media_prod', 'media_dev').then(() => {
//     console.log('copied media_prod index to media_dev index')
// });
// https://www.algolia.com/doc/api-reference/api-methods/copy-index/?client=javascript#examples
