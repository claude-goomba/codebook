import { snippets, searchSnippets, isSnippet } from './database.js';
import { mergeSnippets } from './merger.js';

const storageKey = 'codebook.snippets.v1';
const languages = ['All', 'JavaScript', 'Python', 'HTML', 'CSS', 'SQL'];
const $ = (selector) => document.querySelector(selector);
let custom = [];
let language = 'All';
let toastTimer;
let selected = [];
let mergedEntries = [];
let generatedCode = '';

function notify(message) {
  $('#toast').textContent = message;
  $('#toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 5000);
}

try {
  const stored = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
  if (!Array.isArray(stored) || !stored.every(isSnippet)
    || new Set(stored.map((entry) => entry.id)).size !== stored.length
    || stored.some((entry) => snippets.some((builtIn) => builtIn.id === entry.id))) {
    throw new Error('Invalid library');
  }
  custom = stored;
} catch {
  notify('Saved snippets could not be loaded. Built-in snippets are still available.');
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function render() {
  const database = [...snippets, ...custom];
  const query = $('#query').value.trim();
  const matches = searchSnippets(database, query, language);
  $('#total').textContent = database.length;
  $('#result-count').textContent = matches.length;
  $('#results-heading').firstChild.textContent = query ? 'Matching snippets ' : 'The snippet library ';
  $('#result-description').textContent = query
    ? `Keyword matches for "${query}". Code is returned exactly as saved.`
    : 'A few useful building blocks. Ready when you are.';
  $('#empty').hidden = matches.length > 0;
  $('#results').replaceChildren();
  $('#languages').replaceChildren();

  for (const name of languages) {
    const button = element('button', `language-button${language === name ? ' selected' : ''}`);
    button.setAttribute('aria-pressed', String(language === name));
    button.append(element('span', `language-dot ${name.toLowerCase()}`), element('span', '', name === 'All' ? 'All languages' : name));
    button.append(element('span', 'language-count', database.filter((entry) => name === 'All' || entry.language === name).length));
    button.addEventListener('click', () => { language = name; render(); });
    $('#languages').append(button);
  }

  for (const { entry, matched, total } of matches) {
    const card = element('article', 'snippet-card');
    const meta = element('div', 'card-meta');
    meta.append(element('span', `language-tag ${entry.language.toLowerCase()}`, entry.language));
    meta.append(element('span', 'source-label', custom.includes(entry) ? 'YOUR SNIPPET' : 'BUILT-IN'));
    card.append(meta, element('h3', '', entry.title), element('p', 'card-description', entry.description));
    const details = element('details', 'code-details');
    const summary = element('summary', '', 'View code');
    const pre = element('pre');
    pre.append(element('code', '', entry.code));
    details.append(summary, pre, element('p', 'usage-note', entry.note || 'No usage notes provided.'));
    const actions = element('div', 'card-actions');
    actions.append(element('span', 'match-label', total ? `${matched}/${total} keywords matched` : `${entry.code.split('\n').length} lines of code`));
    const copy = element('button', 'copy-button', 'Copy code');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(entry.code);
        notify('Code copied to clipboard.');
      } catch {
        details.open = true;
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(pre);
        selection.removeAllRanges();
        selection.addRange(range);
        notify('Clipboard unavailable. Code selected; press Ctrl+C or Cmd+C to copy.');
      }
    });
    actions.append(copy);
    const merge = element('button', 'copy-button merge-toggle', selected.some((item) => item.id === entry.id) ? 'Selected' : 'Merge');
    merge.setAttribute('aria-label', `Select ${entry.title} for Merger`);
    merge.setAttribute('aria-pressed', String(selected.some((item) => item.id === entry.id)));
    merge.addEventListener('click', () => {
      if (selected.some((item) => item.id === entry.id)) {
        selected = selected.filter((item) => item.id !== entry.id);
      } else {
        if (selected.length && selected[0].language !== entry.language) {
          notify('Merger combines one language at a time. Clear its selection to switch languages.');
          return;
        }
        selected.push(entry);
      }
      render();
      renderMerger();
    });
    actions.append(merge);
    if (custom.includes(entry)) {
      const remove = element('button', 'delete-button', 'Delete');
      remove.setAttribute('aria-label', `Delete ${entry.title}`);
      remove.addEventListener('click', () => {
        if (!window.confirm(`Delete "${entry.title}" from your library?`)) return;
        const next = custom.filter((item) => item.id !== entry.id);
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
          custom = next;
          selected = selected.filter((item) => item.id !== entry.id);
          renderMerger();
          render();
          notify('Snippet deleted.');
        } catch { notify('Could not save changes. Your snippet was not deleted.'); }
      });
      actions.append(remove);
    }
    card.append(details, actions);
    $('#results').append(card);
  }
}

function renderMerger() {
  $('#merge-count').textContent = selected.length;
  $('#merge-empty').hidden = selected.length > 0;
  $('#generate-merge').disabled = selected.length < 2;
  $('#clear-merge').disabled = !selected.length && !mergedEntries.length;
  $('#merge-list').replaceChildren();
  selected.forEach((entry, index) => {
    const row = element('li', 'merge-item');
    row.append(element('span', 'merge-item-title', entry.title));
    const controls = element('div', 'merge-item-controls');
    for (const [label, offset] of [['Up', -1], ['Down', 1], ['Remove', 0]]) {
      const button = element('button', 'copy-button', label);
      button.setAttribute('aria-label', `${label}: ${entry.title}`);
      button.disabled = offset !== 0 && (index + offset < 0 || index + offset >= selected.length);
      button.addEventListener('click', () => {
        if (!offset) selected.splice(index, 1);
        else [selected[index], selected[index + offset]] = [selected[index + offset], selected[index]];
        renderMerger();
        render();
        const nextRow = $('#merge-list').children[Math.min(offset ? index + offset : index, selected.length - 1)];
        (nextRow?.querySelector('button:not(:disabled)') || $('#close-merger')).focus();
      });
      controls.append(button);
    }
    row.append(controls);
    $('#merge-list').append(row);
  });
  $('#merge-error').textContent = mergedEntries.length && (
    selected.length !== mergedEntries.length || selected.some((entry, index) => entry.id !== mergedEntries[index]?.id)
  ) ? 'Selection changed. Combine again to update the output; the current draft is still available.' : '';
}

$('#open-merger').addEventListener('click', () => {
  renderMerger();
  $('#merger-dialog').showModal();
});
$('#close-merger').addEventListener('click', () => $('#merger-dialog').close());
$('#generate-merge').addEventListener('click', () => {
  if ($('#merge-output').value !== generatedCode && !window.confirm('Replace your edited draft with the selected snippets?')) return;
  try {
    generatedCode = mergeSnippets(selected);
    mergedEntries = [...selected];
    $('#merge-output').value = generatedCode;
    $('#merge-output').disabled = false;
    $('#merge-language').textContent = mergedEntries[0].language;
    $('#save-merge').disabled = false;
    $('#copy-merge').disabled = false;
    renderMerger();
    $('#merge-output').focus();
  } catch (error) { $('#merge-error').textContent = error.message; }
});
$('#merge-output').addEventListener('input', () => {
  const empty = !$('#merge-output').value.trim();
  $('#save-merge').disabled = empty;
  $('#copy-merge').disabled = empty;
});
$('#clear-merge').addEventListener('click', () => {
  if ($('#merge-output').value && !window.confirm('Clear the selection and discard this merged draft?')) return;
  selected = [];
  mergedEntries = [];
  generatedCode = '';
  $('#merge-output').value = '';
  $('#merge-output').disabled = true;
  $('#merge-language').textContent = '';
  $('#save-merge').disabled = true;
  $('#copy-merge').disabled = true;
  renderMerger();
  render();
});
$('#copy-merge').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('#merge-output').value);
    notify('Merged code copied.');
  } catch {
    $('#merge-output').focus();
    $('#merge-output').select();
    $('#merge-error').textContent = 'Clipboard unavailable. Code selected; press Ctrl+C or Cmd+C to copy.';
  }
});
$('#save-merge').addEventListener('click', () => {
  const code = $('#merge-output').value;
  if (!code.trim() || !mergedEntries.length) return;
  if (code.length > 30000) {
    $('#merge-error').textContent = 'Saved snippets are limited to 30,000 characters. Shorten the draft or copy it instead.';
    return;
  }
  const form = $('#add-form');
  if ([...form.querySelectorAll('input, textarea')].some((input) => input.value) && !window.confirm('Replace the unfinished Add a snippet form with this merged draft?')) return;
  const values = {
    title: `Merged: ${mergedEntries.map((entry) => entry.title).join(' + ')}`.slice(0, 100),
    language: mergedEntries[0].language,
    description: `Combined ${mergedEntries.length} ${mergedEntries[0].language} snippets. Review and adapt before running.`,
    prompts: [...new Set(mergedEntries.flatMap((entry) => entry.prompts))].join('\n').slice(0, 2000),
    code,
    note: 'Combined with Merger. Review naming conflicts, dependencies, and execution order. Original usage notes remain in the source snippets.',
  };
  for (const [key, value] of Object.entries(values)) form.elements.namedItem(key).value = value;
  $('#merger-dialog').close();
  openAdd();
});

$('#search-form').addEventListener('submit', (event) => { event.preventDefault(); render(); });
$('#query').addEventListener('input', render);
$('#browse').addEventListener('click', () => { $('#query').value = ''; language = 'All'; render(); });
for (const button of document.querySelectorAll('[data-query]')) {
  button.addEventListener('click', () => {
    $('#query').value = button.dataset.query;
    language = button.dataset.language || 'All';
    render();
  });
}

function openAdd() {
  $('#form-error').textContent = '';
  $('#snippet-dialog').showModal();
}
$('#open-add').addEventListener('click', openAdd);
$('#empty-add').addEventListener('click', openAdd);
$('#close-dialog').addEventListener('click', () => $('#snippet-dialog').close());
$('#add-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const entry = Object.fromEntries(['title', 'language', 'description', 'code', 'note'].map((key) => [key, data.get(key).trim()]));
  entry.id = `custom-${crypto.randomUUID()}`;
  entry.prompts = data.get('prompts').split('\n').map((prompt) => prompt.trim()).filter(Boolean);
  if (!isSnippet(entry) || !entry.description || !entry.prompts.length) {
    $('#form-error').textContent = 'Add a title, description, code, and at least one matching prompt.';
    return;
  }
  const next = [...custom, entry];
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    $('#form-error').textContent = 'Could not save. Browser storage may be full or disabled. Your form is still here.';
    return;
  }
  custom = next;
  language = entry.language;
  $('#query').value = entry.title;
  event.currentTarget.reset();
  $('#snippet-dialog').close();
  render();
  notify('Snippet saved. Your library just got a little smarter, without AI.');
});

render();
renderMerger();
