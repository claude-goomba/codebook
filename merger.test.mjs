import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeSnippets } from './merger.js';
import { snippets } from './database.js';

test('combines code in selected order without changing source snippets', () => {
  const entries = snippets.filter((entry) => entry.language === 'JavaScript').slice(0, 3);
  const original = structuredClone(entries);
  assert.equal(mergeSnippets(entries), entries.map((entry) => entry.code).join('\n\n'));
  assert.equal(mergeSnippets([entries[1], entries[0]]), `${entries[1].code}\n\n${entries[0].code}`);
  assert.deepEqual(entries, original);
});

test('requires at least two distinct snippets of the same language', () => {
  assert.throws(() => mergeSnippets([]), /at least two/);
  assert.throws(() => mergeSnippets([snippets[0]]), /at least two/);
  assert.throws(() => mergeSnippets([snippets[0], snippets[0]]), /only once/);
  assert.throws(() => mergeSnippets([snippets[0], snippets.find((entry) => entry.language === 'Python')]), /same language/);
});

test('supports every library language and preserves code as literal text', () => {
  for (const language of ['JavaScript', 'Python', 'HTML', 'CSS', 'SQL']) {
    const entries = snippets.filter((entry) => entry.language === language).slice(0, 2);
    assert.equal(mergeSnippets(entries), `${entries[0].code}\n\n${entries[1].code}`);
  }
  const code = '<script>"unsafe"</script>\n${literal}\n`text`';
  assert.equal(mergeSnippets([{ id: 'a', language: 'HTML', code }, { id: 'b', language: 'HTML', code }]), `${code}\n\n${code}`);
});
