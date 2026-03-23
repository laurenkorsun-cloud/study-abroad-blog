# Local preview (fix HTTP 404 on `/`)

If `http://localhost:3000` shows **404** but Vercel works, the dev file watcher often fails on macOS (`EMFILE`). This repo enables **polling** in `npm run dev` so routes compile correctly.

**Try this:**

1. Stop any running dev server (`Ctrl+C`).
2. From the project folder:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. Open **`http://localhost:3000`** (use `http`, not `https`).

**Still stuck?** Raise the open-file limit, then restart Terminal:

```bash
ulimit -n 10240
```

**Use another port** (if 3000 is busy):

```bash
WATCHPACK_POLLING=true npx next dev -p 3001
```

Then open `http://localhost:3001`.
