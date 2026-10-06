# Developer docs: <stack> on <platform>

The detailed guide for this project. For the short overview, see [README.md](README.md).

<One paragraph: what the app is, and what this document explains.>

![<App name>](docs/screenshot.png)

---

## Contents

1. [What the app does](#1-what-the-app-does)
2. [How it works (the big picture)](#2-how-it-works-the-big-picture)
3. [Project files](#3-project-files)
4. [Setting up a machine from scratch](#4-setting-up-a-machine-from-scratch)
5. [Environment and PATH](#5-environment-and-path)
6. [<Library / bindings>](#6-library--bindings)
7. [The scripts](#7-the-scripts)
8. [Shipping the app](#8-shipping-the-app)
9. [How the code works](#9-how-the-code-works)
10. [Where everything was installed](#10-where-everything-was-installed)
11. [Troubleshooting](#11-troubleshooting)
12. [Everyday cheat sheet](#12-everyday-cheat-sheet)

---

## 1. What the app does

- <feature, with how to use it>

## 2. How it works (the big picture)

```
<diagram: your code → library → toolchain pieces → runtime>
```

| Piece | What it is | Why it's needed | Where it comes from |
|---|---|---|---|
| | | | |

**Build time vs run time:** <what each phase needs>.

## 3. Project files

| File | What it is |
|---|---|
| | |

Versions used: <tool versions>.

## 4. Setting up a machine from scratch

### 4.1 <Install X>

<Exact commands, what to expect, and the snag from the log that happens here.>

### 4.2 <Verify>

```sh
<check commands>   # → expected output
```

## 5. Environment and PATH

<What was changed on this machine, why, how to do it by hand, ordering pitfalls, how to undo.>

## 6. <Library / bindings>

<How it was added, how it works, build speed, harmless warnings, where to find API docs.>

## 7. The scripts

### 7.1 `<build script>`

**Why it exists:** <reason>

**What it does:**

```
<key lines, commented>
```

**Usage:** <commands>

## 8. Shipping the app

### 8.1 Is it required?
### 8.2 What's inside and why
### 8.3 How it was verified
### 8.4 How to share it

## 9. How the code works

### 9.1 Startup
### 9.2 Data model
### 9.3 Structure (widget tree / routes / modules)
### 9.4 Events / flow
### 9.5 The functions
### 9.6 Where to extend it

## 10. Where everything was installed

| What | Location | How to remove |
|---|---|---|
| | | |

## 11. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| <exact error text> | | |

## 12. Everyday cheat sheet

```sh
<daily commands>
```

Further reading:
- <official docs links>
