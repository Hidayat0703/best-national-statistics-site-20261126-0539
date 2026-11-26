// Entry program for the Indonesia national statistics site (Node 22, standard library only).
//
// The site itself is the static file tree in app/: plain HTML, CSS and JavaScript with no build
// step and no network loads. This program is only the hand-in: it copies app/ and screenshots/
// into the output directory and writes dossier.json there with the vendored make.fun library,
// byte for byte the way the scorer rebuilds it, so vendor/makefun-frontend.ts stays untouched.
//
// Run it locally the way the grader does, with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoDir, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoDir, 'screenshots'))) {
  cpSync(join(repoDir, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// The caps below mirror the scorer's gate: at most 4 screenshots of 256 KiB each, at most 993
// files and directories in app/ totalling 16 MiB, and the dossier text capped at 160 KiB.
const dossierText = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossierText);
