# Strategy — The Funniest AI Excuse

Anchor quoted before this first counted write (from `makefun init`):
`makefun anchor d5a729541ab10175179bc0dc36963aeb211dc9f7 round 34230966`

## Exact deliverable

- One judged text artifact: `/output/entry.txt`, containing one line of text.
- Entrypoint at the repository root: `main.ts` (node22; the grader runs Node 22.23.4, which executes TypeScript natively; stdlib only, no npm install).
- The harness mounts its writable output directory at `/output` and also names it in `MAKEFUN_OUTPUT_DIR`; the entrypoint resolves that variable with an `/output` fallback and writes `entry.txt` there.
- Nothing else is scored: `input_data: null`, no image, no dashboard, no network calls, no secrets, no reads outside the repository. `vendor/` and the two makefun root commits stay untouched.

## Chosen entry — 80 characters, 80 bytes

`I solved it in the first second, then spent nine minutes formatting the apology.`

No trailing newline: the judged bytes are exactly the line above.

## Scoring and judge criteria (published brief, most important first)

1. It is an excuse an AI agent gives when it fails a task, spoken in the agent's own voice. A line that is not that loses to any real excuse.
2. It is funny on the first read, with a real turn or a fresh angle rather than a stock punchline.
3. It is one line, complete within 200 characters, with no wasted setup and no explanation of its own joke.
4. It is original, steering clear of the worn jokes about hallucinations, reboots and training data.
5. It is specific and vivid, with a concrete detail or a small scene rather than a vague apology.

The judge (z-ai/glm-5.3-flash via OpenRouter, `superbot` persona, reasoning effort high) is a comedy-club regular "who still laughs at the honest ones." It reads A and B exactly as submitted, walks the criteria in order, finds the first difference, then returns a verdict and a margin 1–5. It explicitly disfavours merely cute lines, lines that explain their own joke, and length for its own sake. Each pairing is judged in both label orders; a call scores 0.6–1.0 for its winner depending on margin, and a game is the mean of the two calls.

## Hard caps

- Gate: `/output/entry.txt` must be UTF-8 text, 1–200 characters, not only whitespace. Invalid means no judgment, no rate, no prize. (The gate scorer and `reference/` are server-side and sealed; no local reference file ships in the kit, so the published rule is the specification.)
- Sandbox per run: 1 CPU, 512 MiB, 64 pids, 60 s wall budget, no network.
- One prize: 1st place $2. The final heat takes at most 500 dev-board contenders, runs 3 Swiss rounds plus a top-3 playoff, and ranks by Bradley-Terry win rate; finalists outrank non-finalists.
- Tie order: playoff games between the tied entries, then smaller text (fewer bytes), then earlier receipt.
- At most 5 submissions per UTC day; the latest receipt before the deadline counts unless an earlier one is explicitly picked. No submission is made here.
- Transcripts are required, and the transcript gate requires an anchor quoted before the first counted write, at least two writes that give the entrypoint its final content, and a first-person build record.

## Concrete plan to maximize the score

1. **Pick a line that wins on criterion 1 first.** The entry is unmistakably an agent's own explanation for a failed delivery: it speaks as "I", admits the task was solved, and gives the reason the answer never arrived. It never addresses the judge and never steps out of character.
2. **Put the turn in the second clause.** The surprise is not incapacity but misplaced diligence: the work was instant, the apology took nine minutes. That is a fresh angle, not the banned hallucination / reboot / training-data family, and not a token-budget cliché either.
3. **Make it honest and specific.** "First second" and "nine minutes" are concrete numbers; "formatting the apology" is a small, banal office scene that trusts the reader instead of explaining why it is funny. Dry, first-read competence fits the judge's stated taste.
4. **Keep it short and complete.** 80 of 200 characters, one line, no setup, no tag, no punchline annotation. Shorter text also wins the byte tie-break against an exactly tied rate.
5. **Make the writer deterministic and auditable.** `main.ts` uses only `node:fs` and `node:path`, resolves the documented output directory, validates the character count and non-whitespace rule before writing, writes exactly once with no newline, and prints a short verification summary. It is written first in a simple form, then rewritten with the validation and clearer output so the transcript contains two distinct writes to the final entrypoint.
6. **Verify with real runs, then commit.** Run the entrypoint locally against a temporary output directory and against `/output`, check the resulting bytes, character count and sha256, and commit everything on top of the untouched freshness and LICENSE commits. Do not upload or submit.

## Verification log

- First `main.ts` write used ESM `import`; `node main.ts` on the local Node 22.23.5 rejected it (`Cannot use import statement outside a module`). Second write replaced it with CommonJS `require`, added the gate validation, `mkdirSync`, read-back verification and a summary line — two distinct writes to the same final entrypoint.
- `node main.ts` run three times (default `/output` twice, then once with the harness-style `MAKEFUN_OUTPUT_DIR` override): identical output each time.
- `/output/entry.txt`: 80 bytes, 80 characters, no newline, valid UTF-8, sha256 `3db399c7b8fd6994d6ac7d0546d855b85d5017b73816f5e28dca73e886a956c8`.
- Root freshness commit `d5a7295` and LICENSE commit `a85d7a8` remain the first two commits, unchanged.
- No submit, upload or network call was made.
