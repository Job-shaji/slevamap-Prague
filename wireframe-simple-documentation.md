# Wireframe Documentation — Simple Version

**File:** `wireframe-simple.html`
**Purpose:** A minimal, low-fidelity layout reference for the SlevaMap Prague
client-side prototype.

This is a simplified companion to the detailed wireframe. It groups sections
into larger blocks and removes annotations so the overall page structure is
easier to scan at a glance.

---

## How to view

Open `wireframe-simple.html` in any browser. No build step or dependencies are
needed.

---

## Visual conventions

| Symbol | Meaning |
| --- | --- |
| Gray box | A page block or section |
| Diagonal-stripe box | Image placeholder |
| Darker gray box | Button or call-to-action |

There is no legend in this version — the conventions are intentionally minimal.

---

## Shared shell

Every page uses the same three parts:

1. **Top bar** — logo + navigation.
2. **Main area** — page-specific content.
3. **Footer** — a single footer block.

---

## Page-by-page breakdown

### 1. Home (`index.html`)

- Top bar
- Hero (title, search, buttons)
- Student plan banner
- Stats
- Category tiles (5)
- Featured deals (3 cards)
- How it works (3 steps)
- Footer

### 2. Shop / Deals (`deals.html`)

- Top bar
- Title + filter bar
- Deal cards (3×2 grid)
- Footer

### 3. Deal detail (`deal.html`)

- Top bar
- Image + title/facts/save button (two columns)
- Footer

### 4. Saved deals (`saved.html`)

- Top bar
- Title + count
- Saved cards (3)
- Footer

### 5. Submit / Contact (`submit.html`, `contact.html`)

- Top bar
- Form (inputs + send button) + contact info (two columns)
- Footer

### 6. About (`about.html`)

- Top bar
- Intro text + image (two columns)
- Purpose
- Values (4)
- Footer

### 7. Student plan / ISIC (`isic.html`)

- Top bar
- Title
- Step 1: ISIC registration
- Step 2: demo verification
- Footer

---

## Notes

- Header and footer are shared across all pages.
- The wireframe shows desktop layout only; grids collapse on smaller screens.
- See `wireframe-documentation.md` for the detailed, annotated version.
