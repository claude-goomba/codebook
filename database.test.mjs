import test from 'node:test';
import assert from 'node:assert/strict';
import { snippets, searchSnippets, isSnippet } from './database.js';

test('built-in database has valid entries and unique IDs', () => {
  assert.equal(snippets.length, 112);
  assert.ok(snippets.every(isSnippet));
  assert.equal(new Set(snippets.map((entry) => entry.id)).size, snippets.length);
  assert.equal(new Set(snippets.map((entry) => entry.code.trim())).size, snippets.length);
  for (const entry of snippets) {
    assert.ok(entry.description.trim(), entry.id);
    assert.ok(entry.note.trim(), entry.id);
    assert.ok(entry.prompts.length >= 3 && entry.prompts.every((prompt) => prompt.trim()), entry.id);
  }
});

test('all original snippets remain and language totals include 100 additions', () => {
  const originalIds = ['fetch-json', 'debounce', 'unique-array', 'local-storage',
    'python-json', 'python-csv', 'python-sort', 'css-grid', 'css-center',
    'html-form', 'sql-group', 'sql-join'];
  for (const id of originalIds) assert.ok(snippets.some((entry) => entry.id === id), id);
  for (const [language, count] of Object.entries({ JavaScript: 29, Python: 28, CSS: 22, HTML: 16, SQL: 17 })) {
    assert.equal(snippets.filter((entry) => entry.language === language).length, count, language);
  }
});

test('every snippet is discoverable by its title and matching prompts', () => {
  for (const entry of snippets) {
    assert.equal(searchSnippets(snippets, entry.title, entry.language)[0]?.entry.id, entry.id);
    for (const prompt of entry.prompts) {
      assert.ok(searchSnippets(snippets, prompt, entry.language).some((result) => result.entry.id === entry.id), `${entry.id}: ${prompt}`);
    }
  }
});

test('natural-language prompts find the appropriate saved snippet', () => {
  for (const [query, id] of [
    ['how do i fetch data from an api', 'fetch-json'],
    ['please center a div', 'css-center'],
    ['read json file in py', 'python-json'],
    ['remove duplicates from an array', 'unique-array'],
    ['join tables', 'sql-join'],
  ]) assert.equal(searchSnippets(snippets, query)[0]?.entry.id, id, query);
});

test('unknown requests do not invent answers', () => {
  assert.deepEqual(searchSnippets(snippets, 'quantum teleportation'), []);
  assert.deepEqual(searchSnippets(snippets, 'build multiplayer spaceship simulator'), []);
});

test('browse, language filtering, and punctuation work', () => {
  assert.equal(searchSnippets(snippets, '').length, snippets.length);
  assert.ok(searchSnippets(snippets, '', 'Python').every(({ entry }) => entry.language === 'Python'));
  assert.equal(searchSnippets(snippets, 'FETCH JSON!!!', 'JavaScript')[0].entry.id, 'fetch-json');
  assert.deepEqual(searchSnippets(snippets, 'center div', 'SQL'), []);
});

test('custom entries are searchable and malformed stored data is rejected', () => {
  const custom = { ...snippets[0], id: 'custom-test', title: 'Banana widget', prompts: ['banana widget'] };
  assert.equal(searchSnippets([...snippets, custom], 'banana widget')[0].entry.id, 'custom-test');
  for (const value of [null, {}, { ...custom, code: '' }, { ...custom, prompts: [null] }]) {
    assert.equal(isSnippet(value), false);
  }
});
