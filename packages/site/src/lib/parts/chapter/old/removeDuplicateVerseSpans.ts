export function removeDuplicateVerseSpans(html: string) {
  // Find all .verse-span elements in chapter
  const spans = html.match(
    /<span class="verse-span" data-verse-id="(.*?)" data-verse-org-ids="(.*?)">(.*?)(?:<\/span>)+/g
  );

  if (!spans) return html;

  // Find the location and verse of each .verse-span
  const spansData = spans.map((span) => {
    const startIndex = html.indexOf(span);
    const endIndex = startIndex + span.length;

    const [spanOpeningElement, verseId] = span.match(
      /<span class="verse-span" data-verse-id="(.*?)" data-verse-org-ids="(.*?)">/
    );
    return {
      verseId,
      startIndex,
      endIndex,
      spanOpeningElementLength: spanOpeningElement.length,
    };
  });

  const foundVerseIds = new Set([]);
  const duplicateSpans = spansData.filter((span) => {
    if (foundVerseIds.has(span.verseId))
      return true;

    foundVerseIds.add(span.verseId);
    return false;
  });

  let newHtml = html;
  for (const spanData of duplicateSpans) {
    const { startIndex, spanOpeningElementLength } = spanData;
    const underscores = new Array(spanOpeningElementLength + 1).join('_');
    newHtml =
      newHtml.slice(0, startIndex) +
      underscores +
      newHtml.slice(startIndex + spanOpeningElementLength);
  }
  return newHtml.replace(/<\/span>(_)+/g, '');
}

if (import.meta.vitest) {
  const gen1Html = `<p class="p"><span class="verse-span" data-verse-id="GEN.1.1" data-verse-org-ids="GEN.1.1"><span data-number="1" data-sid="GEN 1:1" class="v">1</span></span><span class="verse-span" data-verse-id="GEN.1.1" data-verse-org-ids="GEN.1.1">In the beginning, God</span><span class="verse-span" data-verse-id="GEN.1.1" data-verse-org-ids="GEN.1.1"> created the heavens and the earth. </span><span class="verse-span" data-verse-id="GEN.1.2" data-verse-org-ids="GEN.1.2"><span data-number="2" data-sid="GEN 1:2" class="v">2</span></span><span class="verse-span" data-verse-id="GEN.1.2" data-verse-org-ids="GEN.1.2">The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.</span></p>`;

  test('combineVerseSpansIntoOne takes content from multiple .verse-spans and places them into one.', () => {
    expect(removeDuplicateVerseSpans(gen1Html)).toMatchInlineSnapshot(
      '"<p class=\\"p\\"><span class=\\"verse-span\\" data-verse-id=\\"GEN.1.1\\" data-verse-org-ids=\\"GEN.1.1\\"><span data-number=\\"1\\" data-sid=\\"GEN 1:1\\" class=\\"v\\">1</span>In the beginning, God created the heavens and the earth. </span><span class=\\"verse-span\\" data-verse-id=\\"GEN.1.2\\" data-verse-org-ids=\\"GEN.1.2\\"><span data-number=\\"2\\" data-sid=\\"GEN 1:2\\" class=\\"v\\">2</span>The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.</span></p>"'
    );
  });

  const mat5Html = `<p class="p"><span class="verse-span" data-verse-id="MAT.5.1" data-verse-org-ids="MAT.5.1"><span data-number="1" data-sid="MAT 5:1" class="v">1</span></span><span class="verse-span" data-verse-id="MAT.5.1" data-verse-org-ids="MAT.5.1">Seeing the multitudes, he went up onto the mountain. When he had sat down, his disciples came to him. </span><span class="verse-span" data-verse-id="MAT.5.2" data-verse-org-ids="MAT.5.2"><span data-number="2" data-sid="MAT 5:2" class="v">2</span></span><span class="verse-span" data-verse-id="MAT.5.2" data-verse-org-ids="MAT.5.2">He opened his mouth and taught them, saying,</span></p><p class="q1"><span class="verse-span" data-verse-id="MAT.5.3" data-verse-org-ids="MAT.5.3"><span data-number="3" data-sid="MAT 5:3" class="v">3</span></span><span class="wj"><span class="verse-span" data-verse-id="MAT.5.3" data-verse-org-ids="MAT.5.3">“Blessed are the poor in spirit,</span></span></p><p data-vid="MAT 5:3" class="q2"><span class="wj"><span class="verse-span" data-verse-id="MAT.5.3" data-verse-org-ids="MAT.5.3">for theirs is the Kingdom of Heaven.</span></span></p><p class="q1"><span class="verse-span" data-verse-id="MAT.5.4" data-verse-org-ids="MAT.5.4"><span data-number="4" data-sid="MAT 5:4" class="v">4</span></span><span class="wj"><span class="verse-span" data-verse-id="MAT.5.4" data-verse-org-ids="MAT.5.4">Blessed are those who mourn,</span></span></p>`;

  test('combineVerseSpansIntoOne does not add underscores to MAT.5.', () => {
    expect(removeDuplicateVerseSpans(mat5Html)).toMatchInlineSnapshot(
      '"<p class=\\"p\\"><span class=\\"verse-span\\" data-verse-id=\\"MAT.5.1\\" data-verse-org-ids=\\"MAT.5.1\\"><span data-number=\\"1\\" data-sid=\\"MAT 5:1\\" class=\\"v\\">1</span>Seeing the multitudes, he went up onto the mountain. When he had sat down, his disciples came to him. </span><span class=\\"verse-span\\" data-verse-id=\\"MAT.5.2\\" data-verse-org-ids=\\"MAT.5.2\\"><span data-number=\\"2\\" data-sid=\\"MAT 5:2\\" class=\\"v\\">2</span>He opened his mouth and taught them, saying,</span></p><p class=\\"q1\\"><span class=\\"verse-span\\" data-verse-id=\\"MAT.5.3\\" data-verse-org-ids=\\"MAT.5.3\\"><span data-number=\\"3\\" data-sid=\\"MAT 5:3\\" class=\\"v\\">3</span></span><span class=\\"wj\\">______________________________________________________________________________“Blessed are the poor in spirit,</span></span></p><p data-vid=\\"MAT 5:3\\" class=\\"q2\\"><span class=\\"wj\\">______________________________________________________________________________for theirs is the Kingdom of Heaven.</span></span></p><p class=\\"q1\\"><span class=\\"verse-span\\" data-verse-id=\\"MAT.5.4\\" data-verse-org-ids=\\"MAT.5.4\\"><span data-number=\\"4\\" data-sid=\\"MAT 5:4\\" class=\\"v\\">4</span></span><span class=\\"wj\\">______________________________________________________________________________Blessed are those who mourn,</span></span></p>"'
    );
  });
}
