#!/usr/bin/env node
// Repo checks for /build-to-learn. Run before every release (and in CI):
//   node scripts/check-skills.mjs
// - every SKILL.md has name + description frontmatter, and name matches its folder
// - relative links inside skill markdown point at files that exist
//   (templates/ is skipped: its links are meant for the generated project)
// - all manifests carry the same name and version, and the marketplace lists the plugin

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

// Frontmatter
for (const skill of fs.readdirSync(path.join(root, 'skills'))) {
  const file = `skills/${skill}/SKILL.md`;
  if (!fs.existsSync(path.join(root, file))) { errors.push(`${file} missing`); continue; }
  const fm = /^---\n([\s\S]*?)\n---/.exec(read(file).replace(/\r\n/g, '\n'));
  if (!fm) { errors.push(`${file}: no frontmatter`); continue; }
  const name = /^name:\s*(.+)$/m.exec(fm[1])?.[1].trim();
  if (name !== skill) errors.push(`${file}: name "${name}" should be "${skill}"`);
  if (!/^description:\s*\S/m.test(fm[1])) errors.push(`${file}: missing description`);
}

// Relative links
const mdFiles = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== 'templates') walk(p); }
    else if (e.name.endsWith('.md')) mdFiles.push(p);
  }
};
walk(path.join(root, 'skills'));
for (const f of mdFiles) {
  for (const [, target] of fs.readFileSync(f, 'utf8').matchAll(/\]\(([^)#\s]+)(?:#[^)]*)?\)/g)) {
    if (/^[a-z]+:/i.test(target)) continue;
    if (!fs.existsSync(path.resolve(path.dirname(f), target))) errors.push(`${path.relative(root, f)}: broken link ${target}`);
  }
}

// Manifests agree
const manifests = ['.claude-plugin/plugin.json', '.codex-plugin/plugin.json', 'plugin.json'].map((p) => [p, JSON.parse(read(p))]);
const [, first] = manifests[0];
for (const [p, m] of manifests) {
  if (m.name !== first.name) errors.push(`${p}: name ${m.name} != ${first.name}`);
  if (m.version !== first.version) errors.push(`${p}: version ${m.version} != ${first.version}`);
}
const market = JSON.parse(read('.claude-plugin/marketplace.json'));
if (!market.plugins?.some((p) => p.name === first.name)) errors.push('marketplace.json does not list the plugin');

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${mdFiles.length} markdown files, ${manifests.length} manifests (v${first.version})`);
