# Phase 3: Build, run, ship

Goal: the app works, building it is one command, and there's an artifact that runs without the dev setup.

## 1. Write the app

- Keep it in as few files as the stack allows; match the stack's idioms.
- Before relying on an unfamiliar API, check it against the installed library's source or docs (versions differ).
- Keep state in memory unless persistence is in scope.

## 2. Scripts hold the build logic

Put each repeated step in a small script, in the platform's native shell (`.ps1` on Windows, `.sh` on Unix):

| Script | Purpose |
|---|---|
| `build` | Builds the app. Sets every environment variable the build needs **for that process only** (compiler, tool paths), so it works regardless of what else is on `PATH`. |
| `run` | Starts the app with whatever runtime setup it needs (e.g. DLL folder on `PATH`). Optional if the app runs on its own. |
| `package` | Builds the shippable artifact from scratch (bundle, installer, container image, …). |

Rules:
- Each script starts with a comment saying what it does and why it exists.
- Paths that differ per machine (install locations) have one override, e.g. an environment variable with a default.
- A GUI "run" step must not block the caller (start the app detached), so the scripts work under make or CI.
- If the user wants `make` (or Task, just, …), add a **thin wrapper** whose targets only call the scripts, so the build logic stays in one place.
  On Windows, make runs recipes through `cmd`/`sh`, so call PowerShell explicitly; never end a Makefile line with `\`, even in a comment.

## 3. Verify it runs

- Build, then run the app and check it does what the feature list says.
- For a GUI, launch it and take a screenshot to confirm the window renders; for a server, request an endpoint.
- Note the exit code if it fails; look it up and log what it means (e.g. Windows `0xC0000135` = a DLL wasn't found).
- Save a screenshot to `docs/screenshot.png` for the README.

## 4. Ship it

Find out what the app needs at run time that a normal user's machine doesn't have, and make the artifact carry or declare it:

- **Windows native apps:** bundle the DLLs next to the exe (list them with a dependency tool such as `ldd`), plus runtime data
  (plugins, icons, schemas) in the folder layout the library expects.
- **Linux:** usually declare dependencies (distro packages, Flatpak runtime) rather than bundle them.
- **macOS:** an `.app` bundle with the libraries inside.
- **Web/server:** a container image or a deployment.

**Verify the artifact in a clean environment**: e.g. run the bundle with the dev tools removed from `PATH`, or in a fresh container.
Record its size and what's inside.

## 5. Repository hygiene

- `.gitignore` the build output and the shipped artifact; they're generated and can be large.
- Keep the source, scripts and docs in git.
- Commit only when the user asks.

Log every problem from this phase. Then go to phase 4.
