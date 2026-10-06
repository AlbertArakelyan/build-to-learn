#!/usr/bin/env node
// Expose skills/* to agents that open this repo directly (.claude, .agents, .opencode).
// macOS/Linux: creates real symlinks. Windows without Developer Mode can't, so it
// writes the symlinks straight into git's index instead (mode 120000); every clone
// on macOS/Linux then gets real links.
//   node scripts/link-skills.mjs

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skills = fs.readdirSync(path.join(root, 'skills'));
const hosts = ['.claude/skills', '.agents/skills', '.opencode/skills'];
const git = (args, input) => spawnSync('git', args, { cwd: root, input, encoding: 'utf8' });

for (const host of hosts) {
  fs.mkdirSync(path.join(root, host), { recursive: true });
  for (const s of skills) {
    const link = `${host}/${s}`;
    const target = `../../skills/${s}`;
    try {
      fs.symlinkSync(target, path.join(root, link), 'dir');
      console.log(`linked ${link} -> ${target}`);
    } catch (e) {
      if (e.code === 'EEXIST') continue;
      const blob = git(['hash-object', '-w', '--stdin'], target).stdout.trim();
      const r = git(['update-index', '--add', '--cacheinfo', `120000,${blob},${link}`]);
      if (r.status !== 0) { console.error(`failed ${link}: ${r.stderr.trim()}`); process.exitCode = 1; continue; }
      console.log(`staged symlink ${link} -> ${target} (git index only; this OS can't create it on disk)`);
    }
  }
}
