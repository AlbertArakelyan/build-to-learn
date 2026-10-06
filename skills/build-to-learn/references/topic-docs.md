# Topic files

A topic file answers **one question** in depth, so the README and DEV_DOCS stay readable.
Name it after the subject in capitals: `LINUX_BUILD.md`, `MACOS_BUILD.md`, `RUST_BUILD.md`, `MSYS2-ENVIRONMENTS.md`, `DOCKER.md`.
Start from [../templates/TOPIC.md](../templates/TOPIC.md).

## Kinds of topic files

| Kind | Example | Typical sections |
|---|---|---|
| **Other platform** | `LINUX_BUILD.md` | install deps per distro/OS, build and run, what's different and why, shipping options, comparison table |
| **Other language / framework** | `RUST_BUILD.md` | what stays the same, what's different, toolchain choices, minimal setup, comparison table |
| **Tool reference** | `MSYS2-ENVIRONMENTS.md` | the variants in a table, which to choose when, rules of thumb, which package for common tools, cheat sheet |

Good triggers: the user asks "is it the same on Linux?", "how would this work in Rust?", "which environment should I use?".
Answer the question in chat first; if the user wants it kept, write it into a topic file.

## Rules

- **Status banner.** If the content wasn't built and run on a real machine, start with:
  `> **Status: not tested yet.** …` and say what it's based on (official docs, the working setup in this repo).
- **Compare with what works.** Tie every point back to the verified setup in this repo ("unlike Windows, no DLL bundling is needed because …").
- **End with a comparison table** (this repo's setup vs the topic).
- **Link it** from the README's "More details" section, with "(not tested yet)" if that applies.
- **Roadmap:** if the topic is a future platform or port, make sure it has an unchecked roadmap item in the README.
- Don't claim versions or flags you haven't checked; say "check the current docs" instead.
