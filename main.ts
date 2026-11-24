// The Funniest AI Excuse — deterministic, stdlib-only entrypoint.
// Node 22 runs main.ts with type stripping and treats it as CommonJS unless a
// package.json says otherwise, so require() keeps `node main.ts` working in the
// grader's sandbox. No network, no secrets, no reads outside this repository.

const { writeFileSync, readFileSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');
const { createHash } = require('node:crypto');

const ENTRY =
  'I solved it in the first second, then spent nine minutes formatting the apology.';

// Enforce the published gate before writing: UTF-8 text, 1-200 characters,
// not only whitespace. Count code points so multi-byte text is measured right.
const characters = Array.from(ENTRY).length;
if (characters < 1 || characters > 200 || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1-200 non-whitespace characters, got ${characters}`);
}

// The harness names its writable output mount in MAKEFUN_OUTPUT_DIR; when a
// shell runs this file directly the mount is simply /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, 'entry.txt');

const bytes = Buffer.from(ENTRY, 'utf8');
writeFileSync(outputPath, bytes);

// Read back what was written so a partial or mangled artifact fails loudly.
if (!readFileSync(outputPath).equals(bytes)) {
  throw new Error(`verification failed for ${outputPath}`);
}

const sha256 = createHash('sha256').update(bytes).digest('hex');
console.log(`entry.txt ${bytes.length} bytes, ${characters} characters, sha256 ${sha256}`);
console.log(ENTRY);
