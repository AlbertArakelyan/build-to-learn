# Phase 4: Docs

Goal: someone who opens the repo months later understands the stack, the setup and every decision, without re-learning it.
Build the docs from three sources: the project files, `LEARNING_LOG.md`, and the questions the user asked during the work.

## The layers

| File | Reader | Length |
|---|---|---|
| `README.md` | Someone deciding what this is and how to start | One screen or two |
| `DEV_DOCS.md` | Someone who wants to understand everything | As long as needed |
| Topic files (`<TOPIC>.md`) | Someone with one specific question | Focused, one subject each |

README links to DEV_DOCS and to every topic file; DEV_DOCS links back to the README.

## README.md

Start from [../templates/README.md](../templates/README.md). It must have:

1. Title and one-paragraph description (what it is, stack, platform).
2. A highlighted note: **this is a learning project and can be used as a template** for future apps with this stack.
3. Screenshot, if there's a UI.
4. Features: 3–6 bullets.
5. How it's built: a small table of the pieces (language, libraries, toolchain) and the exact install commands.
6. Quick start: the commands to build, run and ship; a table of the scripts.
7. Using it as a template: the concrete steps (what to rename, which files to touch).
8. Roadmap with checkboxes: done items checked; next steps (other platforms, packaging, CI, persistence) unchecked.
9. More details: "For the full guide, read DEV_DOCS.md", plus links to topic files.

## DEV_DOCS.md

Start from [../templates/DEV_DOCS.md](../templates/DEV_DOCS.md). Sections (drop ones that don't apply):

1. **What the app does.**
2. **The big picture:** a diagram of how the pieces fit, a table of each piece (what it is, why it's needed, where it comes from), and the build-time vs run-time distinction.
3. **Project files:** a table of every file and what it's for.
4. **Setup from scratch:** numbered steps from a clean machine, with the exact commands, what to expect, and the snags from the log at the step where they happen.
5. **Environment:** `PATH` and environment variables, what was changed on this machine and how to do it by hand, ordering pitfalls.
6. **The libraries / bindings:** how they were added, how they work, why the first build is slow, harmless warnings, where to find API docs.
7. **The scripts:** for each script, why it exists, what it contains (show the key lines), and how to use it.
8. **Shipping:** when the artifact is needed, what's inside and why, how it was verified, how to share it.
9. **How the code works:** data model, structure (e.g. widget tree, routes), events/flow, each function in a sentence or two, where to extend it.
10. **Where everything was installed** and how to remove each part.
11. **Troubleshooting:** a table of symptom / cause / fix, starting with every problem from the log.
12. **Cheat sheet:** everyday commands.

## Distilling the log

- Every `LEARNING_LOG.md` entry ends up in DEV_DOCS: in the setup step where it happens, in troubleshooting, or both.
  Mark the entry `→ documented in DEV_DOCS §N` so `status` can tell what's done.
- Every question the user asked during the work gets an answer somewhere in the docs.
- Keep exact error messages; people search for them.

## Style

- Explain **why** for every command, package, setting and script line.
- Be concrete: exact commands, paths, versions, error text.
- Tables for comparisons and file lists; numbered steps for procedures; code blocks for anything typed.
- Mark anything not verified on a real machine with a **"Status: not tested yet"** banner at the top of that file or section.
- Don't invent results: only claim what was built, run or checked.
