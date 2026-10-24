export const javascriptSnippets = [
  {
    id: 'js-group-records', title: 'Group records by a field', language: 'JavaScript',
    description: 'Collect related records into arrays stored in a Map.',
    prompts: ['group products by category', 'organize records into groups', 'collect items with the same field'],
    code: `const products = [
  { name: 'Tea', category: 'drinks' },
  { name: 'Bread', category: 'food' },
  { name: 'Coffee', category: 'drinks' },
];
const groups = new Map();
for (const product of products) {
  const bucket = groups.get(product.category) ?? [];
  bucket.push(product);
  groups.set(product.category, bucket);
}
console.log(groups.get('drinks'));`,
    note: 'Runs in modern browsers or Node.js. Map accepts arbitrary keys without object prototype collisions; grouped records still reference the originals.',
  },
  {
    id: 'js-index-records', title: 'Index records by ID', language: 'JavaScript',
    description: 'Build a lookup table for repeated access to records.',
    prompts: ['look up a user by id', 'index records for fast access', 'turn records into an id map'],
    code: `const users = [
  { id: 'u1', name: 'Alex' },
  { id: 'u2', name: 'Sam' },
];
const byId = new Map(users.map((user) => [user.id, user]));
console.log(byId.get('u2'));
console.log(byId.has('u3'));`,
    note: 'Runs in modern browsers or Node.js. Duplicate IDs keep the last record, and get returns undefined for a missing ID.',
  },
  {
    id: 'js-sort-records', title: 'Sort records by multiple fields', language: 'JavaScript',
    description: 'Order scores descending and use names to break ties without mutating the input.',
    prompts: ['sort players by score and name', 'order records without changing the original', 'break sorting ties with another field'],
    code: `const players = [
  { name: 'Sam', score: 12 },
  { name: 'Alex', score: 12 },
  { name: 'Lee', score: 18 },
];
const sorted = [...players].sort((a, b) =>
  b.score - a.score || a.name.localeCompare(b.name, 'en')
);
console.log(sorted);`,
    note: 'Runs in modern browsers or Node.js. Assumes finite numeric scores and string names. The array is copied, but its record objects are shared.',
  },
  {
    id: 'js-chunk-array', title: 'Split an array into batches', language: 'JavaScript',
    description: 'Create fixed-size chunks with a possibly shorter final batch.',
    prompts: ['split a list into batches', 'chunk an array by size', 'process items in groups of three'],
    code: `function chunk(items, size) {
  if (!Number.isSafeInteger(size) || size < 1) {
    throw new RangeError('Batch size must be a positive safe integer');
  }
  const batches = [];
  for (let index = 0; index < items.length; index += size) {
    batches.push(items.slice(index, index + size));
  }
  return batches;
}

console.log(chunk([1, 2, 3, 4, 5], 2));`,
    note: 'Runs in modern browsers or Node.js. Empty input returns an empty array. Each batch is a shallow copy, and the original array is unchanged.',
  },
  {
    id: 'js-partition-array', title: 'Partition items by a condition', language: 'JavaScript',
    description: 'Separate matching and nonmatching records in one pass.',
    prompts: ['separate completed and pending tasks', 'split items by a condition', 'partition a list into two arrays'],
    code: `const tasks = [
  { title: 'Plan', done: true },
  { title: 'Build', done: false },
  { title: 'Review', done: false },
];
const completed = [];
const pending = [];
for (const task of tasks) {
  (task.done ? completed : pending).push(task);
}
console.log({ completed, pending });`,
    note: 'Runs in modern browsers or Node.js. Relative order is preserved within each partition. Both arrays hold references to the original records.',
  },
  {
    id: 'js-sum-cart', title: 'Calculate a cart total in cents', language: 'JavaScript',
    description: 'Multiply quantities by integer prices and sum the line totals.',
    prompts: ['calculate a shopping cart total', 'sum prices times quantities', 'add money using integer cents'],
    code: `const cart = [
  { name: 'Notebook', priceCents: 450, quantity: 2 },
  { name: 'Pen', priceCents: 125, quantity: 3 },
];
const totalCents = cart.reduce(
  (total, item) => total + item.priceCents * item.quantity,
  0
);
console.log(totalCents); // 1275`,
    note: 'Runs in modern browsers or Node.js. Assumes validated nonnegative integer prices and quantities, with totals within the safe integer range. Taxes and currency-specific rounding need separate rules.',
  },
  {
    id: 'js-flatmap-records', title: 'Flatten nested records with context', language: 'JavaScript',
    description: 'Expand each order into individual lines while retaining its order ID.',
    prompts: ['flatten order items into rows', 'keep parent ids when flattening records', 'expand nested arrays with flatMap'],
    code: `const orders = [
  { id: 'a1', items: ['Tea', 'Bread'] },
  { id: 'a2', items: ['Coffee'] },
];
const lines = orders.flatMap((order) =>
  order.items.map((item) => ({ orderId: order.id, item }))
);
console.log(lines);`,
    note: 'Runs in modern browsers or Node.js. flatMap flattens exactly one array level. Orders with empty item arrays contribute no rows.',
  },
  {
    id: 'js-zip-arrays', title: 'Pair values from two arrays', language: 'JavaScript',
    description: 'Zip corresponding positions together up to the shorter array length.',
    prompts: ['pair two arrays by index', 'zip names with scores', 'combine corresponding list values'],
    code: `function zip(left, right) {
  return Array.from(
    { length: Math.min(left.length, right.length) },
    (_, index) => [left[index], right[index]]
  );
}

console.log(zip(['Alex', 'Sam', 'Lee'], [10, 20]));`,
    note: 'Runs in modern browsers or Node.js. Extra values in the longer array are deliberately discarded; validate equal lengths first if that would indicate an error.',
  },
  {
    id: 'js-count-values', title: 'Count occurrences of values', language: 'JavaScript',
    description: 'Build a frequency table without converting keys to strings.',
    prompts: ['count how often each value appears', 'build a frequency table', 'tally votes in an array'],
    code: `const votes = ['tea', 'coffee', 'tea', 'water', 'tea'];
const counts = new Map();
for (const vote of votes) {
  counts.set(vote, (counts.get(vote) ?? 0) + 1);
}
console.log([...counts.entries()]);`,
    note: 'Runs in modern browsers or Node.js. Keys retain their types; objects are counted by identity rather than content. Map iteration follows first-seen order.',
  },
  {
    id: 'js-pick-fields', title: 'Select allowed object fields', language: 'JavaScript',
    description: 'Construct a new object containing only explicitly allowed own properties.',
    prompts: ['pick specific fields from an object', 'create an object from allowed keys', 'select public profile properties'],
    code: `const profile = { id: 7, name: 'Alex', email: 'alex@example.com' };
const allowed = ['id', 'name', 'nickname'];
const publicProfile = Object.fromEntries(
  allowed
    .filter((key) => Object.hasOwn(profile, key))
    .map((key) => [key, profile[key]])
);
console.log(publicProfile);`,
    note: 'Requires Object.hasOwn in modern browsers or Node.js 16.9+. Missing keys are omitted, and nested values are shared. Server-side authorization is still required for private data.',
  },
  {
    id: 'js-omit-fields', title: 'Omit fields from a copied object', language: 'JavaScript',
    description: 'Remove named top-level properties without changing the source.',
    prompts: ['remove fields without mutating an object', 'omit temporary properties from a record', 'copy an object except selected keys'],
    code: `const record = { id: 7, title: 'Draft', selected: true, expanded: false };
const omitted = new Set(['selected', 'expanded']);
const cleaned = Object.fromEntries(
  Object.entries(record).filter(([key]) => !omitted.has(key))
);
console.log(cleaned);`,
    note: 'Runs in modern browsers or Node.js. Only enumerable own string-keyed properties are copied. This is shallow omission, not recursive sanitization or a security filter.',
  },
  {
    id: 'js-default-options', title: 'Apply defaults to optional settings', language: 'JavaScript',
    description: 'Use nullish coalescing to preserve intentional false and zero values.',
    prompts: ['apply defaults while keeping zero values', 'fill missing options without replacing false', 'use nullish coalescing for settings'],
    code: `function resolveOptions(options = {}) {
  return {
    retries: options.retries ?? 3,
    verbose: options.verbose ?? false,
    label: options.label ?? 'Untitled',
  };
}

console.log(resolveOptions({ retries: 0, verbose: false, label: '' }));`,
    note: 'Runs in modern browsers or Node.js. Defaults apply only to null or undefined field values. Pass an object, not null; validate types and ranges separately.',
  },
  {
    id: 'js-clone-data', title: 'Deep-clone structured data', language: 'JavaScript',
    description: 'Copy nested data while preserving supported types such as Date and Map.',
    prompts: ['deep clone an object with dates', 'copy nested data without sharing references', 'clone a map using structuredClone'],
    code: `const original = {
  createdAt: new Date('2026-01-15T12:00:00Z'),
  preferences: new Map([['theme', 'light']]),
  tags: ['draft'],
};
const copy = structuredClone(original);
copy.tags.push('reviewed');
copy.preferences.set('theme', 'dark');
console.log(original.tags, copy.tags);`,
    note: 'Requires structuredClone in modern browsers or Node.js 17+. Functions and DOM nodes cannot be cloned, and custom class prototypes are not preserved. Circular references are supported.',
  },
  {
    id: 'js-parse-validated-json', title: 'Parse and validate JSON text', language: 'JavaScript',
    description: 'Check the expected record shape after parsing an untrusted JSON string.',
    prompts: ['validate a parsed json object', 'handle malformed json text safely', 'check required fields after parsing json'],
    code: `function parseTask(text) {
  const value = JSON.parse(text);
  if (
    value === null || typeof value !== 'object' || Array.isArray(value) ||
    typeof value.title !== 'string' || typeof value.done !== 'boolean'
  ) {
    throw new TypeError('Expected a task with title and done fields');
  }
  return { title: value.title, done: value.done };
}

try {
  console.log(parseTask('{"title":"Review","done":false}'));
} catch (error) {
  console.error('Invalid task:', error.message);
}`,
    note: 'Runs in modern browsers or Node.js. Parsing alone does not validate data. This example returns only the two expected fields; add length limits and business rules for your application.',
  },
  {
    id: 'js-query-parameters', title: 'Build encoded query parameters', language: 'JavaScript',
    description: 'Construct a URL with safely encoded search text and repeated filter values.',
    prompts: ['build a url with query parameters', 'encode search text in a link', 'add repeated filters to a query string'],
    code: `const url = new URL('https://example.com/search');
url.searchParams.set('q', 'tea & coffee');
for (const tag of ['drinks', 'on sale']) {
  url.searchParams.append('tag', tag);
}
console.log(url.href);
console.log(url.searchParams.getAll('tag'));`,
    note: 'Runs in modern browsers or Node.js. URLSearchParams handles encoding; do not pre-encode values. append preserves repeated keys, while set replaces their existing values. No request is sent.',
  },
  {
    id: 'js-resolve-url', title: 'Resolve a relative URL', language: 'JavaScript',
    description: 'Resolve a path against a base URL and enforce an HTTPS same-origin policy.',
    prompts: ['resolve a relative link against a base url', 'check whether a link stays on the same origin', 'reject external urls before using a link'],
    code: `function resolveSameOrigin(input, base) {
  const baseUrl = new URL(base);
  const resolved = new URL(input, baseUrl);
  if (
    resolved.protocol !== 'https:' || resolved.origin !== baseUrl.origin ||
    resolved.username || resolved.password
  ) {
    throw new TypeError('Expected a same-origin HTTPS URL without credentials');
  }
  return resolved.href;
}

console.log(resolveSameOrigin('../help', 'https://example.com/docs/start/'));`,
    note: 'Runs in modern browsers or Node.js. Invalid URLs throw. The base must be trusted; this initial URL check does not protect a server-side request from redirects or replace SSRF defenses.',
  },
  {
    id: 'js-format-currency', title: 'Format currency for a locale', language: 'JavaScript',
    description: 'Use native locale rules for separators, currency symbols, and displayed precision.',
    prompts: ['format a price as currency', 'display money with locale separators', 'show a dollar amount using Intl'],
    code: `const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
console.log(formatter.format(1234.5)); // $1,234.50
console.log(formatter.format(0)); // $0.00`,
    note: 'Runs in modern browsers or Node.js with Intl support. Input is in major currency units, not cents. Formatting rounds the display but does not perform currency conversion or exact financial arithmetic.',
  },
  {
    id: 'js-format-timezone', title: 'Display a date in a chosen time zone', language: 'JavaScript',
    description: 'Format a known instant independently of the machine time zone.',
    prompts: ['format a date in another time zone', 'display a timestamp in New York time', 'show a date without relying on the system time zone'],
    code: `const instant = new Date('2026-01-15T18:30:00Z');
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short',
});
console.log(formatter.format(instant));`,
    note: 'Runs in modern browsers or Node.js with Intl time-zone data. Use timestamps with an explicit offset or Z. Formatting does not change the stored instant, and daylight-saving rules are applied automatically.',
  },
  {
    id: 'js-natural-sort', title: 'Sort numbered labels naturally', language: 'JavaScript',
    description: 'Compare embedded digits numerically instead of using plain lexicographic order.',
    prompts: ['sort filenames in natural order', 'put item two before item ten', 'sort numbered labels with locale rules'],
    code: `const labels = ['File 10', 'file 2', 'File 1'];
const collator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
});
const sorted = [...labels].sort(collator.compare);
console.log(sorted);`,
    note: 'Runs in modern browsers or Node.js with Intl support. Base sensitivity ignores case and some accent distinctions. Numeric collation is useful for labels, not semantic version ordering.',
  },
  {
    id: 'js-grapheme-truncate', title: 'Truncate text at grapheme boundaries', language: 'JavaScript',
    description: 'Shorten displayed text without splitting a combining sequence or joined emoji.',
    prompts: ['truncate text without breaking emoji', 'limit text by visible characters', 'shorten unicode text at grapheme boundaries'],
    code: `function truncateText(text, limit) {
  if (!Number.isSafeInteger(limit) || limit < 0) {
    throw new RangeError('Limit must be a nonnegative safe integer');
  }
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
  const characters = Array.from(segmenter.segment(text), (part) => part.segment);
  return characters.length <= limit
    ? text
    : characters.slice(0, limit).join('') + '...';
}

console.log(truncateText('Cafe\\u0301 au lait', 4));`,
    note: 'Requires Intl.Segmenter in recent browsers or Node.js 16+. The limit excludes the added ellipsis. Grapheme count is not display width, and this implementation materializes all segments.',
  },
  {
    id: 'js-literal-replace', title: 'Replace literal text without a regex', language: 'JavaScript',
    description: 'Replace every exact occurrence while treating replacement dollar signs literally.',
    prompts: ['replace all occurrences of literal text', 'replace text containing regex characters', 'keep dollar signs literal in replacement text'],
    code: `function replaceLiteral(text, search, replacement) {
  if (search === '') {
    throw new TypeError('Search text must not be empty');
  }
  return text.replaceAll(search, () => replacement);
}

console.log(replaceLiteral('Price: [cost]; total: [cost]', '[cost]', '$5'));`,
    note: 'Requires replaceAll in modern browsers or Node.js 15+. Pass strings for all arguments. Matching is case-sensitive; the callback prevents replacement tokens such as $& from being interpreted.',
  },
  {
    id: 'js-async-delay', title: 'Wait asynchronously with a timer', language: 'JavaScript',
    description: 'Pause an async function without blocking the event loop.',
    prompts: ['wait before running the next step', 'pause an async function with a timer', 'delay work without blocking javascript'],
    code: `function delay(milliseconds) {
  if (!Number.isInteger(milliseconds) || milliseconds < 0 || milliseconds > 2147483647) {
    throw new RangeError('Delay must be an integer from 0 to 2147483647');
  }
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function run() {
  console.log('Starting');
  await delay(100);
  console.log('Continuing');
}

run().catch(console.error);`,
    note: 'Runs in modern browsers or Node.js. Timers specify a minimum wait, not an exact schedule. This helper is not cancellable and does not block other work.',
  },
  {
    id: 'js-settled-results', title: 'Collect successful and failed async results', language: 'JavaScript',
    description: 'Wait for every independent task even when some tasks fail.',
    prompts: ['collect results even when a promise fails', 'wait for all tasks without failing fast', 'inspect successful and rejected async operations'],
    code: `async function run() {
  const jobs = [
    async () => 'Report ready',
    async () => { throw new Error('Preview unavailable'); },
    async () => 'Summary ready',
  ];
  const results = await Promise.allSettled(
    jobs.map((job) => Promise.resolve().then(job))
  );
  for (const [index, result] of results.entries()) {
    if (result.status === 'fulfilled') {
      console.log(index, result.value);
    } else {
      console.error(index, result.reason.message);
    }
  }
}

run().catch(console.error);`,
    note: 'Runs in modern browsers or Node.js 12.9+. Results preserve input order, not completion order. All jobs are started without a concurrency limit; synchronous throws are also captured as rejections.',
  },
  {
    id: 'js-sequential-tasks', title: 'Run async tasks sequentially', language: 'JavaScript',
    description: 'Start each task only after the previous task has completed.',
    prompts: ['run async tasks one at a time', 'await each item in order', 'process a queue sequentially'],
    code: `async function runSequentially(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

const tasks = [
  async () => 'First result',
  async () => 'Second result',
  async () => 'Third result',
];
runSequentially(tasks).then(console.log).catch(console.error);`,
    note: 'Runs in modern browsers or Node.js. Supply functions rather than already-started promises. The first rejection stops the loop, so subsequent tasks are not started.',
  },
  {
    id: 'js-lazy-range', title: 'Generate a lazy integer range', language: 'JavaScript',
    description: 'Yield ascending integers on demand without allocating an entire range array.',
    prompts: ['generate numbers without building an array', 'iterate over an integer range lazily', 'create an exclusive end range generator'],
    code: `function* range(start, end) {
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) {
    throw new RangeError('Range bounds must be safe integers');
  }
  for (let value = start; value < end; value += 1) {
    yield value;
  }
}

for (const page of range(1, 4)) {
  console.log(\`Page \${page}\`);
}`,
    note: 'Runs in modern browsers or Node.js. The end bound is excluded; start greater than or equal to end yields nothing. Generator validation happens when iteration begins, and very large ranges still take time to consume.',
  },
];
