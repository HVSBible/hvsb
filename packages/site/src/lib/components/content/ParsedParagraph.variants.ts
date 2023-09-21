import type { Variants } from 'kitbook';
import type Component from './ParsedParagraph.svelte';

export const variants: Variants<typeof Component> = [
  {
    name: 'Normal references',
    props: {
      showVerseLinks: true,
      value: '<p>Zacharias was from the priestly family of Abijah... (Luke 1:7). When it was Zacharias’ turn... (Luke 1:59). Instantly after consenting to name the child John, Zacharias could speak again. Under the inspiration of prophesied that John would be “called the prophet of the Highest” (Luke 1:76)</p>'
    },
  },
  {
    name: 'Assumed reference (will not work)',
    description: 'We have no way to determine if "John says" means which of the four books by John so it must be spelled out as seen in the next example.',
    props: {
      showVerseLinks: true,
      value: 'The apostle John was talking to...  (Matt 24:23, 24). Then, as John says, they have never really been a part of the assembly of the believers (2:19).'
    },
  },
  {
    name: 'Make assumed reference clear',
    // height: 400,
    props: {
      showVerseLinks: true,
      value: 'The apostle John was talking to...  (Matt 24:23, 24). Then, as John says, they have never really been a part of the assembly of the believers (1 John 2:19). '
    },
  },
  {
    name: 'redundant chapter reference',
    props: {
      showVerseLinks: true,
      value: 'Acts 10:1-10:48 should be written as Acts 10:1-48 but at least the links will work'
    },
  },
  {
    name: 'External links work as normal',
    props: {
      showVerseLinks: true,
      value: 'Hello Genesis 1:2. And we can look at https://wikipedia.com to learn something else. Then turn to Exod. 2.'
    },
  },
].map(variant => {
  return {
    height: 100,
    ...variant,
  }
})
