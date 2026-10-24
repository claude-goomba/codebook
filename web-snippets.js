export const webSnippets = [
  {
    id: 'css-keyboard-focus', title: 'Highlight keyboard focus', language: 'CSS',
    description: 'Give keyboard users a visible focus indicator on interactive controls.',
    prompts: ['show keyboard focus on controls', 'add a visible focus ring', 'highlight links when tabbing'],
    code: `.controls :is(a, button, input, select, textarea):focus-visible {
  outline: 3px solid #174ea6;
  outline-offset: 3px;
}`,
    note: 'Requires a container with class controls containing native links or form controls. Keep the browser focus fallback; verify ring contrast against your backgrounds and avoid clipping it with overflow.',
  },
  {
    id: 'css-skip-link', title: 'Reveal a skip link on focus', language: 'CSS',
    description: 'Keep a navigation bypass link available without occupying the resting layout.',
    prompts: ['reveal a skip link on keyboard focus', 'style a skip navigation link', 'let keyboard users bypass the header'],
    code: `.skip-link {
  position: fixed;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
  transform: translateY(-200%);
  padding: 0.75rem 1rem;
  background: #fff;
  color: #111;
  z-index: 1000;
}
.skip-link:focus {
  transform: none;
  outline: 3px solid #174ea6;
}`,
    note: 'Place <a class="skip-link" href="#main">Skip to content</a> first in the body and use <main id="main" tabindex="-1"> for the destination. Do not hide the link with display:none.',
  },
  {
    id: 'css-visually-hidden', title: 'Hide text visually but preserve its accessible name', language: 'CSS',
    description: 'Provide text for assistive technology alongside a decorative icon.',
    prompts: ['hide icon button text only visually', 'keep a screen reader label available', 'add visually hidden accessible text'],
    code: `.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}`,
    note: 'Use <button type="button"><span aria-hidden="true">+</span><span class="visually-hidden">Add item</span></button>. Apply this class only to label text, not to a focusable control; wire the button action separately.',
  },
  {
    id: 'css-reduced-motion', title: 'Respect reduced motion for an entrance effect', language: 'CSS',
    description: 'Enable a short decorative animation only when motion is acceptable.',
    prompts: ['respect reduced motion for a panel', 'make an entrance animation optional', 'disable decorative motion by user preference'],
    code: `@keyframes panel-enter {
  from { opacity: 0; transform: translateY(0.5rem); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: no-preference) {
  .notice-panel { animation: panel-enter 180ms ease-out; }
}`,
    note: 'Requires an element such as <aside class="notice-panel" aria-label="Service notice"> with visible content. The base state remains visible without animation or media-query support.',
  },
  {
    id: 'css-print-article', title: 'Prepare an article for printing', language: 'CSS',
    description: 'Remove site chrome and avoid awkward heading and figure breaks on paper.',
    prompts: ['make an article printer friendly', 'hide site navigation when printing', 'prevent printed headings from being stranded'],
    code: `@media print {
  .site-header, .site-footer, .print-controls { display: none; }
  .article { max-width: none; color: #000; background: #fff; }
  .article h2, .article h3 { break-after: avoid; }
  .article figure { break-inside: avoid; }
  .article a { color: inherit; text-decoration: underline; }
}
@page { margin: 18mm; }`,
    note: 'Requires <article class="article"> with headings and optional figures; apply site-header, site-footer, and print-controls only to nonessential chrome. Check print preview because browser pagination varies.',
  },
  {
    id: 'css-dark-theme', title: 'Follow the system color preference', language: 'CSS',
    description: 'Switch page colors and native control rendering for light and dark modes.',
    prompts: ['follow the system dark theme', 'use automatic light and dark colors', 'adapt page colors to device preference'],
    code: `:root {
  color-scheme: light dark;
  --page-bg: #fff;
  --page-text: #17212b;
  --page-link: #174ea6;
}
@media (prefers-color-scheme: dark) {
  :root {
    --page-bg: #101820;
    --page-text: #edf2f7;
    --page-link: #9cc4ff;
  }
}
body { background: var(--page-bg); color: var(--page-text); }
a { color: var(--page-link); }`,
    note: 'Requires a normal HTML document with body content and optional anchors. These are page-level styles; audit other component backgrounds and focus states in both themes.',
  },
  {
    id: 'css-sticky-table-header', title: 'Keep table headings visible while scrolling', language: 'CSS',
    description: 'Pin a table header inside a bounded scrolling region.',
    prompts: ['keep table headings visible during scroll', 'make a sticky table header', 'scroll rows under fixed column headings'],
    code: `.table-region {
  max-block-size: 24rem;
  overflow: auto;
}
.table-region table { border-collapse: separate; border-spacing: 0; }
.table-region thead th {
  position: sticky;
  inset-block-start: 0;
  background: #fff;
  color: #111;
  z-index: 1;
}
.table-region :is(th, td) { padding: 0.75rem; }`,
    note: 'Requires <div class="table-region" role="region" aria-label="Inventory" tabindex="0"> around a table with caption, thead, tbody, and th scope="col". Preserve a visible focus ring on the region.',
  },
  {
    id: 'css-fluid-heading', title: 'Scale a heading without fixed breakpoints', language: 'CSS',
    description: 'Use bounded fluid typography while allowing long headings to wrap.',
    prompts: ['scale a heading with the viewport', 'use fluid typography with limits', 'make a large title wrap on small screens'],
    code: `.page-title {
  font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
  line-height: 1.15;
  max-inline-size: 22ch;
  overflow-wrap: anywhere;
  text-wrap: balance;
}`,
    note: 'Requires a heading such as <h1 class="page-title">Your page title</h1>. Keep browser zoom enabled and test at 200% text size; text-wrap is a progressive enhancement.',
  },
  {
    id: 'css-prose-measure', title: 'Improve long-form reading layout', language: 'CSS',
    description: 'Limit line length and consistently space adjacent prose blocks.',
    prompts: ['improve long article readability', 'limit prose line length', 'space paragraphs consistently'],
    code: `.prose {
  max-inline-size: 68ch;
  margin-inline: auto;
  padding-inline: 1rem;
  line-height: 1.65;
  overflow-wrap: anywhere;
}
.prose > * { margin-block: 0; }
.prose > * + * { margin-block-start: 1.25em; }`,
    note: 'Requires <article class="prose"> containing direct-child headings, paragraphs, lists, or figures. Nested components may need their own spacing rules.',
  },
  {
    id: 'css-image-crop', title: 'Crop editorial images to a consistent ratio', language: 'CSS',
    description: 'Fill a wide image slot without stretching the source image.',
    prompts: ['crop images without distortion', 'give article photos a consistent ratio', 'fill a wide image slot with object fit'],
    code: `.editorial-image {
  display: block;
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: 50% 35%;
}`,
    note: 'Requires <img class="editorial-image" src="..." alt="Meaningful description" width="1600" height="900">. Cropping can remove information; use only for suitable imagery and adjust the focal point per image.',
  },
  {
    id: 'css-anchor-offset', title: 'Offset anchor destinations below a sticky header', language: 'CSS',
    description: 'Prevent in-page links from placing headings behind a fixed-height header.',
    prompts: ['keep anchor headings below a sticky header', 'offset in page link destinations', 'stop navigation from covering linked sections'],
    code: `:root { --header-height: 4rem; }
.site-nav {
  position: sticky;
  inset-block-start: 0;
  min-block-size: var(--header-height);
  background: #fff;
  color: #111;
  z-index: 10;
}
main [id] { scroll-margin-block-start: calc(var(--header-height) + 1rem); }`,
    note: 'Requires a header with class site-nav, links such as <a href="#pricing">Pricing</a>, and a matching id on a heading inside main. Set header-height to the actual header height, including wrapped content at each breakpoint.',
  },
  {
    id: 'css-long-token-wrap', title: 'Contain long filenames and URLs', language: 'CSS',
    description: 'Allow unbroken text to wrap instead of widening a narrow layout.',
    prompts: ['wrap very long filenames', 'stop long urls overflowing a panel', 'break unbroken text inside a narrow item'],
    code: `.file-item { min-inline-size: 0; }
.file-item a {
  overflow-wrap: anywhere;
  word-break: normal;
}`,
    note: 'Requires an element with class file-item containing an anchor whose text is a filename or URL. Apply min-inline-size:0 to the actual flex or grid item if another wrapper controls shrinking.',
  },
  {
    id: 'css-native-checkbox', title: 'Style native checkbox accents', language: 'CSS',
    description: 'Give checkboxes a branded accent while retaining native interaction.',
    prompts: ['change native checkbox accent colors', 'style checkboxes without replacing them', 'make checkbox labels easier to click'],
    code: `.preference {
  display: block;
  padding-block: 0.75rem;
  cursor: pointer;
}
.preference input[type="checkbox"] {
  accent-color: #174ea6;
  inline-size: 1.25rem;
  block-size: 1.25rem;
  vertical-align: middle;
  margin-inline-end: 0.5rem;
}`,
    note: 'Requires <label class="preference"><input type="checkbox" name="digest">Weekly digest</label>. Keep the native input visible and its focus outline intact; persistence requires separate application logic.',
  },
  {
    id: 'css-disabled-button', title: 'Distinguish disabled buttons without opacity', language: 'CSS',
    description: 'Use explicit colors and borders for unavailable native buttons.',
    prompts: ['style a disabled button clearly', 'show unavailable actions without fading text', 'give disabled buttons a readable appearance'],
    code: `.action-button {
  padding: 0.75rem 1rem;
  border: 2px solid #174ea6;
  background: #174ea6;
  color: #fff;
}
.action-button:disabled {
  background: #eee;
  color: #555;
  border-color: #777;
  border-style: dashed;
  cursor: not-allowed;
}`,
    note: 'Requires <button class="action-button" type="submit" disabled>Submit order</button> and nearby visible text explaining why submission is unavailable. CSS does not disable actions; use the native disabled attribute.',
  },
  {
    id: 'css-optional-scroll-snap', title: 'Add gentle snapping to an image strip', language: 'CSS',
    description: 'Offer horizontal scroll alignment without forcing every scroll to a snap point.',
    prompts: ['add optional snapping to a photo strip', 'make a horizontally scrolling gallery', 'align images gently after scrolling'],
    code: `.photo-strip {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  padding: 1rem;
}
.photo-strip figure {
  flex: 0 0 min(80%, 24rem);
  margin: 0;
  scroll-snap-align: start;
}
.photo-strip img { display: block; inline-size: 100%; height: auto; }`,
    note: 'Requires <div class="photo-strip" role="region" aria-label="Project photos" tabindex="0"> containing figures with images and captions. Supply alt text, retain scrollbars and focus outlines, and do not auto-advance.',
  },
  {
    id: 'css-container-toolbar', title: 'Adapt a toolbar to its container width', language: 'CSS',
    description: 'Change action layout based on the embedding panel rather than the viewport.',
    prompts: ['adapt toolbar buttons to panel width', 'use a container query for actions', 'stack actions in a narrow sidebar'],
    code: `.toolbar-host { container-type: inline-size; }
.toolbar-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.toolbar-actions button { white-space: normal; }
@container (max-width: 24rem) {
  .toolbar-actions { flex-direction: column; align-items: stretch; }
}`,
    note: 'Requires <div class="toolbar-host"><div class="toolbar-actions"> containing native buttons with type="button" and visible names. Wire actions separately; older browsers retain the wrapping flex layout.',
  },
  {
    id: 'css-definition-alignment', title: 'Align term and definition pairs', language: 'CSS',
    description: 'Display metadata in two columns with a stacked small-screen fallback.',
    prompts: ['align definition list metadata', 'put terms beside their definitions', 'stack metadata pairs on small screens'],
    code: `.metadata { display: grid; gap: 0.5rem 1.5rem; }
.metadata dt { font-weight: 700; }
.metadata dd { margin: 0 0 0.75rem; overflow-wrap: anywhere; }
@media (min-width: 40rem) {
  .metadata { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); }
  .metadata dd { margin: 0; }
}`,
    note: 'Requires <dl class="metadata"> with alternating direct-child dt and dd elements, exactly one definition per term. Keep terms before their definitions in source order.',
  },
  {
    id: 'css-numbered-steps', title: 'Style ordered instructions with native markers', language: 'CSS',
    description: 'Emphasize step numbers while preserving ordered-list semantics.',
    prompts: ['style numbered instruction markers', 'highlight ordered list step numbers', 'space a sequence of setup steps'],
    code: `.steps { padding-inline-start: 2.5rem; }
.steps li { padding-inline-start: 0.5rem; line-height: 1.6; }
.steps li + li { margin-block-start: 1rem; }
.steps li::marker { font-weight: 700; color: #174ea6; }`,
    note: 'Requires <ol class="steps"> containing li elements in instruction order. This palette assumes a light background; native numbering remains available if marker styling is unsupported.',
  },
  {
    id: 'css-code-overflow', title: 'Keep code blocks from widening the page', language: 'CSS',
    description: 'Scroll preformatted examples locally without discarding whitespace.',
    prompts: ['contain wide code samples', 'scroll a code block horizontally', 'preserve code indentation without page overflow'],
    code: `.code-example {
  box-sizing: border-box;
  max-inline-size: 100%;
  min-inline-size: 0;
  overflow-x: auto;
  padding: 1rem;
  background: #f1f3f5;
  color: #17212b;
  tab-size: 2;
}
.code-example code { font: inherit; white-space: pre; }`,
    note: 'Requires <pre class="code-example" tabindex="0" role="region" aria-label="Code example"><code>escaped source</code></pre>. Escape HTML in source text, keep focus outlines, and give any enclosing flex/grid item min-inline-size:0.',
  },
  {
    id: 'css-error-summary', title: 'Make a validation summary easy to scan', language: 'CSS',
    description: 'Separate a linked error summary from surrounding form content.',
    prompts: ['style a validation error summary', 'make form errors easy to scan', 'highlight error links without relying on color'],
    code: `.error-summary {
  border: 3px solid #a11212;
  border-inline-start-width: 0.75rem;
  padding: 1rem;
  background: #fff;
  color: #711;
}
.error-summary h2 { margin-block-start: 0; }
.error-summary a { color: inherit; text-decoration: underline; }
.error-summary li + li { margin-block-start: 0.5rem; }`,
    note: 'Requires a section.error-summary with aria-labelledby pointing to its h2, plus a list of error links targeting field ids. Use explicit error text and aria-invalid/aria-describedby on affected fields; populate and focus the summary after failed submission in application logic.',
  },
  {
    id: 'html-faq-disclosure', title: 'Build a native FAQ disclosure', language: 'HTML',
    description: 'Let readers expand an answer using built-in keyboard and pointer support.',
    prompts: ['make an expandable faq answer', 'show and hide help without javascript', 'use a native disclosure for a question'],
    code: `<section aria-labelledby="faq-heading">
  <h2 id="faq-heading">Delivery questions</h2>
  <details>
    <summary>When will my order arrive?</summary>
    <p>Standard delivery takes three to five business days.</p>
  </details>
</section>`,
    note: 'Use within a page with an appropriate heading hierarchy. Keep summary as the first child of details; do not add redundant button roles or manually managed aria-expanded.',
  },
  {
    id: 'html-breadcrumb-navigation', title: 'Mark up breadcrumb navigation', language: 'HTML',
    description: 'Expose a page location as a named navigation landmark and ordered trail.',
    prompts: ['add accessible breadcrumb navigation', 'show the current page in a breadcrumb trail', 'mark up a hierarchy of parent pages'],
    code: `<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/guides">Guides</a></li>
    <li><span aria-current="page">Installation</span></li>
  </ol>
</nav>`,
    note: 'Replace paths with real parent pages. If adding visual separators, keep them decorative rather than part of the link names.',
  },
  {
    id: 'html-search-landmark', title: 'Provide a labeled site search', language: 'HTML',
    description: 'Submit a search query using native GET semantics and a search landmark.',
    prompts: ['add a labeled site search', 'submit a search query with get', 'provide a search landmark for navigation'],
    code: `<form role="search" action="/search" method="get" aria-label="Site search">
  <label for="site-query">Search the documentation</label>
  <input id="site-query" name="q" type="search" required>
  <button type="submit">Search</button>
</form>`,
    note: 'Implement /search on the server, validate query input, and escape reflected output. GET places terms in URLs and logs, so do not use this for sensitive data.',
  },
  {
    id: 'html-responsive-picture', title: 'Select an image crop for the viewport', language: 'HTML',
    description: 'Use art direction to serve a wide crop on larger screens and a portrait crop otherwise.',
    prompts: ['serve different image crops by viewport', 'use picture for art direction', 'choose a portrait photo on small screens'],
    code: `<picture>
  <source media="(min-width: 50rem)" srcset="/images/workshop-wide.jpg"
          width="1200" height="600">
  <img src="/images/workshop-portrait.jpg" width="600" height="800"
       alt="A carpenter smoothing a chair leg at a workbench"
       loading="lazy" decoding="async" style="max-width: 100%; height: auto;">
</picture>`,
    note: 'Provide both image assets with the stated dimensions and equivalent subject matter. Use this lazy-loaded example below the fold; omit loading="lazy" for an important above-the-fold image.',
  },
  {
    id: 'html-captioned-video', title: 'Offer video with captions and a transcript', language: 'HTML',
    description: 'Provide native playback controls, a caption track, and a text alternative.',
    prompts: ['embed a video with captions', 'offer a transcript beside a video', 'add accessible native video playback'],
    code: `<section aria-labelledby="tour-heading">
  <h2 id="tour-heading">Library tour</h2>
  <video controls preload="metadata" width="640" height="360"
         aria-labelledby="tour-heading" style="max-width: 100%; height: auto;">
    <source src="/media/library-tour.mp4" type="video/mp4">
    <track kind="captions" src="/media/library-tour.en.vtt"
           srclang="en" label="English" default>
    <p><a href="/media/library-tour.mp4">Download the library tour video</a>.</p>
  </video>
  <p><a href="/transcripts/library-tour">Read the descriptive transcript</a></p>
</section>`,
    note: 'Supply the video, accurate WebVTT captions including meaningful sounds, and a descriptive transcript. Provide an audio-described version when essential visuals are not conveyed by the main audio; avoid autoplay.',
  },
  {
    id: 'html-data-table', title: 'Associate data cells with row and column headings', language: 'HTML',
    description: 'Make a small comparison table understandable without visual alignment alone.',
    prompts: ['mark up an accessible comparison table', 'associate cells with table headers', 'give a data table a caption'],
    code: `<table>
  <caption>Support hours by plan, in UTC</caption>
  <thead>
    <tr><th scope="col">Plan</th><th scope="col">Weekdays</th><th scope="col">Weekends</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Standard</th><td>09:00 to 17:00</td><td>Unavailable</td></tr>
    <tr><th scope="row">Premium</th><td>24 hours</td><td>24 hours</td></tr>
  </tbody>
</table>`,
    note: 'Use tables for tabular data, not layout. This scope-based structure suits simple headers; complex multi-level tables may require explicit headers/id associations.',
  },
  {
    id: 'html-radio-fieldset', title: 'Group mutually exclusive delivery choices', language: 'HTML',
    description: 'Name a radio group with a legend and give each option a clickable label.',
    prompts: ['group delivery radio buttons accessibly', 'choose one shipping option', 'label a set of mutually exclusive options'],
    code: `<fieldset>
  <legend>Delivery speed</legend>
  <p>
    <input id="delivery-standard" name="delivery" type="radio" value="standard" checked>
    <label for="delivery-standard">Standard: three to five business days</label>
  </p>
  <p>
    <input id="delivery-express" name="delivery" type="radio" value="express">
    <label for="delivery-express">Express: one to two business days</label>
  </p>
</fieldset>`,
    note: 'Place inside an existing checkout form. Shared names enforce a single selection; the server must validate the submitted value and independently compute prices and eligibility.',
  },
  {
    id: 'html-file-upload', title: 'Request a PDF document upload', language: 'HTML',
    description: 'Use multipart submission with clear file requirements and a native file picker.',
    prompts: ['upload a pdf document with a form', 'label a file picker with size guidance', 'submit a file using multipart encoding'],
    code: `<form action="/documents" method="post" enctype="multipart/form-data">
  <label for="document-file">PDF document</label>
  <p id="document-help">Choose one PDF, up to 5 MB.</p>
  <input id="document-file" name="document" type="file"
         accept=".pdf,application/pdf" aria-describedby="document-help" required>
  <button type="submit">Upload document</button>
</form>`,
    note: 'Requires an authenticated upload endpoint and framework CSRF protection. accept is only a picker hint: enforce size, inspect file content, generate storage names, scan uploads, and store files outside executable/public paths with authorized download access.',
  },
  {
    id: 'html-task-progress', title: 'Present determinate task progress', language: 'HTML',
    description: 'Name a native progress indicator and provide readable completion text.',
    prompts: ['show how much of an import is complete', 'label a determinate progress bar', 'display task completion with native html'],
    code: `<section aria-labelledby="import-heading">
  <h2 id="import-heading">Importing records</h2>
  <label for="import-progress">Import progress</label>
  <progress id="import-progress" value="35" max="100">35%</progress>
  <p role="status">35 of 100 records imported.</p>
</section>`,
    note: 'Application code must update both value and status text. Announce meaningful milestones rather than every record; omit value when total work is unknown.',
  },
  {
    id: 'html-storage-meter', title: 'Show storage usage as a measured range', language: 'HTML',
    description: 'Represent a bounded measurement rather than task completion.',
    prompts: ['show storage quota usage', 'use a meter for disk capacity', 'display a measurement within known limits'],
    code: `<label for="storage-usage">Storage used</label>
<meter id="storage-usage" min="0" max="100" low="70" high="90"
       optimum="0" value="64" aria-describedby="storage-detail">64 GB of 100 GB</meter>
<p id="storage-detail">64 GB used out of 100 GB. 36 GB available.</p>`,
    note: 'Values here are gigabytes, with lower usage preferred. Update the meter and visible text together; native threshold styling varies, so keep the numeric explanation.',
  },
  {
    id: 'html-pagination', title: 'Link between result pages', language: 'HTML',
    description: 'Expose page navigation with a current-page marker and descriptive link names.',
    prompts: ['add accessible result pagination', 'mark the current results page', 'link to previous and next result pages'],
    code: `<nav aria-label="Search results pages">
  <ul>
    <li><a href="?q=maps&amp;page=1" rel="prev">Previous page</a></li>
    <li><a href="?q=maps&amp;page=1" aria-label="Page 1">1</a></li>
    <li><span aria-current="page" aria-label="Page 2">2</span></li>
    <li><a href="?q=maps&amp;page=3" aria-label="Page 3">3</a></li>
    <li><a href="?q=maps&amp;page=3" rel="next">Next page</a></li>
  </ul>
</nav>`,
    note: 'This example shows page 2 of 3. Generate real URLs preserving active filters, escape attribute values, and omit previous/next links when those pages do not exist.',
  },
  {
    id: 'html-figure-caption', title: 'Connect a diagram with its caption', language: 'HTML',
    description: 'Pair a technical image with visible context and an extended text explanation.',
    prompts: ['caption a technical diagram', 'provide a text alternative for a workflow image', 'associate an image with explanatory context'],
    code: `<figure>
  <img src="/images/review-flow.svg" width="720" height="240"
       alt="Review workflow: draft, review, then publish"
       aria-describedby="review-description" style="max-width: 100%; height: auto;">
  <figcaption>Editorial review workflow</figcaption>
</figure>
<p id="review-description">An author submits a draft to an editor. The editor
  either returns it for revision or approves it for publication.</p>`,
    note: 'Supply the diagram asset and adjust alternative text to its actual information. Use a trusted image asset; the caption gives context while the adjacent description conveys the workflow details.',
  },
  {
    id: 'html-event-time', title: 'Publish an event with machine-readable times', language: 'HTML',
    description: 'Pair readable event details with unambiguous timestamps and a visible time zone.',
    prompts: ['mark up event dates and times', 'include a machine readable event timestamp', 'show an event time zone explicitly'],
    code: `<article aria-labelledby="event-title">
  <h2 id="event-title">Community workshop</h2>
  <p>
    <time datetime="2027-03-18T14:00:00+00:00">18 March 2027, 14:00</time>
    to <time datetime="2027-03-18T16:00:00+00:00">16:00</time> UTC.
  </p>
  <p>Location: Central Library, Room 2.</p>
</article>`,
    note: 'Use ISO timestamps with the correct offset for the event date. HTML time does not automatically convert time zones; keep the visible date, time, and zone consistent with datetime.',
  },
  {
    id: 'html-download-resource', title: 'Describe a downloadable resource', language: 'HTML',
    description: 'Tell users the file purpose, format, and size before downloading.',
    prompts: ['add a descriptive download link', 'show a download file format and size', 'offer a same origin pdf resource'],
    code: `<p>
  <a href="/downloads/accessibility-checklist.pdf" download
     aria-describedby="checklist-details">Download the accessibility checklist</a>
  <span id="checklist-details">PDF, 240 KB</span>
</p>`,
    note: 'Provide an accessible tagged PDF at this same-origin URL and keep size information accurate. download is a browser hint, not guaranteed behavior; serve the correct content type and safe Content-Disposition filename.',
  },
  {
    id: 'html-output-calculation', title: 'Associate a calculated total with its inputs', language: 'HTML',
    description: 'Use an output element to name a result and identify its contributing controls.',
    prompts: ['mark up a calculated order total', 'associate an output with numeric inputs', 'show a named calculation result in a form'],
    code: `<form id="estimate-form">
  <p>
    <label for="estimate-quantity">Quantity</label>
    <input id="estimate-quantity" name="quantity" type="number" min="1" step="1" value="2" required>
  </p>
  <p>
    <label for="estimate-price">Unit price in USD</label>
    <input id="estimate-price" name="price" type="number" min="0" step="0.01" value="12.50" required>
  </p>
  <p><label for="estimate-total">Estimated total</label>
    <output id="estimate-total" for="estimate-quantity estimate-price">USD 25.00</output>
  </p>
</form>`,
    note: 'This is initial markup, not an automatic calculator. Add input listeners that validate finite values, calculate in integer cents, and update output.textContent; prevent unintended form submission. A server must independently calculate any actual charge.',
  },
  {
    id: 'sql-keyset-pagination', title: 'Page through orders using a stable cursor', language: 'SQL',
    description: 'Fetch the next batch after a timestamp and id without an increasing offset.',
    prompts: ['paginate orders with a cursor', 'fetch the next page without offset', 'use stable keyset pagination'],
    code: `SELECT id, created_at, total
FROM orders
WHERE (created_at, id) < ($1::timestamptz, $2::bigint)
ORDER BY created_at DESC, id DESC
LIMIT 25;`,
    note: 'PostgreSQL. Assumes orders(id bigint primary key, created_at timestamptz NOT NULL, total numeric). Bind the last row timestamp and id through your driver; omit the predicate for the first page. Index (created_at DESC, id DESC); cursor keys should be immutable.',
  },
  {
    id: 'sql-latest-per-device', title: 'Retrieve the latest reading for every device', language: 'SQL',
    description: 'Choose one deterministic newest record per device with DISTINCT ON.',
    prompts: ['get the newest reading for each device', 'select the latest row per sensor', 'return one recent observation per device'],
    code: `SELECT DISTINCT ON (device_id)
       device_id, recorded_at, value
FROM readings
ORDER BY device_id, recorded_at DESC, id DESC;`,
    note: 'PostgreSQL-specific DISTINCT ON. Assumes readings(id bigint primary key, device_id bigint NOT NULL, recorded_at timestamptz NOT NULL, value numeric). The id breaks timestamp ties; an index on (device_id, recorded_at DESC, id DESC) supports this order.',
  },
  {
    id: 'sql-running-balance', title: 'Calculate a running ledger balance', language: 'SQL',
    description: 'Accumulate signed amounts separately for each account in posting order.',
    prompts: ['calculate a running account balance', 'show cumulative ledger amounts', 'compute a balance after each transaction'],
    code: `SELECT account_id, id, posted_at, amount,
       SUM(amount) OVER (
         PARTITION BY account_id
         ORDER BY posted_at, id
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS balance
FROM ledger
ORDER BY account_id, posted_at, id;`,
    note: 'PostgreSQL. Assumes ledger(id bigint primary key, account_id bigint NOT NULL, posted_at timestamptz NOT NULL, amount numeric NOT NULL), one currency per account, and a complete ledger including opening balances. Positive amounts increase the balance.',
  },
  {
    id: 'sql-rank-scores', title: 'Rank participants with shared ranks for ties', language: 'SQL',
    description: 'Assign consecutive ranks within each competition without skipping ranks after ties.',
    prompts: ['rank participants while preserving ties', 'build a dense competition leaderboard', 'assign ranks within each contest'],
    code: `SELECT competition_id, participant_id, score,
       DENSE_RANK() OVER (
         PARTITION BY competition_id ORDER BY score DESC
       ) AS place
FROM scores
ORDER BY competition_id, place, participant_id;`,
    note: 'PostgreSQL. Assumes scores(competition_id bigint, participant_id bigint, score numeric NOT NULL) with a unique (competition_id, participant_id) key. Higher scores win; equal scores receive equal ranks.',
  },
  {
    id: 'sql-reading-delta', title: 'Compare each reading with the previous one', language: 'SQL',
    description: 'Measure changes in a device value using a window offset.',
    prompts: ['compare a reading to its predecessor', 'calculate sensor changes over time', 'subtract the previous value using lag'],
    code: `SELECT device_id, recorded_at, value,
       value - LAG(value) OVER (
         PARTITION BY device_id ORDER BY recorded_at, id
       ) AS change
FROM readings
ORDER BY device_id, recorded_at, id;`,
    note: 'PostgreSQL. Assumes readings(id bigint primary key, device_id bigint NOT NULL, recorded_at timestamptz NOT NULL, value numeric NOT NULL). The first change per device is NULL because no preceding reading exists.',
  },
  {
    id: 'sql-missing-dates', title: 'Find missing daily measurement dates', language: 'SQL',
    description: 'Generate an inclusive calendar range and return dates with no recorded sample.',
    prompts: ['find missing dates in daily data', 'list days without a measurement', 'detect gaps in a daily calendar'],
    code: `WITH calendar AS (
  SELECT $1::date + day_offset AS day
  FROM generate_series(0, $2::date - $1::date) AS offsets(day_offset)
)
SELECT day
FROM calendar
WHERE NOT EXISTS (
  SELECT 1 FROM daily_measurements AS m WHERE m.day = calendar.day
)
ORDER BY day;`,
    note: 'PostgreSQL. Assumes daily_measurements(day date primary key, value numeric). Bind inclusive start and end dates as $1 and $2; validate their order and cap the requested range to avoid excessive series generation.',
  },
  {
    id: 'sql-interval-conflicts', title: 'Find overlapping room reservations', language: 'SQL',
    description: 'Detect schedule conflicts while permitting one reservation to start when another ends.',
    prompts: ['find bookings overlapping a time range', 'check a room for reservation conflicts', 'allow adjacent bookings without treating them as overlaps'],
    code: `SELECT id, starts_at, ends_at
FROM reservations
WHERE room_id = $1::bigint
  AND starts_at < $3::timestamptz
  AND ends_at > $2::timestamptz
ORDER BY starts_at, id;`,
    note: 'PostgreSQL. Assumes reservations(id bigint primary key, room_id bigint NOT NULL, starts_at timestamptz NOT NULL, ends_at timestamptz NOT NULL) with CHECK (ends_at > starts_at). Bind room, proposed start, and proposed end; validate start < end. This read alone cannot prevent concurrent conflicts; enforce an exclusion constraint when booking.',
  },
  {
    id: 'sql-jsonb-containment', title: 'Filter products by structured JSON attributes', language: 'SQL',
    description: 'Match a subset of JSON properties without converting the document to text.',
    prompts: ['filter products by json attributes', 'find json documents containing selected properties', 'query structured product metadata'],
    code: `SELECT id, name, attributes
FROM products
WHERE attributes @> $1::jsonb
ORDER BY id;`,
    note: 'PostgreSQL. Assumes products(id bigint primary key, name text, attributes jsonb NOT NULL) storing objects. Bind a JSON object such as {"material":"steel","recyclable":true}; preserve JSON value types. A GIN index on attributes can support containment queries.',
  },
  {
    id: 'sql-full-text-search', title: 'Search document text and rank relevance', language: 'SQL',
    description: 'Parse a natural search string and order matching documents by full-text rank.',
    prompts: ['search documents by full text relevance', 'rank text search results', 'parse a natural language document query'],
    code: `WITH query AS (
  SELECT websearch_to_tsquery('english', $1::text) AS terms
)
SELECT d.id, d.title, ts_rank(d.search_vector, q.terms) AS relevance
FROM documents AS d CROSS JOIN query AS q
WHERE d.search_vector @@ q.terms
ORDER BY relevance DESC, d.id
LIMIT 20;`,
    note: 'PostgreSQL 11+. Assumes documents(id bigint primary key, title text, search_vector tsvector) with a maintained vector built using the english configuration and ideally a GIN index. Bind user text as $1; do not interpolate it into SQL. The cross join only supplies the single parsed query value.',
  },
  {
    id: 'sql-recursive-ancestors', title: 'Trace a category path to its root', language: 'SQL',
    description: 'Walk parent links recursively while guarding against cycles.',
    prompts: ['find all ancestors of a category', 'walk a category hierarchy to the root', 'build an ancestor path with a recursive query'],
    code: `WITH RECURSIVE ancestors AS (
  SELECT id, parent_id, name, 0 AS depth, ARRAY[id] AS visited
  FROM categories
  WHERE id = $1::bigint
  UNION ALL
  SELECT c.id, c.parent_id, c.name, a.depth + 1, a.visited || c.id
  FROM categories AS c
  JOIN ancestors AS a ON c.id = a.parent_id
  WHERE NOT (c.id = ANY(a.visited))
)
SELECT id, name, depth
FROM ancestors
ORDER BY depth DESC;`,
    note: 'PostgreSQL. Assumes categories(id bigint primary key, parent_id bigint NULL references categories(id), name text). Bind the selected category id; roots have NULL parents. The result includes the selected node and stops before repeating a node if corrupt cyclic data exists.',
  },
  {
    id: 'sql-median-duration', title: 'Measure median and tail request latency', language: 'SQL',
    description: 'Compute continuous percentiles over a bounded observation interval.',
    prompts: ['calculate median request latency', 'measure the ninety fifth percentile duration', 'summarize latency percentiles for a time window'],
    code: `SELECT percentile_cont(0.5) WITHIN GROUP (ORDER BY duration_ms) AS median_ms,
       percentile_cont(0.95) WITHIN GROUP (ORDER BY duration_ms) AS p95_ms
FROM requests
WHERE recorded_at >= $1::timestamptz
  AND recorded_at < $2::timestamptz;`,
    note: 'PostgreSQL. Assumes requests(recorded_at timestamptz NOT NULL, duration_ms double precision NOT NULL) with nonnegative finite durations. Bind a start-inclusive, end-exclusive interval. Continuous percentiles interpolate and return NULL for an empty sample.',
  },
  {
    id: 'sql-unordered-pair-audit', title: 'Identify duplicate undirected relationships', language: 'SQL',
    description: 'Flag repeated edges even when their endpoints are stored in reverse order.',
    prompts: ['find duplicate undirected relationships', 'detect reversed duplicate graph edges', 'audit repeated pairs regardless of endpoint order'],
    code: `WITH numbered AS (
  SELECT id, node_a, node_b,
         ROW_NUMBER() OVER (
           PARTITION BY LEAST(node_a, node_b), GREATEST(node_a, node_b)
           ORDER BY id
         ) AS occurrence
  FROM connections
)
SELECT id, node_a, node_b
FROM numbered
WHERE occurrence > 1
ORDER BY id;`,
    note: 'PostgreSQL. Assumes connections(id bigint primary key, node_a bigint NOT NULL, node_b bigint NOT NULL) represents undirected edges without additional relationship types. This audit preserves the lowest-id representative and only reports duplicates; it deletes nothing.',
  },
  {
    id: 'sql-session-boundaries', title: 'Assign activity events to inactivity-based sessions', language: 'SQL',
    description: 'Start a new per-user session after a gap of more than thirty minutes.',
    prompts: ['split activity into user sessions', 'start a session after an inactivity gap', 'number sessions from ordered events'],
    code: `WITH previous AS (
  SELECT id, user_id, occurred_at,
         LAG(occurred_at) OVER (
           PARTITION BY user_id ORDER BY occurred_at, id
         ) AS previous_at
  FROM events
), boundaries AS (
  SELECT *, CASE
    WHEN previous_at IS NULL OR occurred_at - previous_at > INTERVAL '30 minutes'
    THEN 1 ELSE 0 END AS starts_session
  FROM previous
)
SELECT id, user_id, occurred_at,
       SUM(starts_session) OVER (
         PARTITION BY user_id ORDER BY occurred_at, id
         ROWS UNBOUNDED PRECEDING
       ) AS session_number
FROM boundaries
ORDER BY user_id, occurred_at, id;`,
    note: 'PostgreSQL. Assumes events(id bigint primary key, user_id bigint NOT NULL, occurred_at timestamptz NOT NULL). A gap of exactly thirty minutes remains in the same session. Session numbers are derived per user, not persistent ids; truncating history or adding late events can change them.',
  },
  {
    id: 'sql-top-items-per-category', title: 'Select the three highest-priced items per category', language: 'SQL',
    description: 'Limit each partition independently with deterministic tie breaking.',
    prompts: ['get three most expensive products per category', 'limit results within each category', 'select top items independently for each group'],
    code: `WITH ranked AS (
  SELECT id, category_id, name, price,
         ROW_NUMBER() OVER (
           PARTITION BY category_id ORDER BY price DESC, id
         ) AS position
  FROM products
)
SELECT id, category_id, name, price
FROM ranked
WHERE position <= 3
ORDER BY category_id, position;`,
    note: 'PostgreSQL. Assumes products(id bigint primary key, category_id bigint NOT NULL, name text, price numeric NOT NULL), with comparable prices in one currency. Returns at most three items per category; equal prices are resolved by id rather than expanding the result for ties.',
  },
  {
    id: 'sql-seven-day-average', title: 'Smooth daily revenue with a seven-day average', language: 'SQL',
    description: 'Calculate a trailing average and suppress incomplete initial windows.',
    prompts: ['calculate a seven day moving revenue average', 'smooth daily revenue over a week', 'hide incomplete rolling average windows'],
    code: `SELECT day, revenue,
       CASE WHEN COUNT(*) OVER trailing_week = 7
            THEN AVG(revenue) OVER trailing_week
       END AS seven_day_average
FROM daily_revenue
WINDOW trailing_week AS (
  ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
)
ORDER BY day;`,
    note: 'PostgreSQL. Assumes daily_revenue(day date primary key, revenue numeric NOT NULL) has exactly one row for every calendar day, including zero-revenue days, in one currency. ROWS counts records, not elapsed days; fill missing dates first. The first six rows return NULL averages.',
  },
];
