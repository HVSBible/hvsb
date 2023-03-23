import type { Variants } from 'kitbook';
import type Component from './ParsedParagraph.svelte';
export const variants: Variants<typeof Component> = [
  {
    name: 'Desktop',
    description: 'First paragraph',
    width: 800,
    height: 600,
    props: {
      value: 'Hello world. Genesis 1:2. And we can look at https://wikipedia.com to learn...'
    },
  },
]