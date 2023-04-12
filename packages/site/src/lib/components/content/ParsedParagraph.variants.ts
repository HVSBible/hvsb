import type { Variants } from 'kitbook';
import type Component from './ParsedParagraph.svelte';
export const variants: Variants<typeof Component> = [
  {
    // name: 'Desktop',
    description: 'First paragraph',
    props: {
      showVerseLinks: true,
      value: 'Hello Genesis 1:2. And we can look at https://wikipedia.com to learn something else. Then turn to Exod. 2.'
    },
  },
]