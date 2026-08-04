# Forge — training &amp; recovery log

A single-file, offline-first tracker for lifting, hydration, sleep, nutrition,
recovery and body composition. No build step, no dependencies, no server, no
account. The whole app is `index.html`.

**Live:** https://YOUR-USERNAME.github.io/forge/

---

## Publishing this to GitHub Pages

1. Go to <https://github.com/new>, name the repo **`forge`**, set it **Public**,
   and do **not** tick "Add a README". Create it.

2. In this folder, run:

   ```bash
   git init -b main
   git add .
   git commit -m "Forge — training and recovery log"
   git remote add origin https://github.com/YOUR-USERNAME/forge.git
   git push -u origin main
   ```

3. In the repo on github.com: **Settings → Pages → Build and deployment →
   Source: _Deploy from a branch_ → Branch: `main` / `(root)` → Save.**

4. Wait about a minute, then open `https://YOUR-USERNAME.github.io/forge/`.

To publish an update later, replace `index.html` and run:

```bash
git add . && git commit -m "Update" && git push
```

> The repo being public only means the *app code* is public. Your logged data
> never leaves your browser and is never committed to this repo.

---

## Where your data lives

Everything is stored in your browser's `localStorage`, under the key `forge.v2`,
scoped to the address you load the app from. Consequences worth understanding:

- Data logged at `https://you.github.io/forge/` is **separate** from data logged
  from a local copy of the file. Pick one address and stay on it.
- Clearing site data or "clear cookies and site data" for that domain erases the
  log. **Export a backup regularly** — Data tab → *Export JSON backup*.
- Private/incognito windows discard the log when closed.
- Nothing is transmitted anywhere. There is no analytics, no telemetry, no
  network request of any kind after the page loads.

If a browser blocks storage entirely, the app says so on the Data tab and keeps
working in memory for that session — export before closing the tab.

## Install on your phone

Open the live URL in Safari or Chrome, then **Share → Add to Home Screen**. It
launches fullscreen with its own icon.

---

## Sharing with a trainer

Three ways, in increasing order of convenience:

| Method | Where | What they get |
|---|---|---|
| **Print / save as PDF** | Trainer report tab | A static PDF of the report |
| **Export snapshot file** | Trainer report tab | A `.json` they can import into their own copy |
| **Copy share link** | Trainer report tab | A URL that opens the report with your data preloaded |

The share link encodes a compressed snapshot of the selected window into the URL
fragment (`#r=…`). Roughly 4 KB for 28 days, 11 KB for 90 days. When opened:

- the app runs in **read-only mode** — the Log day and Data tabs are removed,
  and nothing is written to the viewer's storage;
- the viewer can browse the report plus Trends, Lifts and Body;
- it is a **snapshot**, frozen at the moment you generated it. Send a fresh link
  when they need current numbers.

Because the data is in the URL, **anyone holding the link can read that
snapshot**. There is no password on it. Treat it like you would the PDF.

## Backing up

Data tab → **Export JSON backup** gives you a complete restorable file.
**Export CSV** gives two flat files instead — daily totals, and one row per set —
for spreadsheets or your own analysis. **Import backup** merges a JSON file back
in, overwriting days that clash.

---

## What it tracks

**Logged daily:** water (ml), sleep (bed/wake times, duration, 1–5 quality),
workouts (exercise, sets, weight, reps, RPE, session notes), calories and
protein/carbs/fat, resting heart rate, steps, energy/soreness/mood (1–5 each),
body weight. **Weekly:** waist, chest, arm and thigh measurements.

**Derived:** training volume (weight × reps), estimated 1RM (Epley, capped at 12
reps), 7-day rolling averages, per-muscle-group set counts, training streak
(survives up to two rest days), goal adherence percentages.

## Tabs

- **Dashboard** — streak, weekly session ring, today vs. targets, 7-day rolling
  averages with sparklines, 26-week consistency heatmap, quick 30-day charts.
- **Log day** — all entry forms for the selected date. Saves as you type.
- **Trends** — ten charts sharing one range control (7d / 30d / 90d / 6m / All),
  each with a table view showing the underlying numbers.
- **Lifts** — per-exercise progression (estimated 1RM, top set, or volume) and
  set distribution across muscle groups.
- **Body** — weight with 7-day rolling average, tape measurements, calories,
  resting heart rate.
- **Trainer report** — printable summary with adherence stats, a plain-English
  read of the numbers, charts, training balance, and a full session log.
- **Data** — export, import, goals and units, and the complete record as a table.

## Keyboard

| Key | Action |
|---|---|
| `[` / `]` | Previous / next day |
| `t` | Jump to today |
| `1`–`7` | Switch tabs |

## Notes on the build

Vanilla HTML, CSS and JavaScript in one file. Charts are hand-rolled SVG — no
charting library — with crosshair tooltips, a table-view twin for every chart,
and a colour palette validated for colour-blind separation in both light and
dark themes. Weights are stored internally in kilograms and converted for
display, so switching units never loses precision. The display default is
pounds; switch it on the Data tab.
