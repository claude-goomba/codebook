export const pythonSnippets = [
  {
    id: 'python-find-files', title: 'Find files recursively', language: 'Python',
    description: 'Locate Python source files beneath a directory using pathlib.',
    prompts: ['find python files in subfolders', 'search a directory recursively', 'list source file paths'],
    code: `from pathlib import Path

root = Path('src')
if not root.is_dir():
    raise NotADirectoryError(root)

for path in sorted(root.rglob('*.py')):
    if path.is_file():
        print(path.relative_to(root))`,
    note: 'Python 3 standard library only. Requires an existing src directory; reads directory entries without modifying files. Matching is subject to filesystem case rules.',
  },
  {
    id: 'python-stream-lines', title: 'Search a large text file', language: 'Python',
    description: 'Stream matching lines with line numbers without loading the whole file.',
    prompts: ['find errors in a log file', 'read a large file line by line', 'print matching lines with line numbers'],
    code: `from pathlib import Path

path = Path('application.log')
with path.open(encoding='utf-8') as stream:
    for number, line in enumerate(stream, start=1):
        if 'ERROR' in line:
            print(f'{number}: {line.rstrip()}')`,
    note: 'Python 3 standard library only. Requires a UTF-8 application.log in the current directory. The search is case-sensitive and memory use is bounded by the longest line.',
  },
  {
    id: 'python-file-checksum', title: 'Calculate a file checksum', language: 'Python',
    description: 'Compute a SHA-256 digest by reading a file in fixed-size blocks.',
    prompts: ['calculate a sha256 checksum', 'hash a large file', 'verify a downloaded file digest'],
    code: `import hashlib

digest = hashlib.sha256()
with open('download.bin', 'rb') as stream:
    for block in iter(lambda: stream.read(1024 * 1024), b''):
        digest.update(block)

print(digest.hexdigest())`,
    note: 'Python 3 standard library only. Requires download.bin; does not modify it. Compare the output with a digest from a trusted source, not one supplied alongside an untrusted download.',
  },
  {
    id: 'python-temporary-directory', title: 'Use an automatically cleaned temporary directory', language: 'Python',
    description: 'Create scratch files inside a directory that is removed on context exit.',
    prompts: ['create temporary scratch files', 'clean up a temporary directory automatically', 'use a disposable working folder'],
    code: `from pathlib import Path
from tempfile import TemporaryDirectory

with TemporaryDirectory(prefix='report-') as directory:
    path = Path(directory) / 'preview.txt'
    path.write_text('Draft report\\n', encoding='utf-8')
    print(path.read_text(encoding='utf-8'))`,
    note: 'Python 3 standard library only. No input files required; creates and then removes a temporary directory and preview.txt. Copy any needed output elsewhere before leaving the context.',
  },
  {
    id: 'python-create-zip', title: 'Create a ZIP archive', language: 'Python',
    description: 'Bundle selected documents with relative names while refusing to overwrite an archive.',
    prompts: ['zip several documents', 'create an archive of files', 'compress reports into a zip file'],
    code: `from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

paths = [Path('reports/summary.txt'), Path('reports/details.txt')]
for path in paths:
    if not path.is_file():
        raise FileNotFoundError(path)

with ZipFile('reports.zip', mode='x', compression=ZIP_DEFLATED) as archive:
    for path in paths:
        archive.write(path, arcname=path.name)`,
    note: 'Python 3 standard library only, including zlib support. Requires reports/summary.txt and reports/details.txt; creates reports.zip and fails if it exists. A write failure can leave a partial archive.',
  },
  {
    id: 'python-gzip-text', title: 'Compress a text file with gzip', language: 'Python',
    description: 'Copy a file into a gzip stream without reading all its contents into memory.',
    prompts: ['compress a log with gzip', 'make a gz file from text', 'stream a file into gzip compression'],
    code: `import gzip
import shutil

with open('application.log', 'rb') as source:
    with gzip.open('application.log.gz', 'xb') as destination:
        shutil.copyfileobj(source, destination)`,
    note: 'Python 3 standard library only, including zlib support. Requires application.log; creates application.log.gz without overwriting an existing file. Keeps the original log; failures may leave partial output.',
  },
  {
    id: 'python-word-counts', title: 'Count common words', language: 'Python',
    description: 'Tokenize simple English text and report its most frequent words.',
    prompts: ['count word frequencies', 'find the most common words', 'summarize repeated words in text'],
    code: `from collections import Counter
import re

text = 'Small tools help teams. Small teams build useful tools.'
words = re.findall(r"[a-z]+(?:'[a-z]+)?", text.casefold())
for word, count in Counter(words).most_common(5):
    print(word, count)`,
    note: 'Python 3 standard library only. No files required. This tokenizer is deliberately limited to ASCII English words and apostrophes; use a language-aware tokenizer for multilingual text.',
  },
  {
    id: 'python-deduplicate', title: 'Remove duplicates while preserving order', language: 'Python',
    description: 'Keep the first occurrence of each hashable value.',
    prompts: ['remove duplicate values without reordering', 'keep unique items in original order', 'deduplicate a list of names'],
    code: `names = ['Ada', 'Linus', 'Ada', 'Grace', 'Linus']
unique = list(dict.fromkeys(names))
print(unique)`,
    note: 'Python 3.7+ standard library only. No files required. Dictionary insertion order preserves the first occurrence; values must be hashable, so nested lists are not supported.',
  },
  {
    id: 'python-group-records', title: 'Group records by category', language: 'Python',
    description: 'Collect records into lists keyed by their team without sorting them.',
    prompts: ['group people by team', 'collect records into categories', 'build a dictionary of grouped records'],
    code: `from collections import defaultdict

people = [
    {'name': 'Ada', 'team': 'Platform'},
    {'name': 'Grace', 'team': 'Tools'},
    {'name': 'Linus', 'team': 'Platform'},
]
groups = defaultdict(list)
for person in people:
    groups[person['team']].append(person)

print(dict(groups))`,
    note: 'Python 3 standard library only. No files required. Each record must have a hashable team value. Groups hold references to the original dictionaries, not independent copies.',
  },
  {
    id: 'python-batch-iterator', title: 'Process an iterator in batches', language: 'Python',
    description: 'Yield fixed-size tuples from an iterable with a possibly shorter final batch.',
    prompts: ['split an iterator into batches', 'process items in small chunks', 'batch a stream without loading everything'],
    code: `from itertools import islice

def batches(iterable, size):
    if size < 1:
        raise ValueError('size must be positive')
    iterator = iter(iterable)
    while True:
        batch = tuple(islice(iterator, size))
        if not batch:
            return
        yield batch

for batch in batches(range(10), 3):
    print(batch)`,
    note: 'Python 3 standard library only. No files required. Pass an integer batch size; the iterator is consumed once and only one batch is materialized at a time.',
  },
  {
    id: 'python-rolling-average', title: 'Calculate a rolling average', language: 'Python',
    description: 'Maintain a bounded window and running total for streaming measurements.',
    prompts: ['compute a moving average', 'smooth recent sensor readings', 'average the last three values'],
    code: `from collections import deque

window = deque(maxlen=3)
total = 0.0
for value in [10, 12, 14, 18, 16]:
    if len(window) == window.maxlen:
        total -= window[0]
    window.append(value)
    total += value
    print(total / len(window))`,
    note: 'Python 3 standard library only. No files required. Initial averages use the available values before the window fills. Floating-point running totals can accumulate rounding error over long streams.',
  },
  {
    id: 'python-decimal-money', title: 'Round a monetary total precisely', language: 'Python',
    description: 'Use decimal arithmetic and an explicit rounding rule for a price calculation.',
    prompts: ['calculate money without float errors', 'round a price to cents', 'apply tax using decimal arithmetic'],
    code: `from decimal import Decimal, ROUND_HALF_UP

price = Decimal('19.95')
quantity = 3
tax_rate = Decimal('0.0825')
subtotal = price * quantity
total = (subtotal * (Decimal('1') + tax_rate)).quantize(
    Decimal('0.01'), rounding=ROUND_HALF_UP
)
print(total)`,
    note: 'Python 3 standard library only. No files required. Construct Decimal values from strings rather than floats. This rounds the final total; applicable accounting rules may require rounding each line separately.',
  },
  {
    id: 'python-parse-timestamp', title: 'Normalize a timestamp to UTC', language: 'Python',
    description: 'Parse an ISO timestamp and reject values without a timezone offset.',
    prompts: ['convert an iso timestamp to utc', 'parse a date with a timezone offset', 'normalize timestamps before comparing them'],
    code: `from datetime import datetime, timezone

value = '2026-10-22T14:30:00+02:00'
timestamp = datetime.fromisoformat(value)
if timestamp.tzinfo is None or timestamp.utcoffset() is None:
    raise ValueError('A timezone offset is required')

print(timestamp.astimezone(timezone.utc).isoformat())`,
    note: 'Python 3.7+ standard library only. No files required. The example uses an explicit numeric offset, not a regional timezone; offset-free timestamps are rejected instead of assuming local time.',
  },
  {
    id: 'python-date-range', title: 'Generate dates in a range', language: 'Python',
    description: 'Iterate over calendar days with an exclusive end date.',
    prompts: ['generate each day between two dates', 'iterate over calendar dates', 'build a daily reporting date range'],
    code: `from datetime import date, timedelta

start = date(2026, 10, 22)
end = date(2026, 10, 29)
if end < start:
    raise ValueError('End date must not precede start date')

current = start
while current < end:
    print(current.isoformat())
    current += timedelta(days=1)`,
    note: 'Python 3 standard library only. No files required. Includes weekends and excludes the end date; equal start and end dates produce no output. Date objects avoid daylight-saving clock changes.',
  },
  {
    id: 'python-build-url', title: 'Build a URL with query parameters', language: 'Python',
    description: 'Encode spaces, punctuation, and repeated query parameters safely.',
    prompts: ['encode query parameters in a url', 'build a search link from values', 'include repeated parameters in a url'],
    code: `from urllib.parse import urlencode, urlunsplit

parameters = {'q': 'python tips & tools', 'tag': ['stdlib', 'beginner']}
query = urlencode(parameters, doseq=True)
url = urlunsplit(('https', 'example.com', '/search', query, ''))
print(url)`,
    note: 'Python 3 standard library only. No files or network access required; this only constructs a URL. doseq=True emits a separate query parameter for each list item.',
  },
  {
    id: 'python-http-text', title: 'Fetch text with an HTTP timeout', language: 'Python',
    description: 'Read a size-limited HTTP response and report request failures.',
    prompts: ['download text with urllib', 'make an http request with a timeout', 'fetch a small web page without third party packages'],
    code: `from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

request = Request('https://example.com/', headers={'User-Agent': 'TextFetcher/1.0'})
limit = 1024 * 1024
try:
    with urlopen(request, timeout=10) as response:
        body = response.read(limit + 1)
        if len(body) > limit:
            raise ValueError('Response exceeds one MiB')
        encoding = response.headers.get_content_charset() or 'utf-8'
        print(body.decode(encoding))
except HTTPError as error:
    print(f'HTTP status: {error.code}')
except (URLError, TimeoutError) as error:
    print(f'Request failed: {error}')`,
    note: 'Python 3 standard library only. No files required; makes a network request to example.com and needs HTTPS access. The timeout limits blocking operations, not total elapsed time; decoding and size errors propagate.',
  },
  {
    id: 'python-run-subprocess', title: 'Run a subprocess safely', language: 'Python',
    description: 'Capture output from an argument-list command with a timeout and exit-code checking.',
    prompts: ['run a command and capture output', 'check a subprocess exit status', 'launch a process without a shell'],
    code: `import subprocess
import sys

try:
    result = subprocess.run(
        [sys.executable, '--version'],
        capture_output=True,
        text=True,
        check=True,
        timeout=5,
    )
    print(result.stdout.strip() or result.stderr.strip())
except subprocess.CalledProcessError as error:
    print(f'Command failed ({error.returncode}): {error.stderr}')
except subprocess.TimeoutExpired:
    print('Command timed out')`,
    note: 'Python 3.7+ standard library only. No files or external programs required beyond the current Python interpreter. Launches a child process; keep arguments separate and do not enable shell=True for untrusted input.',
  },
  {
    id: 'python-cli-arguments', title: 'Parse command-line arguments', language: 'Python',
    description: 'Define a required name and validate an optional repetition count.',
    prompts: ['add command line options to a script', 'parse arguments with argparse', 'show help for a python command'],
    code: `import argparse

parser = argparse.ArgumentParser(description='Print a greeting.')
parser.add_argument('name', help='Name to greet')
parser.add_argument('--count', type=int, default=1, help='Number of greetings')
args = parser.parse_args()
if args.count < 1:
    parser.error('--count must be positive')

for _ in range(args.count):
    print(f'Hello, {args.name}!')`,
    note: 'Python 3 standard library only. Intended as greet.py; run python3 greet.py Ada --count 2. No input data files required. argparse provides --help and exits with an error for invalid arguments.',
  },
  {
    id: 'python-environment-config', title: 'Validate environment configuration', language: 'Python',
    description: 'Load a port from the environment with a default and range validation.',
    prompts: ['read configuration from environment variables', 'validate a port from the environment', 'use a default when an environment variable is missing'],
    code: `import os

raw_port = os.environ.get('APP_PORT', '8000')
try:
    port = int(raw_port)
except ValueError as error:
    raise ValueError('APP_PORT must be an integer') from error
if not 1 <= port <= 65535:
    raise ValueError('APP_PORT must be between 1 and 65535')

print(f'Configured port: {port}')`,
    note: 'Python 3 standard library only. No files required; optionally reads APP_PORT. This validates configuration without opening a network port. An empty variable is treated as invalid, not as missing.',
  },
  {
    id: 'python-ini-config', title: 'Read and validate INI settings', language: 'Python',
    description: 'Load a required configuration file and retrieve a typed setting.',
    prompts: ['read an ini configuration file', 'load a numeric setting with configparser', 'disable interpolation in ini settings'],
    code: `import configparser

config = configparser.ConfigParser(interpolation=None)
with open('app.ini', encoding='utf-8') as stream:
    config.read_file(stream)

workers = config.getint('server', 'workers', fallback=4)
if workers < 1:
    raise ValueError('workers must be positive')
print(f'Worker count: {workers}')`,
    note: 'Python 3 standard library only. Requires UTF-8 app.ini, optionally containing a [server] section with workers = 4. Missing settings use 4; malformed integers fail. Disabling interpolation preserves literal percent signs.',
  },
  {
    id: 'python-sqlite-query', title: 'Query SQLite with bound parameters', language: 'Python',
    description: 'Create an in-memory database and filter rows without interpolating SQL values.',
    prompts: ['query sqlite using parameters', 'use an in memory sql database', 'insert rows safely into sqlite'],
    code: `import sqlite3
from contextlib import closing

with closing(sqlite3.connect(':memory:')) as connection:
    with connection:
        connection.execute('CREATE TABLE tasks (title TEXT, done INTEGER)')
        connection.executemany(
            'INSERT INTO tasks (title, done) VALUES (?, ?)',
            [('Write tests', 0), ('Review patch', 1)],
        )
    rows = connection.execute(
        'SELECT title FROM tasks WHERE done = ?', (0,)
    )
    for (title,) in rows:
        print(title)`,
    note: 'Python 3 standard library with sqlite3 support. No files required or created; data disappears when the connection closes. Bind values with placeholders; table and column names cannot be bound this way.',
  },
  {
    id: 'python-secure-token', title: 'Generate a secure random token', language: 'Python',
    description: 'Create a URL-safe token using cryptographically strong randomness.',
    prompts: ['generate a secure random token', 'make an unpredictable reset token', 'create a url safe secret'],
    code: `import secrets

token = secrets.token_urlsafe(32)
print(token)`,
    note: 'Python 3.6+ standard library only. No files required. Uses 32 random bytes before encoding. Printing is for demonstration; production reset tokens need secure storage, expiry, and single-use enforcement and should not be logged.',
  },
  {
    id: 'python-regex-log-fields', title: 'Extract structured fields from log lines', language: 'Python',
    description: 'Use named regular-expression groups to validate and parse a simple log format.',
    prompts: ['extract fields from a log line', 'parse text using named regex groups', 'validate a log message format'],
    code: `import re

pattern = re.compile(
    r'(?P<date>\\d{4}-\\d{2}-\\d{2})\\s+'
    r'(?P<level>INFO|WARN|ERROR)\\s+(?P<message>.+)'
)
line = '2026-10-22 ERROR Connection timed out'
match = pattern.fullmatch(line)
if match is None:
    raise ValueError('Unexpected log format')

print(match.groupdict())`,
    note: 'Python 3 standard library only. No files required. The regex checks date shape, not calendar validity. It expects one line without a trailing newline; parse the date separately if validity matters.',
  },
  {
    id: 'python-text-diff', title: 'Show a unified text diff', language: 'Python',
    description: 'Compare two text versions using the familiar unified patch format.',
    prompts: ['compare two versions of text', 'generate a unified diff in python', 'show added and removed lines'],
    code: `from difflib import unified_diff

before = 'host=localhost\\nport=8000\\n'
after = 'host=localhost\\nport=9000\\ndebug=false\\n'
changes = unified_diff(
    before.splitlines(keepends=True),
    after.splitlines(keepends=True),
    fromfile='before.ini',
    tofile='after.ini',
)
print(''.join(changes), end='')`,
    note: 'Python 3 standard library only. No files required; before.ini and after.ini are output labels, not file paths being read. Keeping line endings prevents adjacent diff lines from running together.',
  },
  {
    id: 'python-measure-duration', title: 'Measure elapsed execution time', language: 'Python',
    description: 'Use a monotonic high-resolution clock to time a block even if it raises an exception.',
    prompts: ['measure how long a function takes', 'time a block of python code', 'report elapsed time even when an operation fails'],
    code: `from time import perf_counter

start = perf_counter()
try:
    total = sum(number * number for number in range(100000))
    print(total)
finally:
    elapsed = perf_counter() - start
    print(f'Elapsed: {elapsed:.6f} seconds')`,
    note: 'Python 3 standard library only. No files required. Measures elapsed wall time, including waits, rather than CPU time. Single runs are noisy; use timeit with repeated trials for microbenchmarks.',
  },
];
