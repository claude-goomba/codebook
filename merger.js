export function mergeSnippets(entries) {
  if (entries.length < 2) throw new Error('Choose at least two snippets to merge.');
  if (new Set(entries.map((entry) => entry.id)).size !== entries.length) {
    throw new Error('Choose each snippet only once.');
  }
  if (entries.some((entry) => entry.language !== entries[0].language)) {
    throw new Error('Choose snippets in the same language.');
  }
  return entries.map((entry) => entry.code).join('\n\n');
}
