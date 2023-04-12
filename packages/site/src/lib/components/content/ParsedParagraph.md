<script lang="ts">
  import { Story } from 'kitbook';
  import ParsedParagraph from './ParsedParagraph.svelte';
</script>

# Parsed Paragraph

<Story
  name="Use this Story to try out different paragraphs"
  height={150}
  knobs={{
    value:
      'Something in Gen 2:4 and continuing in the book of Genesis (Gen 5:1; 6:9-10; 10:1a; 11:10-12b, 27; 25:12, 19a; 36:1,9; 37:2)',
  }}
  let:knobs={{ value }}>
  <ParsedParagraph showVerseLinks {value} />
</Story>

Use the value box to the right to paste in a new value to try.
