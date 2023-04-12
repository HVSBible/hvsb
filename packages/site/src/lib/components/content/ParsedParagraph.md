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
      'Starting with Gen 2:4 and continuing in the book of Genesis (Gen 5:1; 6:9; 10:1; 11:10, 27; 25:12, 19; 36:1,9; 37:2)',
  }}
  let:knobs={{ value }}>
  <ParsedParagraph showVerseLinks {value} />
</Story>
