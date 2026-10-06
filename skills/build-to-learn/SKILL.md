---
name: build-to-learn
description: Learn a new stack, platform or tool by building a deliberately tiny app that works end to end (build, run, ship), then turning every problem hit along the way into layered learning docs, so the repo becomes a reusable reference and a template for future projects. Use when someone says "/build-to-learn", "I want to learn X by building something", "make a learning project", "set up a template project for X", "document what we did so I understand it later", or asks to turn a small project into learning docs. Subcommands - start, log, docs, topic, status.
---

# /build-to-learn

Learn a stack by building the smallest app that exercises the **whole chain** (toolchain → build → run → ship),
and write down everything you learn while doing it. The app is small on purpose; **the docs are the main deliverable**.
At the end the repo is both a reference the user can reopen months later and a template for their next project.

Example of the result: <https://github.com/AlbertArakelyan/gtk4-on-windows-with-go>
(a GTK 4 todo app in Go on Windows, with a short README, a detailed DEV_DOCS.md and topic notes for Linux and Rust).

## Dispatch (do this first)

Read the arguments and run one mode:

| Invocation | Mode | Read |
|---|---|---|
| `/build-to-learn <what to learn>` or `start <…>` | Full workflow, phases 1–4 | all phase files, in order |
| `/build-to-learn log <note>` | Add one entry to `LEARNING_LOG.md` | [learning-log.md](references/learning-log.md) |
| `/build-to-learn docs` | Create or refresh README.md + DEV_DOCS.md from the project and the log | [phase-4-docs.md](references/phase-4-docs.md) |
| `/build-to-learn topic <subject>` | Add a focused topic file (other platform, other language, a tool reference) | [topic-docs.md](references/topic-docs.md) |
| `/build-to-learn status` | Show which phases are done, open log entries, and the roadmap | this file |
| no arguments, nothing started yet | Ask what they want to learn (one question), then `start` | |
| no arguments, project already has `LEARNING_LOG.md` | `status` | |

Paths in this skill are relative to this skill's folder. Templates live in [templates/](templates/).

## The workflow

1. **Scope** a tiny app that touches every part of the stack. → [phase-1-scope.md](references/phase-1-scope.md)
2. **Toolchain:** install from official sources, verify each tool, record versions and every snag. → [phase-2-toolchain.md](references/phase-2-toolchain.md)
3. **Build, run, ship:** working app, scripts that hold the build logic, a verified run, and a shippable artifact. → [phase-3-build-run-ship.md](references/phase-3-build-run-ship.md)
4. **Docs:** short README, detailed DEV_DOCS.md, topic files. → [phase-4-docs.md](references/phase-4-docs.md)

Phases 1–3 are where learning happens; phase 4 distills it. Keep the user informed in short lines ("toolchain installed; building now").

## Rules that apply in every mode

**Capture as you go.** Every error, surprise, confusing tool behaviour, design choice or "why does it work like this?" question
gets a `LEARNING_LOG.md` entry *when it happens*, with symptom, cause and fix. Questions the user asks during the work are signals:
if they had to ask, the docs need to answer it. Don't wait for phase 4; details are lost by then.

**Explain the why.** Every tool, package, script line, setting and environment change in the docs says why it's there,
not only what to type.

**Verify, then say so.** Build it, run it, and check the result (launch the app, take a screenshot of a GUI, check exit codes).
Test the shipped artifact in a clean environment (e.g. with the dev tools removed from `PATH`).
Report what was verified and what wasn't. Mark anything untested in the docs with a **"Status: not tested yet"** banner.

**The user drives system changes.** Ask before anything global or hard to undo: changing `PATH` or other environment variables,
uninstalling software, installing system-wide. Back up what you change (e.g. save the old `PATH` value) and say where the backup is.
Prefer official installers and the stack's recommended package manager; if a tool was installed several ways, help the user pick one
and remove the others, since duplicate toolchains on `PATH` cause confusing errors.

**The user drives git.** Don't commit or push unless asked. "Commit" or "commit only" means commit and **don't push**.
Make small commits with messages that explain the change. Keep build output and bundles out of git with `.gitignore`.
If a remote URL contains a token (`https://user:ghp_…@github.com/…`), warn the user and suggest revoking it and using a credential manager.

**Keep the app tiny.** No database, accounts or networking unless that *is* the thing being learned. In-memory state is fine.
Resist feature creep: one extra feature teaches less than one more documented problem.

**Make it a template.** The README says it's a learning project and how to reuse it (what to rename, which files to touch),
and has a roadmap with checkboxes for what's next (other platforms, packaging, CI).

## status mode

Read `LEARNING_LOG.md`, README.md, DEV_DOCS.md and the project files, then report briefly:
- which phases are done (app builds? runs? shipped artifact verified? docs written?);
- log entries not yet reflected in the docs;
- unchecked roadmap items;
- one suggested next step.
