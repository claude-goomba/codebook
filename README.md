# Codebook

A local, AI-free code snippet library. Search 112 built-in examples across JavaScript, Python, HTML, CSS, and SQL, or save your own snippets in your browser.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. No API key or subscription is required. After dependencies are installed, the app runs locally without an AI service.

```sh
npm test
npm run build
npm run preview
```

## Merger Update

1. Select at least two snippets of the same language using their **Merge** buttons.
2. Open **Merger**, then reorder or remove selections.
3. Choose **Combine snippets** and edit the result.
4. Copy the code or save it as a new custom snippet.

Merger in v1.1.0 joins code as text. It does **not** automatically produce a working integrated program or resolve imports, variable collisions, dependencies, or execution order. Code is never executed in Codebook. AI-assisted merging and separate Local/AI modes are not implemented in this release.

Original snippets stay unchanged. Custom snippets and saved merges live in this browser's local storage, not on GitHub. Clearing browser data removes them. Changing the host or port opens a different browser storage area. Unsaved merge drafts and selections disappear on reload.

## Update Packages

Download versioned updates from [GitHub Releases](https://github.com/claude-goomba/codebook/releases).

- `codebook-v1.1.0-web.zip`: built static site, ready to serve with an HTTP server.
- GitHub's source ZIP and tar.gz: complete source with tests and development scripts.

Serve the extracted web package over HTTP, not by double-clicking index.html. For example, run `python3 -m http.server 8080 --bind 127.0.0.1` in its extracted directory and open `http://127.0.0.1:8080`. Keep the same host and port when updating to retain access to browser-saved snippets. Keep the previous download if you want to roll back.

To publish a future update, change the package version and changelog, update the lockfile, commit, and push a matching `vX.Y.Z` tag. The release workflow tests and builds Codebook and attaches the versioned web ZIP automatically. Packages are distributed through GitHub Releases, not the npm registry.

## Files

- `database.js`: original snippets, search rules, and validation.
- `javascript-snippets.js`, `python-snippets.js`, `web-snippets.js`: additional examples.
- `merger.js`: deterministic text combination.
- `app.js`, `index.html`, `style.css`: browser interface.
- `logo.svg`: transparent book-and-code vector artwork inspired by the supplied references. The decorative QR-like pattern is not scannable.

Snippet notes describe runtime requirements and limitations. Review code before running it in your own projects. No private browser data, API credentials, or unrelated projects are included in this repository.
