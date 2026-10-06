# Phase 1: Scope

Goal: agree on the smallest app that exercises the **whole chain** of the stack, and set up the project folder.

## 1. Find out what's being learned

From the invocation, work out:

- **Stack:** language, framework, libraries (e.g. Go + GTK 4, Rust + Tauri, C++ + Qt, Python + FastAPI).
- **Platform:** the OS the user is on, and where the app should run (desktop OS, browser, server, mobile).
- **What they already know:** if unclear, look at their machine (installed toolchains on `PATH`, package managers) instead of asking.

Ask **at most one or two questions**, only for what you can't infer. If the user names just a stack, pick sensible defaults and say what you picked.

## 2. Pick the app

Default to a **todo app** unless the stack suggests something better. A good learning app:

- touches every layer the user wants to learn (UI, state, events; or routes, handlers, serialization; …);
- fits on one screen / in one file, roughly 100–300 lines;
- keeps state in memory (no database) unless persistence is the thing being learned;
- has a visible result that's easy to verify (a window, a page, an HTTP response).

Write down the feature list in 3–6 bullets. That's the scope; don't grow it later.

## 3. Define "done"

The chain is done when all of these are true and verified:

1. the toolchain is installed from official sources and each tool is checked;
2. the app builds with one command;
3. the app runs and does what the feature list says;
4. there's a shippable artifact (bundle, installer, container, deployed URL) that works **without** the dev setup;
5. the docs are written (phase 4).

## 4. Create the project

- Create the folder where the user asks (default: their Desktop or current directory), with a short, descriptive name.
- Create `LEARNING_LOG.md` from [../templates/LEARNING_LOG.md](../templates/LEARNING_LOG.md) and fill in the goal, stack and platform.
- Don't run `git init` or commit unless the user asks (see the git rules in SKILL.md). It's fine to suggest it.

Tell the user the plan in a few lines (app, features, what "done" means) and continue to phase 2.
