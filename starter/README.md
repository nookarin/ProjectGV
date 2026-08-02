# Starter files for your team repo

These are the files your team copies into the **new repository you create** in
exercise `00-setup-team-repo.md`. They give everyone a shared, working starting
point so the Git exercises have real code to change.

Copy **both** `package.json` and the `team/` folder into the root of your new repo:

```
package.json         # marks the repo as ES modules ("type": "module")
team/
├── roster.js        # a list of teammates (exercise 01 adds you to it)
├── roster.test.js
├── config.js        # shared settings (exercise 02 conflicts on maxUsers)
├── config.test.js
├── utils.js         # shared helpers (exercise 03 conflicts here)
├── utils.test.js
└── legacy.js        # old helper (exercise 04 deletes it)
```

> The `package.json` matters: the files use ES-module `import`/`export`, so Node
> needs `"type": "module"` at the repo root. Copy it in alongside `team/`.

Each `*.test.js` runs with plain Node — no installs:

```bash
node team/roster.js && echo ok        # sanity: file loads
node team/roster.test.js              # -> All tests passed ✅
```

You do **not** need to change these files now. Exercises 01–04 tell you exactly
what to edit and when.
