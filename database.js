import { javascriptSnippets } from './javascript-snippets.js';
import { pythonSnippets } from './python-snippets.js';
import { webSnippets } from './web-snippets.js';

export const snippets = [
  {
    id: 'fetch-json', title: 'Fetch JSON from an API', language: 'JavaScript',
    description: 'Make an HTTP request and handle unsuccessful responses.',
    prompts: ['fetch data from an api', 'get json', 'http request', 'load remote data'],
    code: `async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP error: \${response.status}\`);
  }
  return response.json();
}

try {
  const data = await fetchJSON('/api/items');
  console.log(data);
} catch (error) {
  console.error('Could not load data:', error);
}`,
    note: 'Replace /api/items with your endpoint. Cross-origin endpoints must permit your origin through CORS.',
  },
  {
    id: 'debounce', title: 'Debounce a function', language: 'JavaScript',
    description: 'Wait until typing stops before running an expensive action.',
    prompts: ['debounce search input', 'delay function', 'wait after typing'],
    code: `function debounce(callback, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
}

const search = debounce((value) => console.log(value));
document.querySelector('input').addEventListener('input', (event) => {
  search(event.target.value);
});`,
    note: 'Requires an input element on the page. Each call cancels the previous pending call.',
  },
  {
    id: 'unique-array', title: 'Remove duplicates from an array', language: 'JavaScript',
    description: 'Keep the first occurrence of each primitive value.',
    prompts: ['unique array', 'remove duplicates from a list', 'deduplicate values'],
    code: `const values = [1, 2, 2, 3, 1, 4];
const unique = [...new Set(values)];
console.log(unique); // [1, 2, 3, 4]`,
    note: 'Objects are compared by reference, not by their contents.',
  },
  {
    id: 'local-storage', title: 'Save data in local storage', language: 'JavaScript',
    description: 'Store a JSON object in the browser between visits.',
    prompts: ['save data locally', 'localstorage', 'persist browser settings'],
    code: `const settings = { theme: 'dark', fontSize: 16 };

try {
  localStorage.setItem('settings', JSON.stringify(settings));
  const saved = JSON.parse(localStorage.getItem('settings') ?? 'null');
  console.log(saved);
} catch (error) {
  console.error('Storage unavailable or invalid data:', error);
}`,
    note: 'Storage is specific to the browser and origin. Do not store passwords or secrets here.',
  },
  {
    id: 'python-json', title: 'Read and write a JSON file', language: 'Python',
    description: 'Save structured data to disk using the standard library.',
    prompts: ['read json file', 'write json file', 'save python dictionary'],
    code: `import json
from pathlib import Path

path = Path('settings.json')
settings = {'theme': 'dark', 'font_size': 16}

path.write_text(json.dumps(settings, indent=2), encoding='utf-8')
loaded = json.loads(path.read_text(encoding='utf-8'))
print(loaded)`,
    note: 'Python 3. This writes settings.json in the current directory, replacing it if it exists.',
  },
  {
    id: 'python-csv', title: 'Read rows from a CSV file', language: 'Python',
    description: 'Read a spreadsheet-style file as a sequence of dictionaries.',
    prompts: ['parse csv', 'read csv file', 'load spreadsheet rows'],
    code: `import csv

with open('data.csv', newline='', encoding='utf-8') as file:
    for row in csv.DictReader(file):
        print(row)`,
    note: 'Create data.csv first. The first row must contain column names.',
  },
  {
    id: 'python-sort', title: 'Sort a list of dictionaries', language: 'Python',
    description: 'Order records by a field without modifying the original list.',
    prompts: ['sort list', 'sort dictionaries by key', 'order records by age'],
    code: `people = [
    {'name': 'Alex', 'age': 32},
    {'name': 'Sam', 'age': 24},
]

by_age = sorted(people, key=lambda person: person['age'])
print(by_age)`,
    note: 'All records must have the age key. Add reverse=True to sort in descending order.',
  },
  {
    id: 'css-grid', title: 'Build a responsive card grid', language: 'CSS',
    description: 'Let cards automatically fill the available width.',
    prompts: ['responsive grid', 'card layout', 'css columns', 'auto fit grid'],
    code: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 1.5rem;
}

.card {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
}`,
    note: 'Apply grid to the parent element and card to each child.',
  },
  {
    id: 'css-center', title: 'Center an element', language: 'CSS',
    description: 'Center content horizontally and vertically inside a container.',
    prompts: ['center a div', 'center element', 'align middle', 'flexbox center'],
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
}`,
    note: 'Apply container to the parent. Replace min-height to fit your layout.',
  },
  {
    id: 'html-form', title: 'Create an accessible contact form', language: 'HTML',
    description: 'Use native labels, validation, and autocomplete hints.',
    prompts: ['contact form', 'email form', 'html input validation'],
    code: `<form action="/contact" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" autocomplete="name" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <label for="message">Message</label>
  <textarea id="message" name="message" required></textarea>

  <button type="submit">Send message</button>
</form>`,
    note: 'You must implement the /contact server endpoint. This markup alone does not send email.',
  },
  {
    id: 'sql-group', title: 'Count records by category', language: 'SQL',
    description: 'Group rows and sort categories by their record count.',
    prompts: ['group by', 'count rows by category', 'aggregate records', 'sql count'],
    code: `SELECT category, COUNT(*) AS total
FROM products
GROUP BY category
ORDER BY total DESC;`,
    note: 'Replace products and category with your table and column names.',
  },
  {
    id: 'sql-join', title: 'Join two tables', language: 'SQL',
    description: 'Combine orders with customer names using a shared key.',
    prompts: ['join tables', 'inner join', 'combine customers and orders'],
    code: `SELECT orders.id, customers.name, orders.total
FROM orders
INNER JOIN customers
  ON orders.customer_id = customers.id;`,
    note: 'INNER JOIN returns only matching rows. Use LEFT JOIN to keep orders without a matching customer.',
  },
  ...javascriptSnippets,
  ...pythonSnippets,
  ...webSnippets,
];

const stopWords = new Set(['a', 'an', 'the', 'i', 'me', 'my', 'please', 'can', 'you', 'how', 'do', 'to', 'in', 'with', 'for', 'of', 'and', 'it', 'is', 'some', 'code', 'make', 'write', 'create']);
const aliases = { js: 'javascript', py: 'python', jsonfile: 'json', fetching: 'fetch', fetchingdata: 'fetch', centre: 'center' };

export function tokenize(text) {
  return [...new Set(text.toLowerCase().match(/[a-z0-9]+/g) ?? [])]
    .map((word) => aliases[word] ?? word)
    .filter((word) => !stopWords.has(word));
}

export function searchSnippets(database, query, language = 'All') {
  const terms = tokenize(query);
  return database.filter((entry) => language === 'All' || entry.language === language)
    .map((entry) => {
      const title = tokenize(entry.title);
      const keywords = tokenize(entry.prompts.join(' '));
      const details = tokenize(`${entry.description} ${entry.language}`);
      const weights = terms.map((term) => title.includes(term) ? 4 : keywords.includes(term) ? 3 : details.includes(term) ? 1 : 0);
      const matched = weights.filter(Boolean).length;
      return { entry, score: weights.reduce((sum, weight) => sum + weight, 0), matched, total: terms.length };
    })
    .filter((result) => !terms.length || result.matched >= Math.ceil(terms.length / 2))
    .sort((a, b) => b.matched / (b.total || 1) - a.matched / (a.total || 1) || b.score - a.score);
}

export function isSnippet(value) {
  return value !== null && typeof value === 'object'
    && ['id', 'title', 'language', 'description', 'code', 'note'].every((key) => typeof value[key] === 'string')
    && Boolean(value.id && value.title.trim() && value.code.trim())
    && ['JavaScript', 'Python', 'CSS', 'HTML', 'SQL'].includes(value.language)
    && Array.isArray(value.prompts) && value.prompts.every((prompt) => typeof prompt === 'string');
}
