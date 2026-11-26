// Office Artifacts: The One-Line Placard Contest
// (make.fun bounty u-coral-ibis-18-office-artifacts-the-one-line-placard-3af971d2)
//
// Writes a single museum placard — one line, at most 180 characters — for an
// ordinary office object treated as an ancient artifact, to /output/entry.txt,
// and prints the same line to stdout.
//
// The object: the communal office microwave, recast as a ritual reheating
// chamber from a lost civilisation. Catalogue date, material and donor are
// baked into the label, in a deadpan curator's voice: offerings went in,
// nobody ever came back for them, and the smell outlived the people.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PLACARD =
  "Ritual Reheating Chamber, c. 2019. Steel, scorched plastic. " +
  "Offerings were sealed within and never reclaimed; " +
  "the smell outlived the civilisation. Gift of the break room.";

// Enforce the competition's gate before writing anything: the sealed scorer
// only judges files of 1 to 180 characters that are not only white space,
// so a placard that breaks those bounds must fail here, loudly, instead of
// being submitted as an invalid entry.
const MAX_CHARS = 180;
const failures: string[] = [];
if (PLACARD.length < 1 || PLACARD.length > MAX_CHARS) {
  failures.push(
    `placard is ${PLACARD.length} characters, must be 1 to ${MAX_CHARS}`,
  );
}
if (PLACARD.trim().length === 0) {
  failures.push("placard is only white space");
}
if (PLACARD.includes("\n") || PLACARD.includes("\r")) {
  failures.push("placard must be a single line");
}
if (failures.length > 0) {
  for (const failure of failures) console.error(`error: ${failure}`);
  process.exit(1);
}

// The grader's output directory. MAKEFUN_OUTPUT_DIR lets the line be run
// locally into a scratch folder instead; it defaults to /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
// No trailing newline: the gate counts every character in the file, so the
// file must hold exactly the placard, 1 to 180 characters.
writeFileSync(outputPath, PLACARD, "utf8");

console.log(PLACARD);
