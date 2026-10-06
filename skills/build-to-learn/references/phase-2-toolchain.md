# Phase 2: Toolchain

Goal: a working, understood toolchain, installed the standard way, with every step verifiable and every snag logged.

## 1. Inventory first

Before installing anything, check what's already there:

- the language toolchain and its version (`go version`, `rustc -V`, `node -v`, …);
- compilers, build tools and package managers already on `PATH`, and **where** each one comes from
  (e.g. `Get-Command gcc` on Windows, `which -a gcc` on Unix);
- duplicates: the same tool from two sources (e.g. a `gcc` from scoop and one from msys2) is a common cause of confusing errors.

Log anything surprising (broken or half-finished installs, duplicates).

## 2. Install the standard way

- Prefer the **official installer** or the package manager the stack's own docs recommend
  (e.g. msys2 for GTK on Windows, Homebrew on macOS, the distro package manager on Linux, rustup for Rust).
- If the user asks for a specific package manager, use it; if it turns out to be non-standard or broken for this stack, say so and suggest the official route.
- Install only what the stack needs, and say what each package is for.
- **Ask before** global or hard-to-undo changes: `PATH` edits, uninstalls, system-wide installs. Back up the old value first.

## 3. Verify each tool

After installing, check each tool on its own and record the version:

```
<tool> --version          # it runs, and it's the version you expect
which/Get-Command <tool>  # it's the copy you just installed, not another one
```

Also verify the glue between tools (e.g. `pkg-config --modversion <lib>` finds the library the compiler will use).

## 4. Log every snag

Typical things worth a `LEARNING_LOG.md` entry:

- a missing dependency the docs didn't mention (e.g. `gobject-introspection` for gotk4);
- an environment or terminal that doesn't see a tool (e.g. "gcc isn't in the MSYS terminal, only in UCRT64");
- an update that restarts or closes a terminal;
- conflicts between tools on `PATH`;
- anything slow and why (e.g. a long first build).

## 5. Environment reference (if the toolchain has variants)

If the toolchain has several environments, runtimes or variants the user must choose between
(msys2's MSYS/UCRT64/MINGW64, Rust's GNU vs MSVC targets, Python venvs vs system Python, …),
plan a topic file explaining **which to use when** (see [topic-docs.md](topic-docs.md)).
Users usually ask about this; the question is the signal.
