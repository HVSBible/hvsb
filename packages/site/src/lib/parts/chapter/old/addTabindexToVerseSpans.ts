export function addTabindexToVerseSpans(html: string): string {
  if (html)
    return html.replace(/class="verse-span"/g, 'class="verse-span" tabindex="0"');

  return '';
}

if (import.meta.vitest) {
  const html = `"<p class="p"><span class="verse-span" data-verse-id="GEN.1.1" data-verse-org-ids="GEN.1.1"><span data-number="1" data-sid="GEN 1:1" class="v">1</span>In the beginning, God created the heavens and the earth. </span><span class="verse-span" data-verse-id="GEN.1.2" data-verse-org-ids="GEN.1.2"><span data-number="2" data-sid="GEN 1:2" class="v">2</span>The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.</span></p>"`;
  test('addTabindexToVerseSpans works', () => {
    expect(addTabindexToVerseSpans(html)).toMatchInlineSnapshot(
      '"\\"<p class=\\"p\\"><span class=\\"verse-span\\" tabindex=\\"0\\" data-verse-id=\\"GEN.1.1\\" data-verse-org-ids=\\"GEN.1.1\\"><span data-number=\\"1\\" data-sid=\\"GEN 1:1\\" class=\\"v\\">1</span>In the beginning, God created the heavens and the earth. </span><span class=\\"verse-span\\" tabindex=\\"0\\" data-verse-id=\\"GEN.1.2\\" data-verse-org-ids=\\"GEN.1.2\\"><span data-number=\\"2\\" data-sid=\\"GEN 1:2\\" class=\\"v\\">2</span>The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.</span></p>\\""'
    );
  });
}
