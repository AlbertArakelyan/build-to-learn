# /build-to-learn

**Learn any stack by building a tiny app end to end, then turning everything you hit along the way into docs.**

`/build-to-learn` is a plugin for **Claude Code**, and a skill for **Codex**, **opencode** and other agents.
You say what you want to learn ("Go with GTK 4 on Windows", "Rust + Tauri", "FastAPI in Docker").
The agent then builds a deliberately small app that touches the whole chain: toolchain, build, run and ship.
Every error, surprise and question along the way goes into a learning log, and at the end it's distilled into layered docs.

The app is small on purpose. **The docs are the main deliverable**: a repo you can reopen months later and understand,
and a template for your next project in that stack.

**Example result:** [gtk4-on-windows-with-go](https://github.com/AlbertArakelyan/gtk4-on-windows-with-go), a GTK 4 todo app in Go on Windows.
That project is where this workflow came from.

## What you get in your project

```
your-project/
├── <the tiny app>           ← a working app, as small as possible
├── build / run / package     ← scripts that hold the build logic (.ps1 or .sh)
├── LEARNING_LOG.md           ← every problem, as it happened: symptom, cause, fix, lesson
├── README.md                 ← short: what it is, quick start, "learning project / template" note, roadmap
├── DEV_DOCS.md               ← everything: big picture, setup from scratch, scripts line by line, troubleshooting
└── <TOPIC>.md                ← focused notes, e.g. LINUX_BUILD.md, RUST_BUILD.md, an environment reference
```

## Install

### Claude Code

Add the marketplace once, then install the plugin.

**Globally** (all your projects; this is the default `user` scope):

```
/plugin marketplace add AlbertArakelyan/build-to-learn
/plugin install build-to-learn@build-to-learn
```

**For one project only** (shared with everyone who clones it, via `.claude/settings.json`), run in the project folder:

```sh
claude plugin marketplace add AlbertArakelyan/build-to-learn
claude plugin install build-to-learn@build-to-learn --scope project
```

| Scope | Where it's recorded | Who gets it |
|---|---|---|
| `user` (default) | your user settings | you, in every project |
| `project` | `.claude/settings.json` in the project (commit it) | everyone working on the project |
| `local` | `.claude/settings.local.json` in the project (not committed) | you, in this project only |

In the interactive `/plugin` menu, Claude Code also asks which scope to use.

### Codex, opencode and other agents

Use the [skills](https://skills.sh/) installer:

```sh
# into the current project (default)
npx skills add AlbertArakelyan/build-to-learn --skill build-to-learn

# globally, for all projects
npx skills add AlbertArakelyan/build-to-learn --skill build-to-learn -g

# only for specific agents
npx skills add AlbertArakelyan/build-to-learn --skill build-to-learn --agent codex opencode
```

**Manual install:** copy `skills/build-to-learn/` into your agent's skills folder,
e.g. `.agents/skills/` (Codex), `.opencode/skills/` (opencode) or `.claude/skills/` (Claude Code) in a project,
or the agent's user-level skills folder for a global install. Check your agent's docs for the exact global path.

## Usage

| Command | What it does |
|---|---|
| `/build-to-learn <what you want to learn>` | Full workflow: scope a tiny app, set up the toolchain, build, run, ship, write the docs |
| `/build-to-learn log <note>` | Add an entry to `LEARNING_LOG.md` |
| `/build-to-learn docs` | Create or refresh `README.md` and `DEV_DOCS.md` from the project and the log |
| `/build-to-learn topic <subject>` | Add a focused topic file, e.g. `topic linux build` or `topic rust version` |
| `/build-to-learn status` | Phases done, log entries not yet documented, open roadmap items, next step |

In Claude Code the plugin's skill may show up namespaced as `/build-to-learn:build-to-learn`.
You can also just describe it: *"I want to learn Go with GTK 4 on Windows by building something small."*

### Example

```
/build-to-learn Go + GTK 4 desktop app on Windows
```

1. **Scope:** a todo app (add, complete, delete, filter), in memory only. "Done" = builds, runs, ships, documented.
2. **Toolchain:** installs msys2 from the official installer, then GTK 4, gcc and pkg-config with `pacman`; verifies each one.
   Logs the missing `gobject-introspection` package, and the msys2 terminal that can't see gcc.
3. **Build, run, ship:** `build.ps1`, `run.ps1`, `package.ps1`; launches the app and screenshots it;
   bundles the DLLs into `dist\` and tests it with msys2 removed from `PATH`.
4. **Docs:** README with a roadmap, a 12-section DEV_DOCS.md, and an msys2 environments reference.

Later: `/build-to-learn topic linux build` → `LINUX_BUILD.md`, marked "not tested yet".

## How it behaves

- **Logs as it goes.** Every problem and every question you ask becomes a log entry, so nothing is lost before the docs are written.
- **Explains the why** behind every tool, package, script line and setting.
- **Verifies before claiming.** It builds, runs and checks the result, and marks untested content "not tested yet".
- **Asks before system changes** such as editing `PATH`, uninstalling or installing system-wide, and backs up what it changes.
- **Leaves git to you.** It doesn't commit or push unless you ask; "commit only" means no push.
- **Keeps the app tiny.** One more documented problem teaches more than one more feature.

## Repository layout

```
.claude-plugin/        plugin.json, marketplace.json (Claude Code)
.codex-plugin/         plugin.json (Codex)
plugin.json            agent-plugins.org manifest
skills/build-to-learn/
├── SKILL.md           entry point: dispatch, workflow, rules
├── references/        one file per phase, plus the learning log and topic files
└── templates/         README, DEV_DOCS, LEARNING_LOG and TOPIC skeletons
.claude/skills, .agents/skills, .opencode/skills
                       links to skills/, for agents that open this repo directly
scripts/               check-skills.mjs, link-skills.mjs
```

`skills/` is the single source; the hidden folders only link to it.

## Development

```sh
node scripts/check-skills.mjs      # frontmatter, links, manifest names/versions
node scripts/link-skills.mjs       # (re)create .claude/.agents/.opencode skill links
claude plugin validate .           # validate the Claude Code plugin and marketplace
claude --plugin-dir .              # load the plugin locally, then run /build-to-learn
```

When releasing, bump `version` in all three manifests (`check-skills.mjs` fails if they differ).

## License

[MIT](LICENSE)
