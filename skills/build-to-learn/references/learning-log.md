# The learning log

`LEARNING_LOG.md` in the project root is the raw journal. It's written **during** the work, entry by entry,
and later distilled into DEV_DOCS.md. Create it from [../templates/LEARNING_LOG.md](../templates/LEARNING_LOG.md) if it doesn't exist.

## When to add an entry

- an error or failed command;
- something surprising (a tool in an unexpected place, a slow step, a terminal that closes itself);
- a decision between alternatives (why this package manager, why this environment);
- a question the user asked ("why does the build take so long?", "which terminal should I use?");
- a change to the machine (installed, removed, `PATH` edited), so it can be undone later.

In `log` mode (`/build-to-learn log <note>`), turn the user's note into one entry; ask nothing unless the note is unclear.

## Entry format

Newest at the bottom. Keep it short; exact error text matters more than prose.

```markdown
### <short title>
- **When:** <phase or step>, <YYYY-MM-DD>
- **Symptom:** <what happened, exact error text>
- **Cause:** <why it happened, once known>
- **Fix:** <what solved it, exact command>
- **Lesson:** <the one thing to remember>
- **Docs:** <not yet | → documented in DEV_DOCS §N>
```

For machine changes, use a short form:

```markdown
### Changed: <what>
- **When:** <step>, <YYYY-MM-DD>
- **Change:** <e.g. appended C:\msys64\ucrt64\bin to user PATH>
- **Undo:** <how to revert; where the backup is>
```
